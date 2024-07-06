import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';


import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


type Point = {
    lat: number;
    lng: number;
    title?: string;
    description?: string;
};

type MapComponentProps = {
    points: Point[] | Point;
};

const MapComponent: React.FC<MapComponentProps> = ({ points }) => {
    const pointArray = Array.isArray(points) ? points : [points];
    const centerPoint = pointArray.length ? pointArray[0] : { lat: 0, lng: 0 }; // default center if no points

    const ZoomHandler = () => {
        const map = useMapEvents({
            click: () => {
                map.setView([centerPoint.lat, centerPoint.lng], 15); // Zoom to level 15 when map is clicked
            },
        });
        return null;
    };

    return (
        <MapContainer center={[centerPoint.lat, centerPoint.lng]} zoom={13} style={{ height: '33vh', width: '100%', borderRadius: '0.5rem' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pointArray.map((point, index) => (
                <Marker key={index} position={[point.lat, point.lng]}>
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
                </Marker>
            ))}
            <ZoomHandler />
        </MapContainer>
    );
};

export default MapComponent;
