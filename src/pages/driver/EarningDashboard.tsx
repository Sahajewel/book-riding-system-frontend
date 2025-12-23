// src/pages/driver/EarningsDashboard.tsx
import { useState, useMemo } from "react";
import { useGetDriverRidesQuery } from "@/redux/features/driver/driver.api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, subWeeks, subMonths, startOfDay, endOfDay, isWithinInterval } from "date-fns";

import { DollarSign, TrendingUp, Calendar, MapPin, Clock } from "lucide-react";
import { RideStatus, type IRide } from "@/types/ride.interface";

// Define the location interface
interface ILocation {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const EarningsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  // Fetch real ride data
  const { data: ridesResponse, isLoading: ridesLoading } = useGetDriverRidesQuery(undefined);
  
  // Extract rides data (same logic as RideOversight)
  const rides = ridesResponse?.data || [];

  // Debug logging to check data
  console.log('Rides Response:', ridesResponse);
  console.log('Rides Array:', rides);
  console.log('Sample ride:', rides[0]);

  // Filter completed rides and calculate real earnings
  // Check for different status values - adjust based on your enum
  const completedRides = useMemo(() => {
    return rides.filter((ride: IRide) => 
      ride.status === RideStatus.COMPLETED || 
      ride.status === 'completed' ||
      ride.status === 'accepted' || // Adding accepted status from your database
      ride.status === 'ACCEPTED'
    );
  }, [rides]);

  // Calculate total earnings from real data
  const totalEarnings = useMemo(() => {
    return completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
  }, [completedRides]);

