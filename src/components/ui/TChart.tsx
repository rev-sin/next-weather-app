import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "./button"; // Adjust the import path as necessary
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./select"; // Adjust the import path as necessary

interface ChartProps {
  data: { time: string; temp: number }[];
  dataKey: string;
  strokeColor: string;
}

const TChart: React.FC<ChartProps> = ({
  data,
  dataKey,
  strokeColor,
}) => {
  const [isLineChart, setIsLineChart] = useState(true);
  const [intervals, setIntervals] = useState(3);
  const [showLegend, setShowLegend] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + intervals < data.length) {
      setStartIndex(startIndex + intervals);
    }
  };

  const handlePrev = () => {
    if (startIndex - intervals >= 0) {
      setStartIndex(startIndex - intervals);
    }
  };

  const filteredData = data.slice(startIndex, startIndex + intervals);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", background: "#fff", color: "black", borderRadius: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <Button onClick={() => setIsLineChart(!isLineChart)} className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          {isLineChart ? "Switch to Bar Chart" : "Switch to Line Chart"}
        </Button>
        <Select onValueChange={(value) => setIntervals(Number(value))} value={intervals.toString()}>
          <SelectTrigger className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            <SelectValue placeholder="Select intervals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 Intervals</SelectItem>
            <SelectItem value="5">5 Intervals</SelectItem>
            <SelectItem value="10">10 Intervals</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setShowLegend(!showLegend)} className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          {showLegend ? "Hide Legend" : "Show Legend"}
        </Button>
        <Button onClick={() => setShowGrid(!showGrid)} className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          {showGrid ? "Hide Grid" : "Show Grid"}
        </Button>
        <Button onClick={handlePrev} disabled={startIndex === 0} className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          Previous
        </Button>
        <Button onClick={handleNext} disabled={startIndex + intervals >= data.length} className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          Next
        </Button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {isLineChart ? (
          <LineChart data={filteredData}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey="time"
              tickFormatter={(time) =>
                new Date(time).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                })
              }
            />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={strokeColor}
            />
          </LineChart>
        ) : (
          <BarChart data={filteredData}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey="time"
              tickFormatter={(time) =>
                new Date(time).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                })
              }
            />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            <Bar dataKey={dataKey} fill={strokeColor} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TChart;
