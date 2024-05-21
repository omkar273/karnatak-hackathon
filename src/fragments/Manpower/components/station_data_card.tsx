import useGetStationDetails from '@/fragments/station/hooks/use_get_station_data'
import React from 'react'

interface Props {
    stationId: string,
}

const StationDataCard: React.FC<Props> = ({ stationId }) => {
    console.log(`got station id ${stationId}`);

    const { data, loading } = useGetStationDetails(stationId)
    console.log(data);

    

    if (loading) {
        return <div>laoding</div>
    }
    return (
        <div
            className='p-6 absolute bottom-0 right-0 rounded-lg bg-white z-[1500]'>
            <h1 className='font-semibold'>{data?.stationName}</h1>
            <p className='text-xs'>{data?.email}</p>
            <p className='mt-3 font-semibold'>{data?.zone_name}</p>
            <p className='font-semibold'>{data?.district}</p>
        </div>
    )
}

export default StationDataCard