  // Generate chart data based on real ride data
  const generateChartData = () => {
    const now = new Date();
    const data = [];

    if (selectedPeriod === 'daily') {
      // Last 7 days with real data
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dayName = format(date, 'EEE');
        
        // Filter rides for this specific day
        const dayRides = completedRides.filter((ride: IRide) => {
          if (!ride.completedAt && !ride.createdAt && !ride.requestedAt) return false;
          const rideDate = new Date(ride.completedAt || ride.createdAt || ride.requestedAt);
          return isWithinInterval(rideDate, {
            start: startOfDay(date),
            end: endOfDay(date)
          });
        });
        
        const dayEarnings = dayRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
        
        data.push({
          name: dayName,
          earnings: dayEarnings,
          rides: dayRides.length,
        });
      }
    } else if (selectedPeriod === 'weekly') {
      // Last 4 weeks with real data
      for (let i = 3; i >= 0; i--) {
        const weekStart = subWeeks(now, i);
        const weekEnd = subWeeks(now, i - 1);
        const weekName = `Week ${4 - i}`;
        
        // Filter rides for this week
        const weekRides = completedRides.filter((ride: IRide) => {
          if (!ride.completedAt && !ride.createdAt && !ride.requestedAt) return false;
          const rideDate = new Date(ride.completedAt || ride.createdAt || ride.requestedAt);
          return isWithinInterval(rideDate, {
            start: startOfDay(weekStart),
            end: endOfDay(weekEnd)
          });
        });
        
        const weekEarnings = weekRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
        
        data.push({
          name: weekName,
          earnings: weekEarnings,
          rides: weekRides.length,
        });
      }
    } else {
      // Last 6 months with real data
      for (let i = 5; i >= 0; i--) {
        const monthStart = subMonths(now, i);
        const monthEnd = subMonths(now, i - 1);
        const monthName = format(monthStart, 'MMM');
        
        // Filter rides for this month
        const monthRides = completedRides.filter((ride: IRide) => {
          if (!ride.completedAt && !ride.createdAt && !ride.requestedAt) return false;
          const rideDate = new Date(ride.completedAt || ride.createdAt || ride.requestedAt);
          return isWithinInterval(rideDate, {
            start: startOfDay(monthStart),
            end: endOfDay(monthEnd)
          });
        });
        
        const monthEarnings = monthRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
        
        data.push({
          name: monthName,
          earnings: monthEarnings,
          rides: monthRides.length,
        });
      }
    }
    return data;
  };

  const chartData = generateChartData();

  // Ride status distribution with real data
  const rideStatusData = [
    { 
      name: 'Completed', 
      value: rides.filter((r: IRide) => 
        r.status === RideStatus.COMPLETED || 
        r.status === 'completed' ||
        r.status === 'accepted' || 
        r.status === 'ACCEPTED'
      ).length, 
      color: '#10B981' 
    },
    { 
      name: 'Cancelled', 
      value: rides.filter((r: IRide) => 
        r.status === RideStatus.CANCELLED || 
        r.status === 'cancelled' ||
        r.status === 'CANCELLED'
      ).length, 
      color: '#EF4444' 
    },
    { 
      name: 'Rejected', 
      value: rides.filter((r: IRide) => 
        r.status === RideStatus.REJECTED || 
        r.status === 'rejected' ||
        r.status === 'REJECTED'
      ).length, 
      color: '#F59E0B' 
    },
    { 
      name: 'Pending', 
      value: rides.filter((r: IRide) => 
        r.status === RideStatus.PENDING || 
        r.status === 'pending' ||
        r.status === 'PENDING'
      ).length, 
      color: '#6B7280' 
    },
    { 
      name: 'Active', 
      value: rides.filter((r: IRide) => 
        r.status === RideStatus.ACTIVE || 
        r.status === 'active' ||
        r.status === 'ACTIVE'
      ).length, 
      color: '#3B82F6' 
    },
  ].filter(item => item.value > 0);

  if (ridesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Earnings Dashboard</h1>
          
          {/* Period Selector */}
          <div className="flex bg-white rounded-lg shadow-sm border">
            {(['daily', 'weekly', 'monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${period === 'daily' ? 'rounded-l-lg' : period === 'monthly' ? 'rounded-r-lg' : ''}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards with Real Data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">৳{totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>From {completedRides.length} completed rides</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rides</p>
                <p className="text-2xl font-bold text-gray-900">{rides.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>{completedRides.length} completed successfully</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Fare</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{completedRides.length > 0 ? Math.round(totalEarnings / completedRides.length) : 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>Per completed trip</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rides.length > 0 ? Math.round((completedRides.length / rides.length) * 100) : 0}%
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>Rides completed vs total</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Earnings Chart with Real Data */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Earnings Trend ({selectedPeriod})
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`৳${value}`, 'Earnings']} 
                />
                <Bar dataKey="earnings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ride Status Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Status Distribution</h3>
            {rideStatusData.length > 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="flex items-center justify-center space-x-6 mb-4">
                  {rideStatusData.map((item) => (
                    <div key={item.name} className="flex flex-col items-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.value}
                      </div>
                      <span className="text-sm text-gray-600 mt-2">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-6 mt-4 flex-wrap">
                  {rideStatusData.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <p>No ride data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Earnings Table with Real Data */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Completed Rides</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fare
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completedRides.slice(0, 10).map((ride: IRide) => {
                  // Handle location data properly (same as RideOversight)
                  const pickupAddress = typeof ride.pickupLocation === 'string' 
                    ? ride.pickupLocation 
                    : (ride.pickupLocation as ILocation)?.address || 'N/A';
                    
                  const dropoffAddress = typeof ride.dropoffLocation === 'string'
                    ? ride.dropoffLocation
                    : (ride.dropoffLocation as ILocation)?.address || 'N/A';
                  
                  return (
                    <tr key={ride._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ride.completedAt ? 
                          format(new Date(ride.completedAt), 'PP') : 
                          ride.createdAt ? 
                            format(new Date(ride.createdAt), 'PP') : 
                            ride.requestedAt ?
                              format(new Date(ride.requestedAt), 'PP') :
                              'N/A'
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs">
                          <div className="truncate">{pickupAddress}</div>
                          <div className="text-xs text-gray-500 truncate">→ {dropoffAddress}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                          {ride.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ৳{ride.fare || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {completedRides.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No completed rides yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsDashboard;