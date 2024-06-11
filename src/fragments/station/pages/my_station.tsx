import { VSpacer } from "@/common/components/spacer";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PieChart } from '@mui/x-charts/PieChart';
import { Collapse, Rate, Table } from "antd";
import { Landmark, Mail, MapPinned, Phone, ShieldPlus } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import CrimeLineChart from "../components/chart";
import { stationData } from "../data/station";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import useGetDocument from "@/common/hooks/use_get_document";
import { GridLoader } from "react-spinners";
import { StationModel } from "../models/station_model";
import StaticMap from "@/common/components/static_map";
import StationStaffList from "../components/station_staff_list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export interface CaseData {
    month_year: string;
    theft_cases: number;
    assult_cases: number;
    violence_cases: number;
}

const MyStationPage: React.FC = () => {



    const { stationList } = useSelector((s: RootState) => s.auth)

    const [stationId, setStationId] = useState<string | null>(null);

    useEffect(() => {
        setStationId(stationList?.at(0)?.id ?? '')
    }, [stationList])

    const stationDetails = useGetDocument<StationModel>({
        docId: stationId,
        path: 'stations',
    })

    const tabsData: { tabTitle: string, element?: ReactNode | null }[] = [
        {
            tabTitle: 'Staff',
            element: <StationStaffList stationId={stationId} />,
        },
        {
            tabTitle: 'Crime records',
            element: <div>llloa</div>,
        },
        {
            tabTitle: 'Financial records',
            element: <div>llloa</div>,
        },
        {
            tabTitle: 'Weapons',
            element: <div>llloa</div>,
        },
        {
            tabTitle: 'vehicles',
            element: <div>llloa</div>,
        },
    ]


    const getStationNameById = (id: string | undefined) => {
        const station = stationList.find((station) => station.id === id);
        return station ? station.station_name : "Select a station";
    };


    const patrollingColumns = [
        {
            title: 'Staff name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'post',
            dataIndex: 'post',
            key: 'post',
        },
        {
            title: 'Unit no',
            dataIndex: 'unit_no',
            key: 'unit_no',
        },
        {
            title: 'Shift Timing',
            dataIndex: 'shift_timing',
            key: 'shift_timing',
        },
        {
            title: 'Incharge',
            dataIndex: 'patroling_incharge',
            key: 'patroling_incharge',
        },
        {
            title: 'Vehicle no',
            dataIndex: 'vehicle_no',
            key: 'vehicle_no',
        },
        {
            title: 'Patrolling time',
            dataIndex: 'patroling_timing',
            key: 'patroling_timing',
        },
        {
            title: 'No of people in unit',
            dataIndex: 'no_people',
            key: 'no_people',
        },
    ]

    const vehicleColumns = [
        {
            title: 'Vehicle name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chasis No',
            dataIndex: 'chasis_no',
            key: 'chasis_no',
        },
        {
            title: 'Vehicle No',
            dataIndex: 'vehicle_no',
            key: 'vehicle_no',
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'vehicle_type',
            key: 'vehicle_type',
        },
        {
            title: 'Last servicing',
            dataIndex: 'last_serviced_date',
            key: 'last_serviced_date',
        },
        {
            title: 'Distance travelled',
            dataIndex: 'distance_travelled',
            key: 'distance_travelled',
        },
    ]

    const weaponsColumns = [
        {
            title: 'Weapon name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Weapon Type',
            dataIndex: 'weapon_type',
            key: 'weapon_type',
        },
        {
            title: 'Last used',
            dataIndex: 'last_used_date',
            key: 'last_used_date',
        },
        {
            title: 'Details about weapon & performance',
            dataIndex: 'last_used_date',
            render: () => (<FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />)
        },

    ]

    const data = [
        { id: 0, value: 10, label: 'Robberies' },
        { id: 1, value: 15, label: 'Assult' },
        { id: 2, value: 20, label: 'Car stealing' },
    ];

    const lastMonthData = [
        { id: 0, value: 25, label: 'Robberies' },
        { id: 1, value: 10, label: 'Assult' },
        { id: 2, value: 32, label: 'Car stealing' },
    ];


    if (stationDetails?.loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <GridLoader
                    color="#0891B2"
                    size={25}
                />
            </div>
        )
    }



    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden">
            <div className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
                <p className="font-open-sans font-semibold ">
                    {"Station"}
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
            <div className="p-4 bg-gray-100 ">

                <div className="bg-gray-100 min-h-screen">

                    {/* basic station details */}
                    <div className="card bg-white md:flex p-10">
                        <div className="flex-[70%] flex-grow">
                            <p className="text-2xl font-semibold flex gap-2 items-center">
                                <ShieldPlus />
                                {stationDetails.data?.station_name}
                                {` ( ${stationDetails.data?.zone_name} zone )`}
                            </p>
                            <p className="text-base font-bold">Station Incharge : {stationDetails.data?.station_incharge_name}</p>
                            <VSpacer height={25} />
                            <div className="md:flex flex-wrap gap-x-12 gap-y-4 ">
                                <span className="flex gap-2 my-1 items-center">
                                    <MapPinned />{stationDetails.data?.district}
                                </span>

                                <span className="flex gap-2 my-1 items-center">
                                    <Landmark />{stationDetails.data?.address}
                                </span>
                                <span className="flex gap-2 my-1 items-center">
                                    <Phone />{stationDetails.data?.phone}
                                </span>
                                <span className="flex gap-2 my-1 items-center">
                                    <Mail />{stationDetails.data?.email}
                                </span>

                            </div>
                            <VSpacer height={25} />
                            {/* <span className="flex gap-2 my-1 items-center">
                                <University />{stationDetails.data?.address}
                            </span> */}

                            <div>
                                <span className="flex gap-2 my-1 items-center">
                                    Zonal incharge : {stationDetails.data?.commissioner_name}
                                </span>

                                <span className="flex gap-2 my-1 items-center">
                                    Subzone incharge : {stationDetails.data?.assistant_commissioner_name}
                                </span>


                            </div>
                        </div>
                        <div className="flex-[30%] w-full flex-grow  flex shadow-md bg-cyan-100 justify-center flex-col items-center border-2 rounded-md">
                            <ShieldPlus className="text-center  size-28 mb-2" />
                            <Rate disabled
                                allowHalf
                                defaultValue={4.5}
                                tooltips={['Bad', 'betterment needed', 'good', 'Excellent', 'Ideal station']} />
                            <p className="font-semibold text-base my-2">Overall station rating</p>
                        </div>
                    </div>

                    {/* imp staff */}
                    <VSpacer height={25} />

                    {/* station map */}
                    <div className="card bg-white my-4">
                        <Collapse items={[
                            {
                                key: '1',
                                label: 'Show on map',
                                children: (
                                    <StaticMap
                                        lat={stationDetails.data?.lat || 0}
                                        lng={stationDetails.data?.lng || 0}
                                        station_name={stationDetails.data?.station_name}
                                    />)
                            }
                        ]}
                        />
                    </div>

                    {/* station details tabs all or tabs */}
                    <Tabs defaultValue="tabView" className="w-full   md:my-8 my-4">
                        <div className="w-full flex items-center justify-between bg-white rounded-md p-3 ">
                            <h1 className="font-bold md:text-2xl text-base p-2">
                                Station details
                            </h1>

                            <TabsList className="grid gap-2 grid-cols-2">
                                <TabsTrigger value="tabView">Tab View</TabsTrigger>
                                <TabsTrigger value="scrollView">Scroll view</TabsTrigger>
                            </TabsList>
                        </div>


                        <TabsContent value="scrollView" className="my-3">
                            {
                                tabsData.map((tab, index) => (
                                    <div key={index}>
                                        {tab.element}
                                    </div>))
                            }
                        </TabsContent>

                        <TabsContent value="tabView" >
                            <Tabs defaultValue={tabsData[0].tabTitle}
                                className="w-full md:my-2 my-1">
                                <div className="w-full bg-white rounded-md p-3 ">
                                    <TabsList>
                                        {
                                            tabsData.map((tab, index) => (
                                                <TabsTrigger
                                                    value={tab.tabTitle}
                                                    key={index}>
                                                    {tab.tabTitle}
                                                </TabsTrigger>
                                            ))
                                        }
                                    </TabsList>
                                    {
                                        tabsData.map((tab, index) => (
                                            <TabsContent value={tab.tabTitle} key={index}>
                                                {tab.element}
                                            </TabsContent>))
                                    }
                                </div>

                            </Tabs>
                        </TabsContent>

                    </Tabs>

                    <div className="card bg-white grid grid-cols-1 gap-y-16">
                        <CrimeLineChart />

                        <div className="w-full grid md:grid-cols-2 gap-4 p-4 rounded border-2 border-gray-500">

                            <div className="flex flex-col w-full h-full justify-between items-center">
                                <p className="text-xl my-3">Crime percentage in this last month</p>
                                <PieChart
                                    series={[
                                        {
                                            data,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        },
                                    ]}
                                    title="Crime percentage in this last"
                                    height={200}
                                />
                            </div>


                            <div className="flex flex-col w-full h-full justify-between items-center">
                                <p className="text-xl my-3">Crime percentage in this month</p>
                                <PieChart
                                    series={[
                                        {
                                            data: lastMonthData,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        },
                                    ]}
                                    title="Crime percentage in this Month"
                                    height={200}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white">
                        <div className="grid grid-cols-4 gap-4 my-3">
                            <div className="text-center font-bold">Name Of Officer (Post)</div>
                            <div className="text-center font-bold">Post </div>
                            <div className="text-center font-bold">Track record/Solved cases</div>
                            <div className="text-center font-bold">FIR/Case Number</div>
                            <div className="text-center font-bold">Shift</div>
                        </div>
                        {
                            stationData.staff.map((person, index) => (
                                <div className="grid grid-cols-4 gap-4" key={index}>
                                    <div className="text-center border p-2 w-full">
                                        {person.name}
                                    </div>

                                    <div className="text-center border p-2 w-full">
                                        {person.post}
                                    </div>

                                    <div className="text-center border p-2 w-full">
                                        {person.solved_cases}
                                    </div>

                                    <div className="text-center border p-2 w-full">
                                        <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
                                    </div>
                                    <div className="text-center border p-2 w-full">
                                        {person.shift_timing}
                                    </div>
                                </div>
                            ))
                        }


                    </div>

                    {/* patrolling details */}
                    <div className="bg-white p-4 my-4 card">

                        <p className="my-4 font-bold text-xl">
                            Patrolling Details
                        </p>

                        <Table
                            dataSource={stationData.vehicles}
                            columns={patrollingColumns}
                            pagination={{
                                total: stationData.vehicles.length,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

                            }}
                            scroll={{ x: 'max-content' }}
                        />
                    </div>

                    {/* financial budgets */}
                    <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white ">
                        <p className="mb-2 font-bold">
                            Financial budgets and uses
                        </p>
                        <div className="grid grid-cols-5 gap-4">
                            <div className="text-center font-bold">Budget Reports</div>
                            <div className="text-center font-bold">2020-21</div>
                            <div className="text-center font-bold">2019-20</div>
                            <div className="text-center font-bold">2020-21</div>
                            <div className="text-center font-bold">2019-20</div>
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-1">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="text-center">
                                        <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
                                    </div>
                                ))}
                            </div>
                            <div className="col-span-1">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="text-center">
                                        <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
                                    </div>
                                ))}
                            </div>
                            <div className="col-span-1">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="text-center">
                                        <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
                                    </div>
                                ))}
                            </div>
                            <div className="col-span-1">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="text-center">
                                        <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
                                    </div>
                                ))}
                            </div>
                            <div className="col-span-1">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="text-center">
                                        <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white ">
                        <p className="mb-2 font-bold">
                            Miscellaneous Funds and System Maintenance
                        </p>
                    </div>


                    {/* vehicles details */}
                    <div className="bg-white p-4 my-4 card">
                        <p className="my-4 font-bold text-xl">
                            Vehicles Details
                        </p>

                        <Table
                            dataSource={stationData.vehicles}
                            columns={vehicleColumns}
                            pagination={{
                                total: stationData.vehicles.length,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

                            }}
                            scroll={{ x: 'max-content' }}
                        />
                    </div>


                    {/* weapons details */}
                    <div className="bg-white p-4 my-4 card">
                        <p className="my-4 font-bold text-xl">
                            Weapon Records
                        </p>

                        <Table
                            dataSource={stationData.weapons}
                            columns={weaponsColumns}
                            pagination={{
                                total: stationData.weapons.length,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

                            }}
                            scroll={{ x: 'max-content' }}
                        />
                    </div>
                </div>
                <VSpacer height={100} />
            </div>

        </div>
    );
};

export default MyStationPage