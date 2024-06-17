import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useEffect, useState} from 'react';
import LatLng from '@/types/latlng';
import police_station_icon from '@/assets/svg/police_station_ic.svg';
import police_icon from '@/assets/svg/police_ic.svg';
import L from 'leaflet';
import {UserModel} from "@/fragments/user_management/models/user_model.ts";
import 'leaflet/dist/leaflet.css';
import FullScreen from "react-fullscreen-crossbrowser";
import {Expand, Shrink} from "lucide-react";

interface Props {
	lat: number;
	lng: number;
	center_marker_title?: string;
	userList: UserModel[];
}

const policeMarker = new L.Icon({
	iconUrl: police_icon,
	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20]
});

const policeStationMarker = new L.Icon({
	iconUrl: police_station_icon,
	iconSize: [60, 60], // or new L.Point(60, 60)
	iconAnchor: [30, 30], // Adjust icon anchor to center the icon
	popupAnchor: [0, -30] // Adjust popup anchor to appear above the icon
});

const LocationMarker: React.FC<{ lat: number; lng: number }> = ({lat, lng}) => {
	const [position, setPosition] = useState<LatLng | null>(null);
	
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
		map.flyTo([lat, lng], map.getZoom())
	}, [lat, lng]);
	
	
	return (
		<>
			{position && (
				<Marker position={[position.lat, position.lng]}>
					<Popup>You are here</Popup>
				</Marker>
			)}
		</>
	);
};

const StaticMap: React.FC<Props> = ({lat, lng, center_marker_title, userList}) => {
	
	const [fullScreen, setFullScreen] = useState(false);
	
	
	return (
		<div className={'relative w-full'}>
			<FullScreen
				enabled={fullScreen}
				onChange={(e) => setFullScreen(e)}
			>
				<MapContainer center={[12.971599, 77.594566]} zoom={13} scrollWheelZoom={false} className={'h-[30vh]'}>
					{/*<MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>*/}
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[lat, lng]} icon={policeStationMarker}>
						<Popup>
				          <span className='font-bold'>
				            {center_marker_title} Station
				          </span>
						</Popup>
					</Marker>
					
					{userList.map((user, i) => {
						
						return (
							<Marker position={[user.lat || 0, user.lng || 0]} icon={policeMarker} key={i}>
								<Popup>
					              <span className='font-bold'>
					                {user.name}
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

export default StaticMap;
