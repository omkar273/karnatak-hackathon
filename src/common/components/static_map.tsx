import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from 'react';
import LatLng from '@/types/latlng';
import inspector_data from '@/data/json/inspector_data.json';
import sub_inspector_data from '@/data/json/sub_inspector_data.json';
import head_constable_data from '@/data/json/head_constable_data.json';
// import constable_data from '@/data/json/constable_data.json';
import {UserModel} from "@/fragments/user_management/models/user_model";
import {generateRandomLatLngWithinRadius} from "@/common/utils/generate_random_latlng";
import police_station_icon from '@/assets/svg/police_station_ic.svg'
import police_icon from '@/assets/svg/police_ic.svg'
import L from 'leaflet';

interface Props {
	lat: number,
	lng: number,
	station_name?: string,
	station_id: string,
}

interface UserProps {
	name: string,
	post: string,
	locationDetails: { location: LatLng; distance: number }
}

const policeMarker = new L.Icon({
	iconUrl: police_icon,
	iconSize: [40, 40], // or new L.Point(40, 40)
	className: '',
	iconAnchor: [20, 20], // Adjust icon anchor to center the icon
	popupAnchor: [0, -20] // Adjust popup anchor to appear above the icon
});

const policeStationMarker = new L.Icon({
	iconUrl: police_station_icon,
	iconSize: [60, 60], // or new L.Point(60, 60)
	className: '',
	iconAnchor: [30, 30], // Adjust icon anchor to center the icon
	popupAnchor: [0, -30] // Adjust popup anchor to appear above the icon
});

const LocationMarker: React.FC<Props> = ({lat, station_id, lng}) => {
	const [position, setPosition] = useState<LatLng | null>(null);
	const [userLocations, setUserLocations] = useState<UserProps[]>([]);
	
	const userList: UserModel[] = [
		...inspector_data,
		...sub_inspector_data,
		...head_constable_data,
		// ...constable_data
	];
	
	const map = useMap();
	
	useMapEvents({
		click(e) {
			map.flyTo(e.latlng, map.getZoom());
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});
	
	useEffect(() => {
		// map.locate();
		
		const nearbyUsers: UserProps[] = userList.filter(user => user.stationId === station_id).map(user => ({
			name: user.name,
			post: user.post,
			locationDetails: generateRandomLatLngWithinRadius({lng, lat}, 3)
		}));
		
		map.flyTo([lat,lng], map.getZoom());
		
		setUserLocations(nearbyUsers);
	}, [lat, lng, station_id]);
	
	
	
	
	return (
		<>
			{position && (
				<Marker position={[position.lat, position.lng]}>
					<Popup>You are here</Popup>
				</Marker>
			)}
			
			{userLocations.map((userdata, index) => (
				<Marker key={index}
				        position={[userdata.locationDetails.location.lat, userdata.locationDetails.location.lng]}
				        icon={policeMarker}>
					<Popup>
						<h1 className='font-semibold'>{userdata.name}</h1>
						<h1 className='font-normal'>{userdata.post}</h1>
						<h1 className='font-normal'>{`${userdata.locationDetails.distance} km away from station`}</h1>
					</Popup>
				</Marker>
			))}
		</>
	);
};

const StaticMap: React.FC<Props> = ({lat, lng, station_name, station_id}) => {
	console.log(lat, lng, station_name, station_id);
	return (
		<MapContainer center={[12.971599, 77.594566]} zoom={13} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[lat, lng]} icon={policeStationMarker}>
				<Popup>
                    <span className='font-bold'>
                        {station_name}{' Station'}
                    </span>
				</Popup>
			</Marker>
			<LocationMarker lng={lng} lat={lat} station_id={station_id ?? ''}/>
		</MapContainer>
	);
};

export default StaticMap;
