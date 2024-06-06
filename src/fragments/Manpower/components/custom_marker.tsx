import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

type Props = {
    lat: number,
    lng: number
};

const CustomMarker: React.FC<Props> = ({ lat, lng }) => {
    const map = useMap();

    useEffect(() => {
        // Fly to the specified latitude and longitude
        map.flyTo([lat, lng], map.getZoom());
    }, [lat, lng, map]); // Include lat, lng, and map in the dependency array

    return (
        <Marker position={[lat, lng]}>
            <Popup>
                Station
            </Popup>
        </Marker>
    );
};

export default CustomMarker;
