import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }: { text: string, lat: number, lng: number }) => <div>{text}</div>;

export default function SimpleMap() {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                options={{ streetView: true }}
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >

            </GoogleMapReact>
        </div>
    );
}