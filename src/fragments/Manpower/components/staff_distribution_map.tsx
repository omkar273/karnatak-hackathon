import {CircleMarker, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useState} from 'react';
import police_station_icon from '@/assets/svg/police_station_ic.svg';
import police_icon from '@/assets/svg/police_ic.svg';
import L from 'leaflet';
import {UserModel} from "@/fragments/user_management/models/user_model.ts";
import FullScreen from "react-fullscreen-crossbrowser";
import {Expand, Shrink} from "lucide-react";
import {StationModel} from "@/fragments/station/models/station_model.ts";
import LocationMarker from "@/fragments/Manpower/components/location_marker.tsx";
import StaffDistributionEnum from "@/fragments/Manpower/enum/staff_distribution_enum.ts";
import {RanksEnum} from "@/common/post/ranks.ts";
import forensic from '@/assets/svg/forensic.svg';
import anti_drug from '@/assets/svg/anti_drug.svg';
import public_icon from '@/assets/svg/public.svg';
import women_police from '@/assets/svg/women_police.svg';
import special_force from '@/assets/svg/special _force.svg';
import human_right from '@/assets/svg/human_right.svg';
import cyber_security from '@/assets/svg/cyber_security.svg';


const forensicMarker = new L.Icon({
	iconUrl: forensic,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});


const antiDrugMarker = new L.Icon({
	iconUrl: anti_drug,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});
const publicMarker = new L.Icon({
	iconUrl: public_icon,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});


const womenPoliceMarker = new L.Icon({
	iconUrl: women_police,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});
const specialForceMarker = new L.Icon({
	iconUrl: special_force,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});


const humanRightMarker = new L.Icon({
	iconUrl: human_right,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});
const cyberSecurityMarker = new L.Icon({
	iconUrl: cyber_security,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});


const policeMarker = new L.Icon({
	iconUrl: police_icon,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});

const policeStationMarker = new L.Icon({
	iconUrl: police_station_icon,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});

interface Props {
	lat: number;
	lng: number;
	center_marker_title?: string;
	userList?: UserModel[];
	stationList?: StationModel [];
	distribution_type: StaffDistributionEnum
}


const getMarker = (user: UserModel, distributionType: StaffDistributionEnum): L.Icon => {
	if (distributionType === StaffDistributionEnum.Department) {
		if (user.department == 'TrafficPolice') {
			return policeMarker;
		} else if (user.department == 'CrimeBranch') {
			return policeMarker;
		} else if (user.department == 'CyberCrimeCell') {
			return cyberSecurityMarker;
		} else if (user.department == 'AntiTerrorismSquad') {
			return policeMarker;
		} else if (user.department == 'SpecialBranch') {
			return specialForceMarker;
		} else if (user.department == 'TrafficPolice') {
			return policeMarker;
		} else if (user.department == 'WomensPoliceStations') {
			return womenPoliceMarker;
		} else if (user.department == 'AntiNarcoticsCell') {
			return antiDrugMarker;
		} else if (user.department == 'ForensicScienceLaboratory') {
			return forensicMarker;
		} else if (user.department == 'PoliceTrainingAcademies') {
			return policeMarker;
		} else if (user.department == 'BombDisposalSquad') {
			return policeMarker;
		} else if (user.department == 'HumanRightsCell') {
			return humanRightMarker;
		} else if (user.department == 'PublicRelationsDepartment') {
			return publicMarker;
		}
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
				<MapContainer center={[12.971599, 77.594566]} zoom={13} scrollWheelZoom={fullScreen}
				              className={'h-[30vh]'}>
					{/*<MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>*/}
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					
					<CircleMarker center={[lat, lng]} pathOptions={{color: 'red'}} radius={200}>
						<Popup>Popup in CircleMarker</Popup>
					</CircleMarker>
					
					
					{userList?.map((user, i) => {
						console.log(user.lat, user.lng)
						
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
