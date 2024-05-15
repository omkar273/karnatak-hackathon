import DashboardDataCards from "../components/dashboard_data_cards";

const DashboardPage = () => {

    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"Dashboard"}
            </p>
            <DashboardDataCards />

            <div className="md:flex md:gap-4 justify-between">

                {/* left container */}
                <div className="flex-grow flex-[70%] p-4 max-h-screen overflow-y-auto ">

                    {/* left conatiner content */}
                    <div>
                    </div>
                </div>

                {/* right container */}
                <div className="flex-grow flex-[30%] p-4 max-h-screen overflow-y-auto">

                    {/* right container content */}
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage
