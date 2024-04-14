import { VSpacer } from "@/common/components/spacer";
import CrimeLineChart from "@/fragments/station/components/chart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { PieChart } from "@mui/x-charts/PieChart";
import { FileText } from "lucide-react";

const DashboardPage = () => {
    const chartSettings = {
        yAxis: [
            {
                label: 'Number of People',
            },
        ],
        width: 600,
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
        <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"Dashboard"}
            </p>
            <div className="p-4">

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
                        <p className="text-2xl font-bold text-center my-2">9</p>
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
                                    label: 'No of people alloted in different departments'
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
                        <p className="text-xl my-3">Crime percentage in this last month</p>
                        <PieChart
                            series={[
                                {
                                    data: departmentDetails.map((d) => ({ 'id': d.dept_name, 'value': d.no_people, 'label': d.dept_name })),
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                },
                            ]}
                            title="Crime percentage in this last"
                            height={300}
                            width={600}
                        />
                    </div>

                    <div className="flex flex-col w-full h-full justify-between items-center card bg-white">
                        <p className="text-xl my-3">Crime percentage in this last month</p>
                        <PieChart
                            series={[
                                {
                                    data: casesDetails.map((d) => ({ 'id': d.dept_name, 'value': d.no_people, 'label': d.dept_name })),
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                },
                            ]}
                            title="Crime percentage in this last"
                            height={300}
                            width={600}
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
            </div>
            <VSpacer height={200} />
        </div>
    );
}

export default DashboardPage