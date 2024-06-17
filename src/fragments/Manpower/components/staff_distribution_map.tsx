import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useState} from 'react';
import police_station_icon from '@/assets/svg/police_station_ic.svg';
import police_icon from '@/assets/svg/police_ic.svg';
import L from 'leaflet';
import {UserModel} from "@/fragments/user_management/models/user_model.ts";
import 'leaflet/dist/leaflet.css';
import FullScreen from "react-fullscreen-crossbrowser";
import {Expand, Shrink} from "lucide-react";
import {StationModel} from "@/fragments/station/models/station_model.ts";
import LocationMarker from "@/fragments/Manpower/components/location_marker.tsx";
import StaffDistributionEnum from "@/fragments/Manpower/enum/staff_distribution_enum.ts";
import {RanksEnum} from "@/common/post/ranks.ts";

interface Props {
	lat: number;
	lng: number;
	center_marker_title?: string;
	userList?: UserModel[];
	stationList?: StationModel [];
	distribution_type: StaffDistributionEnum
}


const policeMarker = new L.Icon({
	iconUrl: police_icon,
	iconSize: [40, 40], // or new L.Point(40, 40)
	iconAnchor: [20, 20], // Adjust icon anchor to center the icon
	popupAnchor: [0, -20] // Adjust popup anchor to appear above the icon
});

const policeStationMarker = new L.Icon({
	iconUrl: police_station_icon,
	iconSize: [60, 60], // or new L.Point(60, 60)
	iconAnchor: [30, 30], // Adjust icon anchor to center the icon
	popupAnchor: [0, -30] // Adjust popup anchor to appear above the icon
});


const getMarker = (user: UserModel, distributionType: StaffDistributionEnum): L.Icon => {
	if (distributionType === StaffDistributionEnum.Department) {
		return policeMarker;
	} else if (distributionType === StaffDistributionEnum.Skill) {
		return policeMarker;
	} else if (distributionType === StaffDistributionEnum.Ranks) {
		if (user.post === RanksEnum.Commisioner) {
			return policeMarker;
		} else if (user.post === RanksEnum.AssistantCommisioner) {
			return policeMarker;
		}
		return policeMarker;
	}
	
	return policeMarker;
	
}

const StaffDistributionMap: React.FC<Props> = ({lat, lng, userList, stationList, distribution_type}) => {
	
	const [fullScreen, setFullScreen] = useState(false);
	
	return (
		<div className={'relative w-full'}>
			<FullScreen
				enabled={fullScreen}
				onChange={(e) => setFullScreen(e)}
			>
				<MapContainer center={[12.971599, 77.594566]} zoom={13} scrollWheelZoom={fullScreen} className={'h-[30vh]'}>
					{/*<MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>*/}
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					
					{userList?.map((user, i) => {
						console.log(user.lat,user.lng)
						
						return (
							<Marker position={[user.lat || 0, user.lng || 0]}
							        icon={getMarker(user, distribution_type)} key={i}>
								<Popup>
					              <span className='font-bold'>
					                {user.name}
					              </span>
								</Popup>
							</Marker>
						);
					})}
					
					{stationList?.map((station, i) => {
						return (
							<Marker position={[station.lat || 0, station.lng || 0]} icon={policeStationMarker} key={i}>
								<Popup>
					              <span className='font-bold'>
					                {station.station_name}
					              </span>
								</Popup>
							</Marker>
						);
					})}
					
					<LocationMarker lng={lng} lat={lat}/>
				</MapContainer>
				<button
					className={'absolute top-0 right-0 p-4 bg-opacity-40 z-[100] bg-gray-900 rounded-md text-white text-lg font-bold'}
					onClick={
						() => setFullScreen((prev => !prev))
					}>
					{fullScreen ? <Shrink/> : <Expand/>}
				</button>
			</FullScreen>
		
		</div>
	);
};

export default StaffDistributionMap;
