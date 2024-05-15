import React from "react"
import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";
import useUserCounts from "../utils/use_user_counts";


const DashboardDataCards = () => {
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

export default DashboardDataCards


type DataCardProps = {
    title: string,
    value: string | number,
    change_percentage?: string | number,
    change_label?: string
}
const DataCard: React.FC<DataCardProps> = ({
    title,
    value,
    change_percentage,
    change_label
}) => {
    return (
        <div className="p-3 hover:scale-[1.02] transition-all duration-400 rounded-md bg-white cursor-pointer border border-gray-200" >

            <p className="text-[0.95rem] font-semibold- text-gray-500">
                {title}
            </p>


            <p className="text-3xl p-4  font-extrabold">
                {value}
            </p>
            {
                change_percentage && (
                    <div className="flex gap-2 items-center">
                        <span className="py-1 px-2 rounded-3xl text-green-700 bg-green-200">
                            {change_percentage}
                        </span>
                        <p className="text-[0.75rem] font-semibold- text-gray-500">
                            {change_label ?? 'compared to last month'}
                        </p>
                    </div>
                )
            }

        </div>
    )
}

