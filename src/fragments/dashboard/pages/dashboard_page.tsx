import { useSelector } from "react-redux";
import DashboardUserDataCards from "../components/dashboard_data_cards";
import DashboardStationCards from "../components/dashboard_station_data_cards";
import StationRatesGraph from "../components/station_rates_graph";
import { RootState } from "@/common/redux/store";
import DashboardCasesPieCharts from "../components/dashboard_cases_piecharts";

const DashboardPage = () => {
    const { userdata } = useSelector((s: RootState) => s.auth)
    return (
        <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">
            <p className="bg-white p-3 border-b-2 font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"Dashboard"}
            </p>
            <DashboardUserDataCards />
            <p className="font-bold text-3xl px-4 pb-4">
                Station Data
            </p>
            <div className="lg:flex lg:flex-grow lg:flex-row lg:gap-4">
                {/* left container */}
                <div className="flex-grow md:flex-[85%] px-4 overflow-y-auto max-h-[calc(100vh-138px)]">
                    {/* left container content */}
                    <div>
                        <DashboardStationCards stationId={userdata?.stationId} />
                        <StationRatesGraph stationId={userdata?.stationId} />
                        <DashboardCasesPieCharts stationId={userdata?.stationId} />
                        <div className="min-h-96" />
                    </div>
                </div>

                {/* right container */}
                <div className="flex-grow md:flex-[25%] p-4 overflow-y-auto max-h-[calc(100vh-138px)]">
                    {/* right container content */}
                    <div>
                        {/* Right container content goes here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
