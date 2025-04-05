import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

type WeatherMapProps = {
  center: {
    lat: number;
    lon: number;
  };
  temperature: number;
};

const WeatherMap: React.FC<WeatherMapProps> = ({ center, temperature }) => {
  const getColorFromTemp = (temp: number) => {
    if (temp < 10) return "#00f";
    if (temp < 25) return "#0f0";
    return "#f00";
  };

  return (
    <MapContainer
      center={[center.lat, center.lon]}
      zoom={8}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%", zIndex: 0 }}
    >
      <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
      center={[center.lat, center.lon]}
      radius={20}
      pathOptions={{ color: getColorFromTemp(temperature) }}
      >
      <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
        {`${temperature}°C`}
      </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
};

export default WeatherMap;
