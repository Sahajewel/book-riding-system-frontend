/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/driver/EarningsDashboard.tsx
import { useState, useMemo } from "react";
import { useGetDriverRidesQuery } from "@/redux/features/driver/driver.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  format,
  subWeeks,
  subMonths,
  startOfDay,
  endOfDay,
  isWithinInterval,
} from "date-fns";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  ArrowUpRight,
  PieChart,
  Activity,
} from "lucide-react";
import { type IRide } from "@/types/ride.interface";
import { motion } from "framer-motion";

const EarningsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");
  const { data: ridesResponse, isLoading: ridesLoading } =
    useGetDriverRidesQuery(undefined);
  const rides = ridesResponse?.data || [];

  // Data Filtering Logic
  const completedRides = useMemo(() => {
    return rides.filter((ride: IRide) =>
      ["completed", "accepted", "ACCEPTED", "COMPLETED"].includes(
        ride.status as string
      )
    );
  }, [rides]);

  const totalEarnings = useMemo(() => {
    return completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
  }, [completedRides]);

  // Chart Logic (Same as your logic but with polished colors)
  const chartData = useMemo(() => {
    const now = new Date();
    const data = [];
    if (selectedPeriod === "daily") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dayRides = completedRides.filter((r) =>
          isWithinInterval(
            new Date(r.completedAt || r.createdAt || r.requestedAt),
            { start: startOfDay(date), end: endOfDay(date) }
          )
        );
        data.push({
          name: format(date, "EEE"),
          earnings: dayRides.reduce((s, r) => s + (r.fare || 0), 0),
        });
      }
    } else if (selectedPeriod === "weekly") {
      for (let i = 3; i >= 0; i--) {
        const start = subWeeks(now, i);
        const end = subWeeks(now, i - 1);
        const weekRides = completedRides.filter((r) =>
          isWithinInterval(
            new Date(r.completedAt || r.createdAt || r.requestedAt),
            { start: startOfDay(start), end: endOfDay(end) }
          )
        );
        data.push({
          name: `Week ${4 - i}`,
          earnings: weekRides.reduce((s, r) => s + (r.fare || 0), 0),
        });
      }
    } else {
      for (let i = 5; i >= 0; i--) {
        const start = subMonths(now, i);
        const end = subMonths(now, i - 1);
        const monthRides = completedRides.filter((r) =>
          isWithinInterval(
            new Date(r.completedAt || r.createdAt || r.requestedAt),
            { start: startOfDay(start), end: endOfDay(end) }
          )
        );
        data.push({
          name: format(start, "MMM"),
          earnings: monthRides.reduce((s, r) => s + (r.fare || 0), 0),
        });
      }
    }
    return data;
  }, [completedRides, selectedPeriod]);

  if (ridesLoading) return <SkeletonLoader />;
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {label}
          </p>
          <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
            Earnings: ৳{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 p-4 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
              Revenue <span className="text-indigo-600">Portal</span>
            </h1>
            <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
              <Activity size={16} className="text-indigo-500" /> Real-time
              financial analytics
            </p>
          </div>

          {/* Period Selector - Intuitive Toggle */}
          <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            {(["daily", "weekly", "monthly"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  selectedPeriod === period
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<DollarSign />}
            label="Net Earnings"
            value={`৳${totalEarnings.toLocaleString()}`}
            color="indigo"
            sub={`From ${completedRides.length} rides`}
          />
          <StatCard
            icon={<TrendingUp />}
            label="Success Rate"
            value={`${
              rides.length > 0
                ? Math.round((completedRides.length / rides.length) * 100)
                : 0
            }%`}
            color="emerald"
            sub="Completion ratio"
          />
          <StatCard
            icon={<Calendar />}
            label="Avg. Per Trip"
            value={`৳${
              completedRides.length > 0
                ? Math.round(totalEarnings / completedRides.length)
                : 0
            }`}
            color="amber"
            sub="Estimated average"
          />
          <StatCard
            icon={<MapPin />}
            label="Total Trips"
            value={rides.length}
            color="blue"
            sub="Overall attempts"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">
                Earnings <span className="text-indigo-600">Flow</span>
              </h3>
              <div className="flex items-center gap-2 text-xs font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">
                <ArrowUpRight size={14} /> LIVE
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#818CF8"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 700 }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(79, 70, 229, 0.1)" }} // হোভার করলে বারের পেছনে হালকা একটা শেড দিবে
                  />
                  <Bar
                    dataKey="earnings"
                    fill="url(#barGradient)"
                    radius={[10, 10, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Insights Card */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <PieChart size={40} className="mb-4 text-indigo-200" />
              <h3 className="text-2xl font-black italic uppercase leading-tight mb-2">
                Performance
                <br />
                Summary
              </h3>
              <p className="text-indigo-100 font-medium text-sm opacity-80">
                Your earnings are 12% higher than last week. Keep it up!
              </p>
            </div>
            <div className="mt-8 space-y-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black uppercase opacity-60">
                  Highest Earned
                </p>
                <p className="text-xl font-black tracking-tighter">
                  ৳{Math.max(...chartData.map((d) => d.earnings), 0)}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black uppercase opacity-60">
                  Active Status
                </p>
                <p className="text-xl font-black tracking-tighter">
                  PREMIUM DRIVER
                </p>
              </div>
            </div>
            {/* Background Decor */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Recent Table */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-black italic uppercase tracking-tighter">
              Recent <span className="text-indigo-600">Payouts</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Route Information</th>
                  <th className="px-8 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {completedRides.slice(0, 5).map((ride: IRide) => (
                  <tr
                    key={ride._id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {format(
                            new Date(ride.completedAt || ride.requestedAt),
                            "MMM dd, yyyy"
                          )}
                        </span>
                        <span className="text-[10px] font-black text-slate-400">
                          {format(
                            new Date(ride.completedAt || ride.requestedAt),
                            "hh:mm a"
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                          <MapPin size={14} className="text-indigo-500" />
                        </div>
                        <div className="max-w-xs">
                          <p className="text-xs font-bold truncate text-slate-600 dark:text-slate-300">
                            {typeof ride.pickupLocation === "string"
                              ? ride.pickupLocation
                              : (ride.pickupLocation as any)?.address}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-base font-black text-slate-900 dark:text-white italic tracking-tighter">
                        ৳{ride.fare}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const StatCard = ({ icon, label, value, color, sub }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm"
  >
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
        color === "indigo"
          ? "bg-indigo-50 text-indigo-600"
          : color === "emerald"
          ? "bg-emerald-50 text-emerald-600"
          : color === "amber"
          ? "bg-amber-50 text-amber-600"
          : "bg-blue-50 text-blue-600"
      }`}
    >
      {icon}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white mb-1">
      {value}
    </p>
    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
      {sub}
    </p>
  </motion.div>
);

const SkeletonLoader = () => (
  <div className="min-h-screen bg-[#F8FAFC] p-10 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-12 w-64 bg-slate-200 rounded-xl mb-10" />
      <div className="grid grid-cols-4 gap-6 mb-10">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-[2rem]" />
          ))}
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 h-[400px] bg-slate-200 rounded-[2.5rem]" />
        <div className="h-[400px] bg-slate-200 rounded-[2.5rem]" />
      </div>
    </div>
  </div>
);

export default EarningsDashboard;
