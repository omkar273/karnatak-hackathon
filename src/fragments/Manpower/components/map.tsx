import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import useGetStationDetails from '@/fragments/station/hooks/use_get_station_data';

interface Props {
    stationId: string,
}


const LocationMarker = () => {
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const map = useMap(); // Access the map instance
    useMapEvents({
        // click() {
        //     map.locate();
        // },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        map.locate();
    }, [])

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
};

const Map: React.FC<Props> = ({ stationId }) => {

    const { data } = useGetStationDetails(stationId)
    console.log(data);


    return (
        <MapContainer center={[12.9781343, 77.5669546]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    Station
                </Popup>
            </Marker>


            <Marker position={[51.505, -0.09]}>
                <Popup>
                    Station
                </Popup>
            </Marker>

            {
                (data?.lat && data?.lng) && (
                    <Marker position={[data.lat, data.lng]}>
                        <Popup>
                            Station
                        </Popup>
                    </Marker>
                )
            }

            <LocationMarker />
        </MapContainer>
    );
};

export default Map;
