// src/pages/driver/Earnings.tsx
import { useGetEarningsQuery } from "@/redux/features/driver/driver.api";
import { Bar } from "recharts";
import { BarChart } from "recharts";
import { ResponsiveContainer } from "recharts";
import {   XAxis, YAxis, Tooltip,  } from "recharts";

const Earnings = () => {
  const { data, isLoading } = useGetEarningsQuery(null);

  if (isLoading) return <p>Loading...</p>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartData = data?.data?.map((d: any, i: number) => ({
    name: `Day ${i + 1}`,
    earnings: d.totalEarnings,
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Earnings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="earnings" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Earnings;
