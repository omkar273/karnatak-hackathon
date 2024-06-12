import { useSelector } from "react-redux";
import Map from "../components/map";
import { useEffect, useState } from "react";
import { RootState } from "@/common/redux/store";
import useGetAllStations from "@/fragments/station/hooks/use_get_all_stations";
import StationDataCard from "../components/station_data_card";

const Manpower = () => {
  const { userdata } = useSelector((s: RootState) => s.auth)
  const [stationId, setstationId] = useState(userdata?.stationId)


  useEffect(() => {
    setstationId(userdata?.stationId)
  }, [userdata?.stationId])


  const [stationsData, setstationsData] = useState([{
    stationId: stationId,
    label: 'Own station',
    value: userdata?.stationId,
  }])

  const stations = useGetAllStations({ comesUnder: stationId, initialLimit: 10 })

  useEffect(() => {
    stations.fetchStations();
  }, [stationId]);

  useEffect(() => {
    setstationsData([
      {
        stationId: userdata?.stationId,
        label: 'Own station',
        value: userdata?.stationId
      },
      ...stations.documents.map((station) => {
        return {
          stationId: station.id,
          label: station.station_name,
          value: station.id ?? ''
        }
      })
    ])


  }, [stations.documents])



  // const handleChange = (value: { value: string; label: React.ReactNode }) => {
  //   setstationId(value.value)

  // };

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <div className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
        <p className="font-open-sans font-semibold ">
          {"Dashboard"}
        </p>
        {/* <Select
          labelInValue
          defaultValue={stationsData[0]}
          style={{ width: 'max-content' }}
          onChange={handleChange}
          options={stationsData}
        /> */}
        {stationsData && (<div></div>)}

      </div>
      <div className="p-4 w-full h-full overflow-clip relative">
        <Map stationId={stationId ?? ''} />
        <StationDataCard stationId={stationId ?? ''} />
      </div>
    </div>
  );
};


export default Manpower
