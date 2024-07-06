import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet';


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
    popupComponent?: React.ReactNode;
};

type FullscreenMapComponentProps = {
    points: Point[] | Point;
    centerPoint?: Point;
};

const FullscreenMapComponent: React.FC<FullscreenMapComponentProps> = ({ points, centerPoint }) => {
    const pointArray = Array.isArray(points) ? points : [points];
    const mapCenter = centerPoint || (pointArray.length ? pointArray[0] : { lat: 0, lng: 0 }); // default center if no points

    return (
        <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '0.5rem', flex: '1 0 0' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pointArray.map((point, index) => (
                <Marker key={index} position={[point.lat, point.lng]}>
                    {
                        point.popupComponent && point.popupComponent
                    }
                </Marker>
            ))}
            {centerPoint && (
                <Circle
                    center={[centerPoint.lat, centerPoint.lng]}
                    radius={5000}
                    color="red"
                    fillColor="black"
                    fillOpacity={0.2}
                    stroke={false}
                />
            )}
        </MapContainer>
    );
};

export default FullscreenMapComponent;
