import React, {useEffect, useState} from "react";
import LatLng from "@/types/latlng.ts";
import {Marker, Popup, useMap, useMapEvents} from "react-leaflet";

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

export default LocationMarker
