import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";
import useUserCounts from "../utils/use_user_counts";
import DataCard from "./data_card";


const DashboardUserDataCards = () => {
    const { currentUser } = useSelector((s: RootState) => s.auth)

    const { data, error, loading } = useUserCounts(currentUser?.user.uid);


    return (
        <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-5 md:gap-y-3 lg:grid-cols-4 p-4 ">

            {
                !error && (
                    <>
                        <DataCard
                            title="Cases registered this month"
                            value={loading ? '--' : (data?.cases_registered ?? '--')}
                            change_percentage={'-36%'}
                        />

                        <DataCard
                            title="Pending cases"
                            value={loading ? '--' : (data?.pending_cases ?? '--')}
                            change_percentage={'-12%'}
                        />

                        <DataCard
                            title="Closed cases"
                            value={loading ? '--' : (data?.closed_cases ?? '--')}
                            change_percentage={'+40'}
                        />

                        <DataCard
                            title="Cases alloted to you"
                            value={loading ? '--' : (data?.cases_alloted_to_me ?? '--')}
                            change_percentage={'-20%'}
                        />
                    </>
                )
            }
        </div>
    )
}

export default DashboardUserDataCards

