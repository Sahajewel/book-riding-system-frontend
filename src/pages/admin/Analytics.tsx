/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/AnalyticsDashboard.tsx
import { useState, useEffect } from "react";
import { 
  useGetRideStatsQuery, 
  useGetRevenueDataQuery, 
  useGetDriverActivityQuery,
  useGetPlatformAnalyticsQuery,
  useGetRideTrendsByHourQuery 
} from "@/redux/admin/admin.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart3,
  Users,
  DollarSign,
  Download,
  Car,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { PieChart } from "recharts";
import { Cell } from "recharts";
import { Pie } from "recharts";


// Define types for our analytics data
interface RideStats {
  total: number;
  completed: number;
  cancelled: number;
  active: number;
}

interface RevenueData {
  date: string;
  revenue: number;
  rideCount: number;
}

interface DriverActivity {
  driverId: string;
  driverName: string;
  totalRides: number;
  completedRides: number;
  cancellationRate: number;
  totalEarnings: number;
}

interface PlatformAnalytics {
  totalUsers: number;
  totalDrivers: number;
  totalRides: number;
  revenueLast30Days: number;
  activeDriversLast30Days: number;
}

interface HourlyTrend {
  hour: number;
  rideCount: number;
  avgFare: number;
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.name.includes('Revenue') ? '$' : ''}${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Format hour for display
const formatHour = (hour: number) => {
  return `${hour}:00`;
};


export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<string>("7");
  const [statsData, setStatsData] = useState<RideStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [driverActivity, setDriverActivity] = useState<DriverActivity[]>([]);
  const [platformData, setPlatformData] = useState<PlatformAnalytics | null>(null);
  const [hourlyTrends, setHourlyTrends] = useState<HourlyTrend[]>([]);

  // API calls for different data
  const { data: rideStatsResponse, isLoading: statsLoading, error: statsError } = 
    useGetRideStatsQuery({ days: parseInt(timeRange) });
  
  const { data: revenueResponse, isLoading: revenueLoading, error: revenueError } = 
    useGetRevenueDataQuery({ days: parseInt(timeRange) });
    console.log(revenueResponse)
  
  const { data: driverActivityResponse, isLoading: driverLoading, error: driverError } = 
    useGetDriverActivityQuery({ days: parseInt(timeRange) });
  
  const { data: platformResponse, isLoading: platformLoading, error: platformError } = 
    useGetPlatformAnalyticsQuery(undefined);
  
  const { data: hourlyTrendsResponse, isLoading: hourlyLoading, error: hourlyError } = 
    useGetRideTrendsByHourQuery({ days: parseInt(timeRange) });

  // Update local state when API data changes
  useEffect(() => {
    if (rideStatsResponse?.data) {
      setStatsData(rideStatsResponse.data);
    }
  }, [rideStatsResponse]);

  useEffect(() => {
    if (revenueResponse?.data) {
      setRevenueData(revenueResponse.data);
    }
  }, [revenueResponse]);

  useEffect(() => {
    if (driverActivityResponse?.data) {
      setDriverActivity(driverActivityResponse.data);
    }
  }, [driverActivityResponse]);

  useEffect(() => {
    if (platformResponse?.data) {
      setPlatformData(platformResponse.data);
    }
  }, [platformResponse]);

  useEffect(() => {
    if (hourlyTrendsResponse?.data) {
      setHourlyTrends(hourlyTrendsResponse.data);
    }
  }, [hourlyTrendsResponse]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Calculate metrics for display
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const completionRate = statsData ? (statsData.completed / statsData.total * 100) : 0;
  const cancellationRate = statsData ? (statsData.cancelled / statsData.total * 100) : 0;

  // Top performers
  const topDrivers = [...(driverActivity || [])]
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, 5);

  // Prepare data for pie chart
  const rideDistributionData = statsData ? [
    { name: 'Completed', value: statsData.completed },
    { name: 'Cancelled', value: statsData.cancelled },
    { name: 'Active', value: statsData.active },
  ] : [];

  // Check for any errors
  const hasError = statsError || revenueError || driverError || platformError || hourlyError;

  if (hasError) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Analytics</h2>
        <p className="text-muted-foreground mb-4">
          There was a problem loading the analytics data. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for your ride-sharing platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {platformLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{platformData?.totalUsers?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Registered riders
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {platformLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{platformData?.totalDrivers?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Approved drivers
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {platformLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{platformData?.totalRides?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground">
                  All-time rides
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">30-Day Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {platformLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">${platformData?.revenueLast30Days?.toFixed(2) || "0.00"}</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Current Period Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{statsData?.total || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {timeRange} days period
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {revenueLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {timeRange} days period
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Successful rides
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {driverLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{driverActivity?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Currently active
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Revenue over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            {revenueLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="revenue" stroke="#0088FE" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">No revenue data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ride Status Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ride Distribution</CardTitle>
            <CardDescription>Breakdown of ride statuses</CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : rideDistributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={rideDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {rideDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">No ride data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Driver Performance */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Performing Drivers</CardTitle>
            <CardDescription>Drivers with highest earnings</CardDescription>
          </CardHeader>
          <CardContent>
            {driverLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : topDrivers.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topDrivers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="driverName" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                  <Bar dataKey="totalEarnings" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">No driver data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hourly Trends */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Hourly Ride Trends</CardTitle>
            <CardDescription>Ride distribution by hour of day</CardDescription>
          </CardHeader>
          <CardContent>
            {hourlyLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : hourlyTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tickFormatter={formatHour} />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Rides']} />
                  <Bar dataKey="rideCount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">No hourly data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Driver Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Performance Details</CardTitle>
          <CardDescription>Detailed metrics for each driver</CardDescription>
        </CardHeader>
        <CardContent>
          {driverLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : driverActivity && driverActivity.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 p-4 font-medium bg-muted/50">
                <div>Driver</div>
                <div>Total Rides</div>
                <div>Completed</div>
                <div>Cancellation Rate</div>
                <div>Total Earnings</div>
              </div>
              <div className="divide-y">
                {driverActivity.map((driver) => (
                  <div key={driver.driverId} className="grid grid-cols-5 p-4">
                    <div className="font-medium">{driver.driverName}</div>
                    <div>{driver.totalRides}</div>
                    <div>{driver.completedRides}</div>
                    <div>{driver.cancellationRate.toFixed(1)}%</div>
                    <div className="font-medium">${driver.totalEarnings.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No driver activity data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}