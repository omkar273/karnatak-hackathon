import { VSpacer } from "@/common/components/spacer";
import FirDetailsTable from "@/fragments/fir/components/fir_table";
import CrimeLineChart from "@/fragments/station/components/chart";
import { dummyFIRData } from "@/fragments/user_management/data/fir_data";
import dummyUserData from "@/fragments/user_management/data/underlying_data";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { PieChart } from "@mui/x-charts/PieChart";
import { CircleUserRound, FileCheck, FileClock, FileText } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate()
    const chartSettings = {
        yAxis: [
            {
                label: 'Number of People',
            },
        ],
        width: 400,
        height: 400,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };

    const departmentDetails = [
        {
            "dept_name": "Cyber Crime",
            "no_people": 40
        },
        {
            "dept_name": "Traffic",
            "no_people": 50
        },
        {
            "dept_name": "Narcotics",
            "no_people": 30
        },
        {
            "dept_name": "Forensics",
            "no_people": 20
        },
        {
            "dept_name": "Patrol",
            "no_people": 75
        },
        {
            "dept_name": "K9 Unit",
            "no_people": 15
        },
        {
            "dept_name": "Public Affairs",
            "no_people": 10
        }
    ]
    const casesDetails = [
        {
            "dept_name": "Cyber Crime",
            "no_people": 56
        },
        {
            "dept_name": "Theft",
            "no_people": 19
        },
        {
            "dept_name": "Violence",
            "no_people": 26
        },
        {
            "dept_name": "Assault",
            "no_people": 5
        },
        {
            "dept_name": "Bribery",
            "no_people": 3
        },
        {
            "dept_name": "Fraud",
            "no_people": 36
        },
    ]

    const valueFormatter = (value: number | null) => `${value} people`;
    return (
        <div className="max-h-screen overflow-y-clip overflow-hidden bg-gray-100">

            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"Dashboard"}
            </p>
            <div className="flex ">
                <div className="flex-[85%] flex-grow">
                    <div className="max-h-screen overflow-y-scroll p-4">

                        {/* basic analytics */}
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                            <div className="card bg-white flex justify-between items-center flex-col">
                                <p className="font-semibold flex gap-2 ">
                                    <FileText />
                                    Total cases registered this month
                                </p>
                                <p className="text-2xl font-bold text-center my-2">143</p>
                            </div>

                            <div className="card bg-white flex justify-between items-center flex-col">
                                <p className="font-semibold ; flex gap-2 ">
                                    <FileText />
                                    Pending cases
                                </p>
                                <p className="text-2xl font-bold text-center my-2">23</p>
                            </div>

                            <div className="card bg-white flex justify-between items-center flex-col">
                                <p className="font-semibold ; flex gap-2 ">
                                    <FileText />
                                    Closed cases
                                </p>
                                <p className="text-2xl font-bold text-center my-2">69</p>
                            </div>


                            <div className="card bg-white flex justify-between items-center flex-col">
                                <p className="font-semibold ; flex gap-2 ">
                                    <FileText />
                                    Cases alloted to you
                                </p>
                                <p className="cursor-pointer hover:scale-105 font-semibold text-center my-2">9</p>
                            </div>

                            <div className="card bg-blue-400 text-white">
                                <p className="font-semibold flex gap-2 ">
                                    <FileText />
                                    Select Year
                                </p>
                                <p className="cursor-pointer w-full text-end hover:scale-105 font-medium my-2">(view)</p>
                            </div>

                            <div className="card bg-blue-400 text-white">
                                <p className="font-semibold flex gap-2 ">
                                    <FileText />
                                    Total calls for service
                                </p>
                                <p className="cursor-pointer w-full text-end hover:scale-105 font-medium my-2">(view)</p>
                            </div>

                            <div className="card bg-blue-400 text-white">
                                <p className="font-semibold flex gap-2 ">
                                    <FileText />
                                    Total Arrests
                                </p>
                                <p className="cursor-pointer w-full text-end hover:scale-105 font-medium my-2">(view)</p>
                            </div>

                            <div className="card bg-blue-400 text-white">
                                <p className="font-semibold flex gap-2 ">
                                    <FileText />
                                    Total Police Station
                                </p>
                                <p className="cursor-pointer w-full text-end hover:scale-105 font-medium my-2">(view)</p>
                            </div>

                            <div className="card bg-blue-400 text-white">
                                <p className="font-semibold flex gap-2 ">
                                    <FileText />
                                    Total FIR
                                </p>
                                <p className="cursor-pointer w-full text-end hover:scale-105 font-medium my-2">(view)</p>
                            </div>

                            <div className="card bg-blue-400 text-white">
                                <p className="font-semibold flex gap-2 ">
                                    <FileText />
                                    Police Squad
                                </p>
                                <p className="cursor-pointer w-full text-end hover:scale-105 font-medium my-2">(view)</p>
                            </div>

                        </div>

                        <div className="bg-white card my-6">
                            <CrimeLineChart />
                        </div>



                        <div className="md:grid grid-cols-2 gap-x-4 gap-y-6">
                            <div className="card bg-white">
                                <BarChart
                                    dataset={departmentDetails}
                                    xAxis={[
                                        {
                                            scaleType: 'band',
                                            dataKey: 'dept_name',
                                            label: 'No of personnel alloted in different departments'
                                        }]}
                                    series={[{
                                        dataKey: 'no_people',
                                        label: 'Number of People',
                                        valueFormatter
                                    }]}
                                    {...chartSettings}
                                />
                            </div>
                            <div className="flex flex-col w-full h-full justify-between items-center  card bg-white">
                                <p className="text-xl my-3">No of personnel alloted in different departments
                                </p>
                                <PieChart
                                    series={[
                                        {
                                            data: departmentDetails.map((d) => ({ 'id': d.dept_name, 'value': d.no_people, 'label': d.dept_name })),
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        },
                                    ]}
                                    title="Crime percentage in this last month"
                                    margin={{ top: 20, bottom: 100, left: 10, right: 0 }}
                                    height={500}
                                    width={300}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: {
                                                vertical: 'bottom', horizontal: 'middle'
                                            },
                                            padding: 0,
                                        },
                                    }}
                                />
                            </div>

                            <div className="flex flex-col w-full h-full justify-between items-center card bg-white">
                                <p className="text-xl my-3">
                                    No of cases in each category
                                </p>
                                <PieChart
                                    series={[
                                        {
                                            data: casesDetails.map((d) => ({ 'id': d.dept_name, 'value': d.no_people, 'label': d.dept_name })),
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        },
                                    ]}
                                    title="Crime percentage in this last"
                                    margin={{ top: 20, bottom: 100, left: 10, right: 0 }}
                                    height={500}
                                    width={300}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: {
                                                vertical: 'bottom', horizontal: 'middle'
                                            },
                                            padding: 0,
                                        },
                                    }}
                                />
                            </div>


                            <div className="card bg-white">
                                <BarChart
                                    dataset={casesDetails}
                                    xAxis={[
                                        {
                                            scaleType: 'band',
                                            dataKey: 'dept_name',
                                            label: 'No of cases in each category'
                                        }]}
                                    series={[{
                                        dataKey: 'no_people',
                                        label: 'Number of Cases',
                                        valueFormatter
                                    }]}
                                    {...chartSettings}
                                />
                            </div>

                        </div>

                        <VSpacer height={25} />
                        {/* recent cases */}
                        <div className="md:grid grid-cols-1 gap-x-4 gap-y-6">
                            <FirDetailsTable />
                        </div>

                        <VSpacer height={250} />

                    </div>

                </div>



                {/* right pane */}
                <div className="flex-[30%] max-h-screen overflow-y-scroll">
                    {/* main container */}
                    <div className="p-4 ">

                        {/* taska alloted to me  */}
                        <div className="card bg-white">
                            <p className="font-bold text-xl">Pending cases</p>
                            <VSpacer height={25} />
                            {
                                dummyFIRData.slice(0, 6).map((data, index) => (
                                    <div key={index} className="p-2 border-b my-2 ">
                                        <div className="flex gap-2 mb-1">
                                            <FileClock />
                                            <p className="font-medium">{data.title}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">{data.detailsOfIncident}</p>
                                    </div>
                                ))
                            }

                            <VSpacer height={25} />
                            <Link to={'/fir/all'} className="w-full btn text-center">View All pending cases</Link>
                            <VSpacer height={20} />

                        </div>

                        {/* closed task */}
                        <VSpacer height={30} />
                        <div className="card bg-white">
                            <p className="font-bold text-xl">Recent closed cases</p>
                            <VSpacer height={25} />
                            {
                                dummyFIRData.slice(15, 23).map((data, index) => (
                                    <div key={index} className="p-2 border-b my-2 ">
                                        <div className="flex gap-2 mb-1">
                                            <FileCheck />
                                            <p className="font-medium">{data.title}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">{data.detailsOfIncident}</p>
                                    </div>
                                ))
                            }
                            <VSpacer height={25} />
                            <Link to={'/fir/all'} className="w-full btn text-center">View All closed cases</Link>
                            <VSpacer height={20} />
                        </div>


                        <VSpacer height={30} />
                        <div className="card bg-white">
                            <p className="font-bold text-xl">MY underlying</p>
                            <VSpacer height={25} />
                            {
                                dummyUserData.slice(0, 8).map((data, index) => (
                                    <div key={index}
                                        onClick={() => navigate(`/user?id=${data.email}`)}
                                        className="p-2 border-b my-2 hover:card cursor-pointer">
                                        <div className="flex gap-2 mb-1">
                                            <CircleUserRound />
                                            <p className="font-medium">{data.name}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">{data.post}</p>
                                    </div>
                                ))
                            }

                            <VSpacer height={25} />
                            <Link to={'/user/underlying'} className="w-full btn text-center">View All underlying</Link>
                            <VSpacer height={20} />
                        </div>


                        <VSpacer height={150} />
                    </div>
                </div>
            </div>
            <VSpacer height={200} />
        </div>
    );
}

export default DashboardPage