import { PieChart } from "@mui/x-charts/PieChart"
import useStationCounts from "../utils/use_station_counts"

const DashboardCasesPieCharts = ({ stationId }: { stationId: string }) => {
    const { data, loading } = useStationCounts(stationId)


    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-4 grid grid-cols-1 md:gap-4 lg:grid-cols-1">
            <div className="p-1 bg-white rounded-lg">
                <p className="pl-5 pt-5 text-2xl font-semibold font-sans">Staff distribution</p>
                <PieChart
                    series={[
                        {
                            data: [
                                {
                                    value: data?.staff_distribution?.Cyber_Crime ?? 0, label: 'Cyber crime'
                                },
                                {
                                    value: data?.staff_distribution?.Forensics ?? 0, label: 'Forensics'
                                },
                                {
                                    value: data?.staff_distribution?.K9_Unit ?? 0, label: 'K9 Unit'
                                },
                                {
                                    value: data?.staff_distribution?.Narcotics ?? 0, label: 'Narcotics'
                                },
                                {
                                    value: data?.staff_distribution?.Public_Affairs ?? 0, label: 'Public Affairs'
                                },
                                {
                                    value: data?.staff_distribution?.Traffic ?? 0, label: 'Traffic'
                                },
                            ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 2,
                            cornerRadius: 5,

                            cx: 150,
                            cy: 150,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                color: 'gray'
                            },
                        }
                    ]}
                    height={300}
                />
            </div>
            <div className="p-1 bg-white rounded-lg">
                <p className="pl-5 pt-5 text-2xl font-semibold font-sans">
                    Case categories
                </p>
                <PieChart
                    series={[
                        {
                            data: [
                                {
                                    value: data?.cases_distribution?.Assault ?? 0, label: 'Assault'
                                },
                                {
                                    value: data?.cases_distribution?.Assault ?? 0, label: 'Assault'
                                },
                                {
                                    value: data?.cases_distribution?.Drug_Trafficking ?? 0, label: 'Drug_Trafficking'
                                },

                                {
                                    value: data?.cases_distribution?.Fraud ?? 0, label: 'Fraud'
                                },
                                {
                                    value: data?.cases_distribution?.Violence ?? 0, label: 'Violence'
                                },
                            ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 2,
                            cornerRadius: 5,

                            cx: 150,
                            cy: 150,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                color: 'gray'
                            },
                        }
                    ]}
                    height={300}
                />
            </div>
        </div>
    )
}

export default DashboardCasesPieCharts