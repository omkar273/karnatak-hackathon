/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import DashboardStationCards from "../components/dashboard_station_data_cards";
import StationRatesGraph from "../components/station_rates_graph";
import { RootState } from "@/common/redux/store";
import DashboardCasesPieCharts from "../components/dashboard_cases_piecharts";
import { useEffect, useState } from "react";
import ZonalData from "../components/zone_data";
import { StationModel } from "@/fragments/station/models/station_model";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebase_config";
import { RanksEnum } from "@/common/post/ranks";
import React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';

const DashboardPage = () => {
    const { userdata, currentUser } = useSelector((s: RootState) => s.auth)



    const [stationId, setStationId] = useState<string | null>(null);
    const [stationList, setStationList] = useState<StationModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!userdata) return;

            setLoading(true);

            try {
                if (userdata.stationId) {
                    // Fetch specific station details for inspectors and constables
                    setStationId(userdata.stationId);

                    const stationDoc = await getDoc(doc(firestore, "stations", userdata.stationId));
                    if (stationDoc.exists()) {
                        const stationData = stationDoc.data() as StationModel;
                        setStationList([stationData]); // Assuming you need it in an array
                        console.log(stationData);
                    }
                } else if (userdata.post === RanksEnum.Commisioner || userdata.post === RanksEnum.AssistantCommisioner) {

                    const search_field = userdata.post === RanksEnum.Commisioner ? 'commissioner_id' : 'assistant_commissioner_id'

                    console.log('user is a commisioner');
                    console.log(currentUser?.user.uid);


                    const q = query(
                        collection(firestore, "stations"),
                        where(search_field, "==", currentUser?.user.uid),
                        limit(6),
                    );

                    console.log('starting to get stations');

                    const querySnapshot = await getDocs(q);
                    console.log('finished to get stations');

                    const stations: StationModel[] = [];
                    querySnapshot.forEach((doc) => {
                        stations.push(doc.data() as StationModel);
                    });

                    console.log(stationList);
                    setStationList(stations);
                    setStationId(stations[0].id ?? '')
                }
            } catch (error) {
                console.error("Error fetching station data:", error);
            } finally {

                setLoading(false);
            }
        };

        fetchData();
    }, [userdata, currentUser]);


    const getStationNameById = (id: string | undefined) => {
        const station = stationList.find((station) => station.id === id);
        return station ? station.station_name : "Select a station";
    };

    return (
        <div className="h-screen xl:overflow-hidden bg-gray-100 flex flex-col">
            <div className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
                <p className="font-open-sans font-semibold ">
                    {"Dashboard"}
                </p>

                {/* station dropdown */}
                {
                    stationList.length > 1 && (
                        <Select.Root value={stationId ?? ''} onValueChange={(s) => setStationId(s)}>
                            <Select.Trigger
                                className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                                aria-label="Station"
                            >
                                <Select.Value>
                                    {getStationNameById(stationId ?? '')}
                                </Select.Value>
                                <Select.Icon className="text-violet11">
                                    <ChevronDownIcon />
                                </Select.Icon>
                            </Select.Trigger>

                            <Select.Portal >
                                <Select.Content
                                    className="overflow-hidden bg-white rounded-md shadow-lg z-[110]"
                                    position="popper"
                                >
                                    <Select.Viewport className="p-[5px]">
                                        {stationList.map((station, index) => (
                                            <div key={station.id}>
                                                <Select.Item
                                                    value={station.id ?? ''}
                                                    className="text-[13px] py-3 leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                                                >
                                                    <Select.ItemText>
                                                        <p className="text-base py-4 xl:text-lg">
                                                            {station.station_name}
                                                        </p>
                                                    </Select.ItemText>
                                                    <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                        <CheckIcon />
                                                    </Select.ItemIndicator>
                                                </Select.Item>
                                                {index < stationList.length - 1 && <div className="border-b border-gray-200 my-2" />}
                                            </div>
                                        ))}
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    )
                }

                {/* station name  */}
                {
                    stationList.length === 1 && (
                        <h1>
                            {stationList[0].station_name}{' station'}
                        </h1>
                    )
                }

            </div>

            {/* zonal data for commissioner */}
            <ZonalData />
            {/* <DashboardUserDataCards /> */}
            <p className="font-bold text-3xl px-4 pb-4">
                Station Data
            </p>



            {/* main content */}
            <div className="lg:flex lg:flex-grow lg:flex-row lg:gap-4">
                {/* left container */}
                <div className="flex-grow md:flex-[85%] px-4 xl:overflow-y-auto xl:max-h-[calc(100vh-138px)]">
                    {/* left container content */}
                    <div>
                        <DashboardStationCards stationId={stationId ?? ''} />
                        <StationRatesGraph stationId={stationId ?? ''} />
                        <DashboardCasesPieCharts stationId={stationId ?? ''} />


                        {/* <button type="button" className="p-3 bg-blue-500 m-5"
                            onClick={async () => {
                                try {
                                    for (const fir of fir_dataset) {
                                        await doSaveFIR2(fir);
                                        console.log(`saved fir no ${fir.stationId} `);

                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>
                            Submit
                        </button> */}
                        <div className="min-h-96" />
                    </div>
                </div>

                {/* right container */}
                <div className="flex-grow md:flex-[25%] p-4 overflow-y-auto max-h-[calc(100vh-138px)]">
                    {/* right container content */}
                    <div>
                        {/* Right container content goes here */}


                        {/* recent cases */}
                        <div className="p-3 rounded-lg border border-gray-200 bg-white">
                            <p className="text-2xl font-medium mb-6">Recent cases</p>
                            {/* 
                            {
                                recent_cases.documents.map((caseItem, i) => (
                                    <div key={i}>
                                        <Link to={`/fir_details?id=${caseItem.id}`} className="text-[0.8rem] font-medium  font-poppins cursor-pointer hover:bg-gray-100 p-2 flex justify-between items-center gap-2">
                                            {caseItem.Beat_Name}
                                            <EyeOutlined className="hover:scale-105" />
                                        </Link>
                                        <div className="w-full border border-b-[1]"></div>
                                    </div>
                                ))
                            } */}

                        </div>

                        <div className="h-6" />

                        {/* pending cases */}
                        <div className="p-3 rounded-lg border border-gray-200 bg-white">
                            <p className="text-2xl font-medium mb-6">Pending cases</p>
                            {/* {
                                recent_cases.documents.map((caseItem, i) => (
                                    <div key={i}>
                                        <Link to={`/fir_details?id=${caseItem.id}`} className="text-[0.8rem] font-medium  font-poppins cursor-pointer hover:bg-gray-100 p-2 flex justify-between items-center gap-2">
                                            {caseItem.Beat_Name}
                                            <EyeOutlined className="hover:scale-105" />
                                        </Link>

                                        <div className="w-full border border-b-[1]"></div>
                                    </div>
                                ))
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;


