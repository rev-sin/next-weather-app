"use client"
import { useState } from "react";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AISearch } from './AISearch';
import { TransparentPopup } from './TransparentPopup';

export function PollutantIcon({ pollutant }: { pollutant: string }) {
  const icons = {
    pm2_5: "🟤", // Brown circle
    pm10: "⚪",  // White circle
    o3: "🟡",    // Yellow circle
    no2: "🟠",   // Orange circle
    so2: "🔴",   // Red circle
    co: "⚫"     // Black circle
  };
  if (!pollutant) return null;
  return (
    <span className="text-2xl" title={pollutant.toUpperCase()}>
      {icons[pollutant as keyof typeof icons] || "🟢"}
    </span>
  );
}

const AQI_COLORS = {
  Good: "bg-green-500",
  Moderate: "bg-yellow-500",
  "Unhealthy for Sensitive Groups": "bg-orange-500",
  Unhealthy: "bg-red-500",
  "Very Unhealthy": "bg-purple-500",
  Hazardous: "bg-maroon-600"
};

const HEALTH_MESSAGES = {
  Good: "Air quality is satisfactory with little health risk.",
  Moderate: "Unusually sensitive people should consider reducing outdoor exertion.",
  "Unhealthy for Sensitive Groups": "People with respiratory conditions should reduce outdoor activities.",
  Unhealthy: "Everyone may begin to experience health effects.",
  "Very Unhealthy": "Health alert - everyone may experience more serious effects.",
  Hazardous: "Health warning of emergency conditions."
};

export function AqiCard({ aqi }: { aqi: { value: number; pollutant: string; category: string } }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  return (
    <>
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl font-semibold">
          Air Quality Index (US EPA)
        </CardTitle>

      </CardHeader>
      <CardContent>
        <motion.div
          className="flex flex-col gap-4 w-full mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`p-6 rounded-lg ${AQI_COLORS[aqi.category as keyof typeof AQI_COLORS]} text-white`}>
            <div className="grid gap-3">
              <p className="text-2xl font-bold">AQI: {aqi.value}</p>
              
              {/* Integrated Pollutant Display */}
              <div className="flex items-center gap-2 text-lg">
                <span>Main Pollutant:</span>
                <PollutantIcon pollutant={aqi.pollutant} />
                <span className="font-medium">
                  {aqi.pollutant.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <p className="text-lg font-medium">Category: {aqi.category}</p>
              <p className="text-sm opacity-90 mt-2">
                {HEALTH_MESSAGES[aqi.category as keyof typeof HEALTH_MESSAGES]}
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  </>
  );
}