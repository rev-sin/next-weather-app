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
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../../components/ui/select";

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "#8884d8",
  },
};

interface TemperatureChartProps {
  data: { time: string; temp: number }[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const [isLineChart, setIsLineChart] = useState(true);
  const [intervals, setIntervals] = useState(5);
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
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
        background: "#fff",
        color: "black",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: "10px",
        }}
      >
        <Button
          onClick={() => setIsLineChart(!isLineChart)}
          className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          {isLineChart ? "Switch to Bar Chart" : "Switch to Line Chart"}
        </Button>
        <Select
          onValueChange={(value) => setIntervals(Number(value))}
          value={intervals.toString()}
        >
          <SelectTrigger className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            <SelectValue placeholder="Select intervals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 Intervals</SelectItem>
            <SelectItem value="5">5 Intervals</SelectItem>
            <SelectItem value="10">10 Intervals</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => setShowLegend(!showLegend)}
          className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          {showLegend ? "Hide Legend" : "Show Legend"}
        </Button>
        <Button
          onClick={() => setShowGrid(!showGrid)}
          className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          {showGrid ? "Hide Grid" : "Show Grid"}
        </Button>
        <Button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          &#8592;
        </Button>
        <Button
          onClick={handleNext}
          disabled={startIndex + intervals >= data.length}
          className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          &#8594;
        </Button>
      </div>
      <ResponsiveContainer
        width="100%"
        aspect={window.innerWidth < 768 ? 7 / 5 : 3 / 1}
      >
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
              dataKey="temp"
              stroke={chartConfig.temperature.color}
              dot={false}
              fill="none"
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
            <Bar dataKey="temp" fill={chartConfig.temperature.color} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
