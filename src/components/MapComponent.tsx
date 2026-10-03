"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leafletアイコンのデフォルトパス問題を修正し、色分け用のアイコンを定義
const iconGray = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const iconRed = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type Mansion = {
  物件名: string;
  販売価格: string;
  所在地: string;
  交通アクセス: string;
  lat: number;
  lng: number;
};

type MapProps = {
  mansions: Mansion[];
};

export default function MapComponent({ mansions }: MapProps) {
  const defaultPosition: [number, number] = [34.6937, 135.5023]; // Osaka

  return (
    <div className="w-full h-full z-0">
      <MapContainer 
        center={defaultPosition} 
        zoom={11} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mansions.map((m, index) => (
          <Marker 
            key={index} 
            position={[m.lat, m.lng]}
            icon={m.販売価格 === "価格未定" ? iconGray : iconRed}
          >
            <Popup>
              <div className="font-bold">{m.物件名}</div>
              <div className="text-red-600 font-semibold">{m.販売価格}</div>
              <div className="text-xs text-gray-500 mt-1">{m.所在地}</div>
              <div className="text-xs text-gray-500">{m.交通アクセス}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
