/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Users,
  Car,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Activity,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  LayoutDashboard,
  RefreshCw,
  MoreHorizontal,
  MapPin,
  Eye,
  ShieldAlert,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { useGetDashboardStatsQuery } from "@/redux/analytics/analytics.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Custom Modern Stat Card ---
const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm"
  >
    <div
      className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 rounded-full bg-${color}-500`}
    />
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
          {value}
        </h3>
        {trend && (
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-500">
            <ArrowUpRight size={14} />
            <span>{trend}% increase</span>
          </div>
        )}
      </div>
      <div
        className={`p-3 rounded-2xl bg-${color}-50 dark:bg-${color}-950/30 text-${color}-600 dark:text-${color}-400`}
      >
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

export default function AnalyticsDashboard() {
  const { data, isLoading, refetch } = useGetDashboardStatsQuery(undefined);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <RefreshCw className="animate-spin text-indigo-600" size={40} />
        <p className="font-bold text-slate-500 animate-pulse">
          Analyzing System Data...
        </p>
      </div>
    );

  const stats = data?.data || data;
  const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 bg-[#fafafa] dark:bg-slate-950 min-h-screen"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            <LayoutDashboard className="text-indigo-600" /> Admin Command Center
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Monitoring RideX system performance & safety.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="rounded-xl gap-2 hover:bg-indigo-50 dark:hover:bg-slate-800 border-slate-200"
          >
            <RefreshCw size={16} /> Sync
          </Button>
          <Button className="rounded-xl text-white bg-[#020618] hover:bg-indigo-900 shadow-lg shadow-indigo-200 dark:shadow-none">
            Export Reports
          </Button>
        </div>
      </div>

      {/* 1. Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users?.total}
          icon={Users}
          color="indigo"
          trend="12"
        />
        <StatCard
          title="Total Rides"
          value={stats.rides?.total}
          icon={Car}
          color="emerald"
          trend="8"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue?.total || 0}`}
          icon={DollarSign}
          color="amber"
          trend="15"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.rides?.completionRate}%`}
          icon={CheckCircle}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Recent Ride Activity (Replacement for Area Chart) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity size={20} className="text-indigo-500" /> Live Ride Logs
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-indigo-600 font-bold"
            >
              View All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-50 dark:border-slate-800">
                  <th className="pb-4 font-bold">Rider / Driver</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold">Destination</th>
                  <th className="pb-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {/* যদি ডেটা থাকে তবে ম্যাপ হবে, না থাকলে 'No recent rides' দেখাবে */}
                {stats.recentRides && stats.recentRides.length > 0 ? (
                  stats.recentRides.map((ride: any) => (
                    <tr key={ride._id} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {/* রাইডারের নামের প্রথম অক্ষর আইকন হিসেবে */}
                          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
                            {ride.rider?.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-bold">
                              {ride.rider?.name || "Unknown Rider"}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Driver: {ride.driver?.name || "Not Assigned"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "capitalize",
                            ride.status === "completed" &&
                              "bg-emerald-50 text-emerald-600 border-emerald-100",
                            ride.status === "ongoing" &&
                              "bg-blue-50 text-blue-600 border-blue-100",
                            ride.status === "cancelled" &&
                              "bg-rose-50 text-rose-600 border-rose-100",
                            ride.status === "pending" &&
                              "bg-amber-50 text-amber-600 border-amber-100"
                          )}
                        >
                          {ride.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1 text-slate-500 text-xs max-w-[150px] truncate">
                          <MapPin size={12} className="shrink-0" />{" "}
                          {ride.destination || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                          <Eye size={16} className="text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  // ডেটা না থাকলে এই মেসেজ দেখাবে
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-center text-slate-400 text-sm italic"
                    >
                      No recent ride activity found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Community Distribution */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-8">User Split</h2>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Riders", value: stats.users?.riders },
                    { name: "Drivers", value: stats.users?.drivers },
                    { name: "Admins", value: stats.users?.admins },
                  ]}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} cornerRadius={10} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-2xl font-black">{stats.users?.total}</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Total
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
              <p className="text-xs font-bold text-slate-400">Riders</p>
              <p className="text-lg font-black text-indigo-600">
                {stats.users?.riders}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
              <p className="text-xs font-bold text-slate-400">Drivers</p>
              <p className="text-lg font-black text-emerald-600">
                {stats.users?.drivers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Operations & Security Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ride Status Cards */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Car size={20} className="text-slate-400" /> Ride Operations
            </h2>
            <MoreHorizontal className="text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Ongoing",
                val: stats.rides?.ongoing,
                color: "blue",
                icon: RefreshCw,
              },
              {
                label: "Pending",
                val: stats.rides?.pending,
                color: "amber",
                icon: Clock,
              },
              {
                label: "Completed",
                val: stats.rides?.completed,
                color: "emerald",
                icon: CheckCircle,
              },
              {
                label: "Cancelled",
                val: stats.rides?.cancelled,
                color: "rose",
                icon: ShieldAlert,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-5 rounded-[1.5rem] bg-${item.color}-50/50 dark:bg-${item.color}-900/10 border border-${item.color}-100 dark:border-${item.color}-900/30 flex items-center justify-between`}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">
                    {item.label}
                  </p>
                  <p className="text-3xl font-black tracking-tight">
                    {item.val}
                  </p>
                </div>
                <item.icon size={24} className={`text-${item.color}-600/50`} />
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Weekly Pulse */}
        <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="text-emerald-400" size={20} />{" "}
                  Security & Health
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  System is fully operational.
                </p>
              </div>
              <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold border border-emerald-500/30">
                ACTIVE
              </div>
            </div>

            <div className="flex gap-10 mt-8">
              <div>
                <p className="text-4xl font-black text-indigo-400">
                  {stats.recentActivity?.newUsers}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  New Signups
                </p>
              </div>
              <div className="w-[1px] h-12 bg-slate-800" />
              <div>
                <p className="text-4xl font-black text-indigo-400">
                  {stats.recentActivity?.newRides}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Trips Created
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                />
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                92% of driver verifications completed this week.
              </p>
            </div>
          </div>
          <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 group-hover:text-emerald-500/5 transition-colors duration-700" />
        </div>
      </div>
    </motion.div>
  );
}
