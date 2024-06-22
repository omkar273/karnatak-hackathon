import {CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from 'react';
import LatLng from '@/types/latlng';
// import constable_data from '@/data/json/constable_data.json';
import police_station_icon from '@/assets/svg/police_station_ic.svg'
import L from 'leaflet';

interface Props {
	lat: number,
	lng: number,
	station_name?: string,
	// station_id: string,
}


const policeStationMarker = new L.Icon({
	iconUrl: police_station_icon,
	iconSize: [60, 60], // or new L.Point(60, 60)
	className: '',
	iconAnchor: [30, 30], // Adjust icon anchor to center the icon
	popupAnchor: [0, -30] // Adjust popup anchor to appear above the icon
});

const LocationMarker: React.FC<Props> = ({lat, lng}) => {
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
		
		
		map.flyTo([lat, lng], map.getZoom());
		
	}, [lat, lng]);
	
	
	return (
		<>
			{position && (
				<Marker position={[position.lat, position.lng]}>
					<Popup>You are here</Popup>
				</Marker>
			)}
			
			{position && (
				<CircleMarker center={[position.lat, position.lng]} pathOptions={{fillColor: 'blue'}} radius={20}>
					<Popup>Popup in CircleMarker</Popup>
				</CircleMarker>
			
			)}
		
		</>
	);
};

const HotspotZoneMap: React.FC<Props> = ({lat, lng, station_name}) => {
	console.log(lat, lng, station_name);
	const alertZones = [
		{
			'color': '',
			"lat": 12.4354,
			"lng": 76.8182
		},
		{
			'color': '',
			"lat": 12.9364,
			"lng": 77.6192
		},
		{
			'color': '',
			"lat": 12.9314,
			"lng": 77.6162
		},
		{
			'color': '',
			"lat": 11.256,
			"lng": 77.6195
		},
		{
			'color': '',
			"lat": 12.9342,
			"lng": 77.6792
		},
		{
			'color': '',
			"lat": 12.9344,
			"lng": 77.6194
		},
	
	]
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
			
			<CircleMarker center={[lat, lng]} pathOptions={{color: 'red'}} radius={50}>
				<Popup>Popup in CircleMarker</Popup>
			</CircleMarker>
			
			{
				alertZones.map((zone, i) => (
					<CircleMarker center={[zone.lat, zone.lng]} pathOptions={{color: 'red'}} radius={50}>
						<Popup>Popup in CircleMarker</Popup>
					</CircleMarker>
				))
			}
			
			<LocationMarker lng={lng} lat={lat}/>
		</MapContainer>
	);
};

export default HotspotZoneMap;
