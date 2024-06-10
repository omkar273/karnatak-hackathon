import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
    lat: number,
    lng: number,
    station_name?: string
}

const StaticMap: React.FC<Props> = ({ lat, lng, station_name }) => {


    return (
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
                <Popup>
                    <span className='font-bold'>
                        {station_name}{' Station'}
                    </span>

                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default StaticMap;
