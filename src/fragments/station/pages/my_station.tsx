import { VSpacer } from "@/common/components/spacer";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PieChart } from '@mui/x-charts/PieChart';
import { Collapse, Table } from "antd";
import { Landmark, Mail, MapPinned, Phone, ShieldPlus, University } from "lucide-react";
import React from "react";
import CrimeLineChart from "../components/chart";
import { stationData } from "../data/station";
export interface CaseData {
    month_year: string;
    theft_cases: number;
    assult_cases: number;
    violence_cases: number;
}

const MyStationPage: React.FC = () => {

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

    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"My Station"}
            </p>
            <div className="p-4 bg-gray-100 ">
                {/* <iframe className="w-full min-h-screen" src="https://maps.google.com/maps?q=14.51475,75.80687&amp;hl=es;z=14&amp;output=embed"></iframe> */}
                <div className="bg-gray-100 min-h-screen">

                    {/* basic station details */}
                    <div className="card bg-white">
                        <p className="text-2xl font-semibold flex gap-2 items-center">
                            <ShieldPlus />
                            {stationData.name}
                        </p>
                        <p className="text-base font-bold">Station Incharge : {stationData.station_incharge}</p>
                        <VSpacer height={25} />
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
                            <span className="flex gap-2 my-1 items-center">
                                <MapPinned />{stationData.district}
                            </span>

                            <span className="flex gap-2 my-1 items-center">
                                <Landmark />{stationData.district}
                            </span>
                            <span className="flex gap-2 my-1 items-center">
                                <Phone />{stationData.phone}
                            </span>
                            <span className="flex gap-2 my-1 items-center">
                                <Mail />{stationData.email}
                            </span>

                        </div>
                        <VSpacer height={25} />
                        <span className="flex gap-2 my-1 items-center">
                            <University />{stationData.address}
                        </span>
                    </div>

                    {/* station map */}
                    <div className="card bg-white my-4">
                        <Collapse items={[
                            {
                                key: '1',
                                label: 'Show on map',
                                children: (<iframe className="w-full min-h-screen" src="https://maps.google.com/maps?q=14.51475,75.80687&amp;hl=es;z=14&amp;output=embed" title="" ></iframe>)
                            }
                        ]}
                        />
                    </div>

                    <div className="card bg-white grid grid-cols-1 gap-y-16">
                        <CrimeLineChart />

                        <div className="w-full grid grid-cols-2 gap-4 p-4 rounded border-2 border-gray-500">

                            <div className="flex flex-col w-full h-full justify-between items-center">
                                <p className="text-xl my-3">Crime percentage in this last</p>
                                <PieChart
                                    series={[
                                        {
                                            data,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        },
                                    ]}
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
                                    height={200}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white">
                        <div className="grid grid-cols-4 gap-4 my-3">
                            <div className="text-center font-bold">Name Of Officer (Post)</div>
                            {/* <div className="text-center font-bold">Finances </div> */}
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