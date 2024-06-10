import { GridLoader } from "react-spinners"
import useStationCounts from "../utils/use_station_counts"
import DataCard from "./data_card"

const DashboardStationCards = ({ stationId }: { stationId: string }) => {


    const { data, error, loading } = useStationCounts(stationId)

    if (loading) {
        return (
            <div className="p-12 w-full flex justify-center items-center">
                <GridLoader
                    color="#0891B2"
                    size={25}
                />
            </div>
        )
    }


    return (
        <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-5 md:gap-y-3  ">

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

                    </>
                )
            }
        </div>
    )
}

export default DashboardStationCards