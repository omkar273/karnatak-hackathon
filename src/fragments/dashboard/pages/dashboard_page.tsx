import { useSelector } from "react-redux";
import DashboardUserDataCards from "../components/dashboard_data_cards";
import DashboardStationCards from "../components/dashboard_station_data_cards";
import StationRatesGraph from "../components/station_rates_graph";
import { RootState } from "@/common/redux/store";
import DashboardCasesPieCharts from "../components/dashboard_cases_piecharts";
import useGetAllFIRs from "@/fragments/fir/hooks/use_getall_fir";
import { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Map from "@/fragments/Manpower/components/map";
import useGetAllStations from "@/fragments/station/hooks/use_get_all_stations";
import { Select } from "antd";
// import { fir_dataset } from "@/fragments/fir/data/fir_data";
// import { doSaveFIR2 } from "@/fragments/fir/utils/do_save_fir";

const DashboardPage = () => {
    const { userdata } = useSelector((s: RootState) => s.auth)
    const [stationId, setstationId] = useState(userdata?.stationId)
    const [stationsData, setstationsData] = useState([{
        stationId: stationId,
        label: 'Own station',
        value: userdata?.stationId,
    }])
    const stations = useGetAllStations({ comesUnder: stationId, initialLimit: 2 })

    const recent_cases = useGetAllFIRs({
        stationId,
        initialLimit: 0,
    });


    useEffect(() => {
        recent_cases.fetchFIRs();
        stations.fetchStations();
    }, [stationId]);

    useEffect(() => {
        console.log(stations.documents);
        setstationsData([
            {
                stationId: userdata?.stationId,
                label: 'Own station',
                value: userdata?.stationId
            },
            ...stations.documents.map((station) => {
                return {
                    stationId: station.stationId,
                    label: station.stationName,
                    value: station.stationId
                }
            })
        ])


    }, [stations.documents])



    const handleChange = (value: { value: string; label: React.ReactNode }) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        setstationId(value.value)
    };
    console.log(recent_cases.documents);

    return (
        <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">
            <div className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
                <p className="font-open-sans font-semibold ">
                    {"Dashboard"}
                </p>
                <Select
                    labelInValue
                    defaultValue={stationsData[0]}
                    style={{ width: 'max-content' }}
                    onChange={handleChange}
                    options={stationsData}
                />
            </div>
            <DashboardUserDataCards />
            <p className="font-bold text-3xl px-4 pb-4">
                Station Data
            </p>
            <Map />
            <div className="lg:flex lg:flex-grow lg:flex-row lg:gap-4">
                {/* left container */}
                <div className="flex-grow md:flex-[85%] px-4 overflow-y-auto max-h-[calc(100vh-138px)]">
                    {/* left container content */}
                    <div>
                        <DashboardStationCards stationId={stationId} />
                        <StationRatesGraph stationId={stationId} />
                        <DashboardCasesPieCharts stationId={stationId} />


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
                            }

                        </div>

                        <div className="h-6" />

                        {/* pending cases */}
                        <div className="p-3 rounded-lg border border-gray-200 bg-white">
                            <p className="text-2xl font-medium mb-6">Pending cases</p>
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
