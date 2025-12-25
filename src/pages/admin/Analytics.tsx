/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Users,
  Car,
  DollarSign,
  CheckCircle,
  Activity,
  RefreshCw,
  MapPin,
  Eye,
  ShieldCheck,
  LayoutDashboard,
  Download,
  Clock,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { motion } from "framer-motion";
import { useGetDashboardStatsQuery } from "@/redux/analytics/analytics.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Stat Card Component ---
const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm"
  >
    <div className="flex justify-between items-start relative z-10">
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
        className={cn(
          "p-3 rounded-2xl",
          `bg-${color}-50 dark:bg-${color}-950/30 text-${color}-600 dark:text-${color}-400`
        )}
      >
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

export default function AnalyticsDashboard() {
  const { data, isLoading, refetch } = useGetDashboardStatsQuery(undefined);
  const stats = data?.data || data;

  // --- Smart Export Function ---
  const handleExport = () => {
    if (!stats) return;

    // CSV ডেটা ফরম্যাট করা
    const reportData = [
      ["Metric", "Value"],
      ["Total Users", stats.users?.total],
      ["Total Riders", stats.users?.riders],
      ["Total Drivers", stats.users?.drivers],
      ["Total Revenue", `$${stats.revenue?.total}`],
      ["Total Rides", stats.rides?.total],
      ["Completion Rate", `${stats.rides?.completionRate}%`],
      ["Report Generated At", new Date().toLocaleString()],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      reportData.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `RideX_Report_${new Date().toLocaleDateString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <RefreshCw className="animate-spin text-indigo-600" size={40} />
        <p className="font-bold text-slate-500 animate-pulse">
          Synchronizing Command Center...
        </p>
      </div>
    );

  const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 bg-[#fafafa] dark:bg-slate-950 min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2 text-slate-900 dark:text-white uppercase italic">
            <LayoutDashboard className="text-indigo-600" /> System{" "}
            <span className="text-indigo-600">Intelligence</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold">
            Real-time oversight of RideX ecosystem.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="rounded-xl gap-2 font-bold border-slate-200 dark:border-slate-800"
          >
            <RefreshCw size={16} /> Sync
          </Button>
          <Button
            onClick={handleExport}
            className="rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none font-bold gap-2"
          >
            <Download size={16} /> Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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
          value={`৳${stats.revenue?.total || 0}`}
          icon={DollarSign}
          color="amber"
          trend="15"
        />
        <StatCard
          title="Success Rate"
          value={`${stats.rides?.completionRate}%`}
          icon={CheckCircle}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Improved Live Ride Logs - Smartly Styled */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 italic uppercase">
              <Activity size={20} className="text-indigo-500" /> Operational{" "}
              <span className="text-indigo-600">Logs</span>
            </h2>
            <Badge
              variant="secondary"
              className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 font-black"
            >
              LIVE
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                  <th className="pb-4 font-black">Identity</th>
                  <th className="pb-4 font-black">Status</th>
                  <th className="pb-4 font-black">Route</th>
                  <th className="pb-4 font-black text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {stats.recentRides?.length > 0 ? (
                  stats.recentRides.map((ride: any) => (
                    <tr
                      key={ride._id}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-indigo-600">
                            {ride.rider?.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {ride.rider?.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium">
                              DRV: {ride.driver?.name || "Searching..."}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div
                          className={cn(
                            "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter",
                            ride.status === "completed"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-amber-500/10 text-amber-600"
                          )}
                        >
                          {ride.status}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium max-w-[120px] truncate italic">
                          <MapPin size={12} className="text-indigo-500" />{" "}
                          {ride.destination}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600"
                        >
                          <Eye size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-center text-slate-400 italic font-medium"
                    >
                      No activity in the last 24 hours.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Distribution - Improved Pie */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <h2 className="text-xl font-bold uppercase italic">
            Fleet <span className="text-indigo-600">Mix</span>
          </h2>
          <div className="h-[220px] relative mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Riders", value: stats.users?.riders },
                    { name: "Drivers", value: stats.users?.drivers },
                    { name: "Admins", value: stats.users?.admins },
                  ]}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={10}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} stroke="none" />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.users?.total}
              </p>
              <p className="text-[10px] uppercase font-black text-slate-400">
                Total Fleet
              </p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            <div className="flex justify-between items-center p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
              <span className="text-xs font-black text-indigo-600 uppercase">
                Riders
              </span>
              <span className="font-black">{stats.users?.riders}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
              <span className="text-xs font-black text-emerald-600 uppercase">
                Drivers
              </span>
              <span className="font-black">{stats.users?.drivers}</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="text-emerald-400" size={20} /> Integrity
                Status
              </h2>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                SECURE
              </Badge>
            </div>
            <div className="flex gap-12 mt-8">
              <div>
                <p className="text-4xl font-black text-indigo-400">
                  {stats.recentActivity?.newUsers}
                </p>
                <p className="text-[10px] font-black text-slate-500 uppercase mt-1">
                  New Signups
                </p>
              </div>
              <div className="w-[1px] h-12 bg-slate-800" />
              <div>
                <p className="text-4xl font-black text-indigo-400">
                  {stats.recentActivity?.newRides}
                </p>
                <p className="text-[10px] font-black text-slate-500 uppercase mt-1">
                  Trips Created
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                <span>Safety Verification</span>
                <span>92%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  className="h-full bg-indigo-500"
                />
              </div>
            </div>
          </div>
          <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
        </div>

        <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold uppercase italic">
              Quick <span className="text-indigo-200">Insights</span>
            </h2>
            <p className="text-indigo-100/70 text-sm mt-1">
              Weekly system summary and alerts.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <Clock className="text-indigo-200 mb-2" size={20} />
              <p className="text-2xl font-black">2.4m</p>
              <p className="text-[10px] font-bold uppercase opacity-60">
                Avg. Wait Time
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <ShieldAlert className="text-rose-300 mb-2" size={20} />
              <p className="text-2xl font-black">0</p>
              <p className="text-[10px] font-bold uppercase opacity-60">
                Security Alerts
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
