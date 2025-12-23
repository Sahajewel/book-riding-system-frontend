// src/pages/driver/DriverRideHistory.tsx
import { useState, useMemo } from "react";
import { useGetDriverRidesQuery } from "@/redux/features/driver/driver.api";
import { Search, Filter, MapPin, Clock, DollarSign, Eye } from "lucide-react";
import { RideStatus } from "@/types/ride.interface";
import type { IRide } from "@/types/ride.interface";

const DriverRideHistory = () => {
  const { data: ridesData, isLoading, refetch } = useGetDriverRidesQuery(undefined);
  
  // Safely extract rides array from the response
  const rides = Array.isArray(ridesData) 
    ? ridesData 
    : Array.isArray(ridesData?.data) 
      ? ridesData.data 
      : [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RideStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRide, setSelectedRide] = useState<IRide | null>(null);
  
  const itemsPerPage = 10;

  // Helper function to check if ride is completed (includes accepted status)
  const isCompletedRide = (ride: IRide) => {
    return ride.status === RideStatus.COMPLETED || 
           ride.status === 'completed' ||
           ride.status === 'accepted' || 
           ride.status === 'ACCEPTED';
  };

  // Calculate completed rides for earnings
  const completedRides = useMemo(() => {
    return rides.filter((ride: IRide) => isCompletedRide(ride));
  }, [rides]);

  // Filter rides based on search and filters
  const filteredRides = useMemo(() => {
    // Create a copy of the rides array to avoid mutating the original
    let filtered = [...rides];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((ride: IRide) => {
        const pickupLocation = typeof ride.pickupLocation === 'string' 
          ? ride.pickupLocation 
          : ride.pickupLocation?.address || '';
        const dropoffLocation = typeof ride.dropoffLocation === 'string'
          ? ride.dropoffLocation
          : ride.dropoffLocation?.address || '';

        return (
          pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ride._id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((ride: IRide) => ride.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter((ride: IRide) => {
        const rideDate = new Date(ride.requestedAt);
        
        switch (dateFilter) {
          case "today": {
            return rideDate >= today;
          }
          case "week": {
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return rideDate >= weekAgo;
          }
          case "month": {
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return rideDate >= monthAgo;
          }
          default:
            return true;
        }
      });
    }

    // Sort by most recent first - create a new sorted array instead of sorting in place
    return [...filtered].sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  }, [rides, searchTerm, statusFilter, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: RideStatus) => {
    switch (status) {
      case RideStatus.COMPLETED:
      case 'completed':
      case 'accepted':
      case 'ACCEPTED':
        return "bg-green-100 text-green-800";
      case RideStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      case RideStatus.REJECTED:
        return "bg-gray-100 text-gray-800";
      case RideStatus.ONGOING:
        return "bg-blue-100 text-blue-800";
      case RideStatus.ACCEPTED:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
    setCurrentPage(1);
  };

  if (isLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Ride History</h1>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Rides</p>
                <p className="text-2xl font-bold text-gray-900">{rides.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedRides.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rides.filter((r: IRide) => r.status === RideStatus.CANCELLED || r.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{completedRides.reduce((sum, r) => sum + (r.fare || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by location or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RideStatus | "all")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value={RideStatus.COMPLETED}>Completed</option>
              <option value="accepted">Accepted</option>
              <option value={RideStatus.CANCELLED}>Cancelled</option>
              <option value={RideStatus.REJECTED}>Rejected</option>
              <option value={RideStatus.ONGOING}>Ongoing</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as "all" | "today" | "week" | "month")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Reset
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredRides.length} of {rides.length} rides
          </div>
        </div>

        {/* Rides Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {paginatedRides.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rides found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your filters"
                  : "You haven't completed any rides yet"}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ride Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fare
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedRides.map((ride: IRide) => {
                      // Handle location data properly
                      const pickupLocation = typeof ride.pickupLocation === 'string' 
                        ? ride.pickupLocation 
                        : ride.pickupLocation?.address || 'N/A';
                      const dropoffLocation = typeof ride.dropoffLocation === 'string'
                        ? ride.dropoffLocation
                        : ride.dropoffLocation?.address || 'N/A';

                      return (
                        <tr key={ride._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              #{ride._id?.slice(-8)}
                            </div>
                            <div className="text-sm text-gray-500">
                              Ride ID
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              <div className="flex items-center mb-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span className="truncate max-w-xs">{pickupLocation}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                <span className="truncate max-w-xs">{dropoffLocation}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(ride.requestedAt).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(ride.requestedAt).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ride.status)}`}>
                              {ride.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ride.fare ? `৳${ride.fare}` : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedRide(ride)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(currentPage * itemsPerPage, filteredRides.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredRides.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === i + 1
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Ride Details Modal */}
        {selectedRide && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Ride Details</h3>
                  <button
                    onClick={() => setSelectedRide(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ride ID</p>
                      <p className="text-gray-900">#{selectedRide._id?.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRide.status)}`}>
                        {selectedRide.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Route</p>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-1 mr-3"></div>
                        <div>
                          <p className="text-sm font-medium">Pickup</p>
                          <p className="text-gray-700">
                            {typeof selectedRide.pickupLocation === 'string' 
                              ? selectedRide.pickupLocation 
                              : selectedRide.pickupLocation?.address || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-1 mr-3"></div>
                        <div>
                          <p className="text-sm font-medium">Destination</p>
                          <p className="text-gray-700">
                            {typeof selectedRide.dropoffLocation === 'string'
                              ? selectedRide.dropoffLocation
                              : selectedRide.dropoffLocation?.address || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Requested At</p>
                      <p className="text-gray-900">{new Date(selectedRide.requestedAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Fare</p>
                      <p className="text-gray-900">{selectedRide.fare ? `৳${selectedRide.fare}` : 'Not set'}</p>
                    </div>
                  </div>

                  {selectedRide.completedAt && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed At</p>
                      <p className="text-gray-900">{new Date(selectedRide.completedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedRide(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverRideHistory;