"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
  useEffect(() => {
    // Ensure the map container exists
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Map container not found.");
      return;
    }

    // Initialize the Leaflet map
    const map = L.map("map").setView([20, 78], 5); // Default to India

    // Add OpenStreetMap as the base layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add OpenWeatherMap tile layer (e.g., clouds)
    L.tileLayer(
      `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`,
      {
        attribution: "&copy; OpenWeatherMap",
      }
    ).addTo(map);

    // Cleanup on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default WeatherMap;