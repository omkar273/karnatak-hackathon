import useStationRates from "../utils/use_station_rates"
import { LineChart } from '@mui/x-charts/LineChart';
const StationRatesGraph = ({ stationId }: { stationId: string }) => {


    const { data, loading } = useStationRates(stationId)
    const xLabels = [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
    ]

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-4 rounded-lg border border-gray-200 bg-white my-3">
            <p className="px-4 py-3 font-bold text-2xl text-gray-500">Crime Rate VS Crime Clearance Rate</p>
            <LineChart
                xAxis={[{
                    scaleType: "band", data: xLabels
                }]}
                series={[
                    {
                        data: [
                            data?.jan.crime_rate ?? 0,
                            data?.feb.crime_rate ?? 0,
                            data?.mar.crime_rate ?? 0,
                            data?.apr.crime_rate ?? 0,
                            data?.may.crime_rate ?? 0,
                            data?.jun.crime_rate ?? 0,
                            data?.jul.crime_rate ?? 0,
                            data?.aug.crime_rate ?? 0,
                            data?.sep.crime_rate ?? 0,
                            data?.oct.crime_rate ?? 0,
                            data?.nov.crime_rate ?? 0,
                            data?.dec.crime_rate ?? 0,
                        ],
                        label: 'Crime rate',
                        color: '#FF0000'
                    },
                    {
                        data: [
                            data?.jan.crime_clearance_rate ?? 0,
                            data?.feb.crime_clearance_rate ?? 0,
                            data?.mar.crime_clearance_rate ?? 0,
                            data?.apr.crime_clearance_rate ?? 0,
                            data?.may.crime_clearance_rate ?? 0,
                            data?.jun.crime_clearance_rate ?? 0,
                            data?.jul.crime_clearance_rate ?? 0,
                            data?.aug.crime_clearance_rate ?? 0,
                            data?.sep.crime_clearance_rate ?? 0,
                            data?.oct.crime_clearance_rate ?? 0,
                            data?.nov.crime_clearance_rate ?? 0,
                            data?.dec.crime_clearance_rate ?? 0,
                        ],
                        label: 'Crime Clearance Rate',
                        color: '#008000'
                    },
                ]}
                height={300}
            />
        </div>
    )
}

export default StationRatesGraph