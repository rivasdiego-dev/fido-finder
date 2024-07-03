import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icons issue with Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

type Point = {
    lat: number;
    lng: number;
    title?: string;
    description?: string;
};

type MapComponentProps = {
    points: Point[];
};

const MapComponent: React.FC<MapComponentProps> = ({ points }) => {
    return (
        <MapContainer center={[points[0].lat, points[0].lng]} zoom={13} style={{ height: '33vh', width: '100%', borderRadius: '0.5rem' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {points.map((point, index) => (
                <Marker key={index} position={[point.lat, point.lng]}>
                    {

                        <Popup closeButton={false}>
                            <div>
                                {
                                    point.title ?
                                        <h3 className="text-lg font-bold">{point.title}</h3>
                                        :
                                        <h3 className="text-lg font-bold">{`${point.lat}, ${point.lng}`}</h3>
                                }
                                {
                                    point.description &&
                                    <p className="text-sm">{point.description}</p>
                                }
                            </div>
                        </Popup>
                    }
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
