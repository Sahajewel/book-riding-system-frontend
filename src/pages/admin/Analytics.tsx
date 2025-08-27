// src/pages/admin/AnalyticsDashboard.tsx
import React from "react";
import { 
  Users, Car, DollarSign, TrendingUp, UserCheck, UserX, Clock, 
  CheckCircle, Activity, BarChart3, AlertCircle, XCircle, PlayCircle
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { useGetDashboardStatsQuery } from "@/redux/analytics/analytics.api";

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, change, changeType = "positive", color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 flex items-center ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
              <TrendingUp className={`h-4 w-4 mr-1 ${changeType === "negative" ? "rotate-180" : ""}`} />
              {change} from last week
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading dashboard data...</p>
    </div>
  </div>
);

// Error Message
const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center p-8 max-w-md">
      <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Unable to load dashboard</h2>
      <p className="text-gray-600 mb-4">{message || "Something went wrong while loading the dashboard data."}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AnalyticsDashboard() {
  const { data, isLoading, error, refetch } = useGetDashboardStatsQuery(undefined);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error?.data?.message || error.message} onRetry={refetch} />;
  if (!data) return <ErrorMessage message="Dashboard data not available" onRetry={refetch} />;

  // Check if the data has the expected structure
  const stats = data.data || data;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold ">Dashboard Analytics</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.users?.total || 0} icon={Users} color="blue" />
        <StatCard title="Total Rides" value={stats.rides?.total || 0} icon={Car} color="green" />
        {/* <StatCard title="Total Revenue" value={`$${stats.revenue?.total || 0}`} icon={DollarSign} color="yellow" /> */}
        <StatCard title="Completion Rate" value={`${stats.rides?.completionRate || 0}%`} icon={CheckCircle} color="purple" />
      </div>

      {/* User and Driver Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" /> User Statistics
          </h2>
          <div className="grid grid-cols-2  gap-4">
            <div className="p-3 rounded-lg">
              <p className="text-sm ">Riders</p>
              <p className="text-2xl font-bold">{stats.users?.riders || 0}</p>
            </div>
            <div className="p-3  rounded-lg">
              <p className="text-sm ">Drivers</p>
              <p className="text-2xl font-bold">{stats.users?.drivers || 0}</p>
            </div>
            <div className="p-3  rounded-lg">
              <p className="text-sm ">Admins</p>
              <p className="text-2xl font-bold">{stats.users?.admins || 0}</p>
            </div>
            <div className="p-3  rounded-lg">
              <p className="text-sm ">Blocked Users</p>
              <p className="text-2xl font-bold">{stats.users?.blocked || 0}</p>
            </div>
          </div>
        </div>

      
      </div>

      {/* Ride Statistics */}
      <div className=" p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="mr-2 h-5 w-5" /> Ride Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-3  rounded-lg">
            <p className="text-sm ">Total</p>
            <p className="text-2xl font-bold">{stats.rides?.total || 0}</p>
          </div>
          <div className="p-3  rounded-lg">
            <p className="text-sm ">Completed</p>
            <p className="text-2xl font-bold">{stats.rides?.completed || 0}</p>
          </div>
          <div className="p-3  rounded-lg">
            <p className="text-sm ">Ongoing</p>
            <p className="text-2xl font-bold">{stats.rides?.ongoing || 0}</p>
          </div>
          <div className="p-3  rounded-lg">
            <p className="text-sm ">Pending</p>
            <p className="text-2xl font-bold">{stats.rides?.pending || 0}</p>
          </div>
          <div className="p-3  rounded-lg">
            <p className="text-sm ">Cancelled</p>
            <p className="text-2xl font-bold">{stats.rides?.cancelled || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className=" p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="mr-2 h-5 w-5" /> Recent Activity (Last 7 Days)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4  rounded-lg">
            <p className="text-sm ">New Users</p>
            <p className="text-2xl font-bold">{stats.recentActivity?.newUsers || 0}</p>
          </div>
          <div className="p-4  rounded-lg">
            <p className="text-sm ">New Rides</p>
            <p className="text-2xl font-bold">{stats.recentActivity?.newRides || 0}</p>
          </div>
        </div>
      </div>

      {/* Trends Charts */}
      {stats.trends && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stats.trends.monthlyRides && stats.trends.monthlyRides.length > 0 && (
            <div className=" p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Monthly Rides Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.trends.monthlyRides}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rides" stroke="#8884d8" name="Total Rides" />
                  <Line type="monotone" dataKey="completed" stroke="#82ca9d" name="Completed Rides" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {stats.trends.monthlyRevenue && stats.trends.monthlyRevenue.length > 0 && (
            <div className=" p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.trends.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id.month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* User Distribution Pie Chart */}
      <div className=" p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: "Riders", value: stats.users?.riders || 0 },
                { name: "Drivers", value: stats.users?.drivers || 0 },
                { name: "Admins", value: stats.users?.admins || 0 },
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {[
                stats.users?.riders || 0,
                stats.users?.drivers || 0,
                stats.users?.admins || 0,
              ].map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}