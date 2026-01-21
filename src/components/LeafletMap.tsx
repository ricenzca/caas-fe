"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Polyline, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import { latLngBounds, LatLngExpression, LatLngTuple } from "leaflet";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect } from "react";

interface MapProps {
    center?: LatLngExpression | LatLngTuple;
    zoom?: number;
    positions: LatLngExpression[];
}
export default function Map({ zoom = 2, center = [0, 0], positions }: MapProps) {
    const markers = positions.map((position, idx) => (
        <Marker key={idx} position={position}>
            <Popup>{`[${position.toString()}]`}</Popup>
        </Marker>)
    )

    return (
        <MapContainer attributionControl={false} center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {positions.length > 0 && <Polyline positions={positions} />}
            {markers}
            <RecenterToMarkers positions={positions} />
        </MapContainer>
    );
};

interface RecenterToMarkersProps {
    positions: LatLngExpression[];
}
function RecenterToMarkers({ positions }: RecenterToMarkersProps) {
    const map = useMap()

    useEffect(() => {
        if (positions.length > 0) {
            map.fitBounds(latLngBounds(positions), { padding: [50, 50] })
        }
    }, [positions, map])

    return null
}