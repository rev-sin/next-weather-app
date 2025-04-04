'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

type PollutionData = {
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
};

export default function AirPollutionPage() {
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [data, setData] = useState<PollutionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCoords = async (cityName: string) => {
    try {
      const res = await fetch(`/api/geo?city=${cityName}`);
      const json = await res.json();
      if (!json.lat || !json.lon) throw new Error('Location not found');
      setCoords({ lat: json.lat, lon: json.lon });
    } catch (err: any) {
      console.error(err);
      setError('City not found or failed to fetch location.');
      setCoords(null);
    }
  };

  const fetchAirData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/air?lat=${lat}&lon=${lon}`);
      const json = await res.json();
      const pollution = json.list?.[0];
      if (pollution) {
        setData(pollution);
        setError('');
      } else {
        setError('No pollution data found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch air pollution data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coords) {
      fetchAirData(coords.lat, coords.lon);
    }
  }, [coords]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setData(null);
    setError('');
    await fetchCoords(city);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-lg">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col w-full max-w-6xl gap-8 items-center mt-4">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-semibold">
              Air Pollution Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            {!loading && !error && data && (
              <motion.div
                className="flex flex-col gap-4 w-full mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-4 shadow-md rounded-md bg-white text-black">
                  <ul className="space-y-1">
                    {Object.entries(data.components).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key.toUpperCase()}:</strong> {value} µg/m³
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
