import {useEffect, useState} from 'react'
import HotspotZoneMap from "@/common/components/hotspt_zones_map.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import stations_data from "@/data/json/stations_data.json";
import {StationModel} from "@/fragments/station/models/station_model.ts";

const AlertZoneHotspot = () => {
	const navigate = useNavigate();
	const [queryParams] = useSearchParams();
	
	const [stationData, setStationData] = useState<StationModel | null>(null);
	
	
	useEffect(() => {
		const id = queryParams.get('id');
		if (!id) {
			navigate('/emergency_zones');
			return;
		}
		
		const station = stations_data.find(
			s => s.id === id);
		
		console.log(station)
		
		if (station) {
			setStationData(station)
		} else {
			navigate('/emergency_zones');
			return;
		}
		
	}, [queryParams, navigate]);
	
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Alert Zones Hotspot"}
			</p>
			<div className="p-4 h-[80vh] overflow-hidden">
				<HotspotZoneMap lat={stationData?.lat || 0} lng={stationData?.lng || 0}/>
			</div>
		</div>
	)
}
export default AlertZoneHotspot
