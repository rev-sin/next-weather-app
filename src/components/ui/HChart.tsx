import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: { time: string; humidity: number }[];
  dataKey: string;
  strokeColor: string;
  gradientId: string;
}

const HChart: React.FC<ChartProps> = ({
  data,
  dataKey,
  strokeColor,
  gradientId,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
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
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={strokeColor} />
            <stop offset="100%" stopColor="#82ca9d" />
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HChart;
