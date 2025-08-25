


// src/pages/rider/MyRides.tsx
import React, { useState } from 'react';
import { useGetMyRidesQuery } from '@/redux/features/rider/rider.api';
import { RideStatus } from '@/types/ride.interface';
import { format } from 'date-fns';

const MyRides: React.FC = () => {
  const { data: rides, isLoading, error } = useGetMyRidesQuery();
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    minFare: '',
    maxFare: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRides = rides?.filter(ride => {
    if (filters.status && ride.status !== filters.status) return false;
    if (filters.date) {
      const rideDate = format(new Date(ride.requestedAt), 'yyyy-MM-dd');
      if (rideDate !== filters.date) return false;
    }
    if (filters.minFare && (ride.fare || 0) < Number(filters.minFare)) return false;
    if (filters.maxFare && (ride.fare || 0) > Number(filters.maxFare)) return false;
    return true;
  }) || [];

  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <div>Loading rides...</div>;
  if (error) return <div>Error loading rides</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Ride History</h2>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          {Object.values(RideStatus).map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Min Fare"
          value={filters.minFare}
          onChange={(e) => setFilters({ ...filters, minFare: e.target.value })}
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Max Fare"
          value={filters.maxFare}
          onChange={(e) => setFilters({ ...filters, maxFare: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      {/* Rides Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fare
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedRides.map((ride) => (
              <tr key={ride._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(ride.requestedAt), 'PPp')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ride.pickupLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ride.dropoffLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">৳{ride.fare || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ride.status === RideStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                    ride.status === RideStatus.CANCELLED ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ride.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? 'bg-blue-600 text-white' : ''
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRides;