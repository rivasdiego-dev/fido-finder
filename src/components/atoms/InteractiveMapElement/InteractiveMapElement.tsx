import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';


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
    centerPoint?: Point;
    editable?: boolean;
    onPointChange?: (point: Point) => void;
};

export default function InteractiveMapElement({ points, centerPoint, editable = false, onPointChange }: MapComponentProps) {
    const pointArray = Array.isArray(points) ? points : [points];

    if (!centerPoint) { centerPoint = pointArray[0]; }

    const MapEffect = () => {
        const map = useMap();
        useEffect(() => {
            map.setView([centerPoint!.lat, centerPoint!.lng] as [number, number], map.getZoom());
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [centerPoint, map]);

        useMapEvents({
            click: (e) => {
                if (editable && onPointChange) {
                    const newPoint = { lat: e.latlng.lat, lng: e.latlng.lng };
                    onPointChange(newPoint);
                    map.setView(newPoint, map.getZoom());
                }
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
                            {point.title ? (
                                <h3 className="text-lg font-bold">{point.title}</h3>
                            ) : (
                                <h3 className="text-lg font-bold">{`${point.lat}, ${point.lng}`}</h3>
                            )}
                            {point.description && <p className="text-sm">{point.description}</p>}
                        </div>
                    </Popup>
                </Marker>
            ))}
            <MapEffect />
        </MapContainer>
    );
}
