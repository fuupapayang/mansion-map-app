"use client";

import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

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

export default function Map({ mansions }: MapProps) {
  const defaultPosition = { lat: 34.6937, lng: 135.5023 }; // Osaka

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "dummy"}>
      <div className="w-full h-full">
        <GoogleMap
          defaultCenter={defaultPosition}
          defaultZoom={11}
          mapId="MANSION_MAP_ID"
        >
          {mansions.map((m, index) => (
            <AdvancedMarker 
              key={index} 
              position={{ lat: m.lat, lng: m.lng }}
              title={`${m.物件名}\n${m.販売価格}`}
            >
              <Pin 
                background={m.販売価格 === "価格未定" ? "#9ca3af" : "#ef4444"} 
                borderColor="#b91c1c"
                glyphColor="#fff"
              />
            </AdvancedMarker>
          ))}
        </GoogleMap>
      </div>
    </APIProvider>
  );
}
