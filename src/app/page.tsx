"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

        <Card className="shadow-lg w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-center">
              Welcome to the Weather App
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base sm:text-lg text-center">
              Get the latest weather updates for your city. Click on the Weather
              link above to get started.
            </CardDescription>
            <div className="flex justify-center mt-4">
              <Link
                href="/weather"
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                Check Weather
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-semibold">
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside mt-4 text-left">
                <li>Real-time weather updates</li>
                <li>7-day weather forecast</li>
                <li>Weather alerts and warnings</li>
                <li>
                  Detailed weather information including temperature, humidity,
                  wind speed, and more
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-semibold">
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-4 text-base">
                Our weather app uses data from OpenWeatherMap to provide you
                with the most accurate and up-to-date weather information.
                Simply enter your city to get started.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-semibold">
                User Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-4 text-base">
                To use our weather app, simply navigate to the weather section,
                enter your city name, and click on the search button. You will
                be presented with the current weather conditions, a 7-day
                forecast, and any weather alerts for your area.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-semibold">
                About Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-4 text-base">
                We are a team of passionate developers dedicated to providing
                you with the best weather information available. Our app is
                constantly updated with the latest data to ensure you are always
                informed about the weather conditions in your area.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-semibold">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-4 text-base">
                If you have any questions or feedback, please feel free to reach
                out to us at support@weatherapp.com. We value your input and are
                always looking for ways to improve our app.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
    </motion.div>
  );
}
