// src/pages/driver/RideRequests.tsx
import {
  useAcceptRideMutation,
  useGetDriverRidesQuery,
  useRejectRideMutation,
} from "@/redux/features/driver/driver.api";
import type { IRide } from "@/types/ride.interface";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  User,
  Navigation,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Phone,
  Car,
  DollarSign,
  Calendar
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// API response er type define koro
interface RidesResponse {
  data: IRide[];
  message?: string;
  success?: boolean;
}

const UpdateRides = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetDriverRidesQuery(undefined);
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();
  const [filteredRides, setFilteredRides] = useState<IRide[]>([]);

  // Type assertion korbo
  const ridesResponse = data as unknown as RidesResponse;
  const rides = ridesResponse?.data || [];

  // Auto-refresh every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 20000);

    return () => clearInterval(interval);
  }, [refetch]);

  // Filter only requested rides
  useEffect(() => {
    const requestedRides = rides.filter(ride => ride.status === "requested");
    setFilteredRides(requestedRides);
  }, [rides]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ride Requests</h1>
          <button 
            onClick={() => refetch()}
            className="ml-auto bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center"
          >
            <Clock className="h-4 w-4 mr-1" />
            Refresh
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white mb-8">
          <h2 className="text-xl font-semibold mb-2">New Ride Requests</h2>
          <p className="text-3xl font-bold">{filteredRides.length} pending</p>
          <p className="text-blue-100 mt-2">Accept rides to earn money</p>
        </div>

        {filteredRides.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Ride Requests</h3>
            <p className="text-gray-600 mb-4">You don't have any ride requests at the moment.</p>
            <button 
              onClick={() => refetch()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Check Again
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredRides.map((ride: IRide) => (
              <div key={ride._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Ride Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600">
                        {new Date(ride.requestedAt).toLocaleString()}
                      </span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Pending
                    </span>
                  </div>
                </div>

                {/* Ride Details */}
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                    {/* Pickup Location */}
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Pickup</p>
                        <p className="font-medium text-gray-900">{ride.pickupLocation}</p>
                      </div>
                    </div>

                    {/* Dropoff Location */}
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <Navigation className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Dropoff</p>
                        <p className="font-medium text-gray-900">{ride.dropoffLocation}</p>
                      </div>
                    </div>

                    {/* Fare */}
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <DollarSign className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Fare</p>
                        <p className="font-bold text-lg text-green-600">৳{ride.fare}</p>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-5">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2 text-blue-600" />
                      Passenger Information
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Name: {ride.passengerId?.name || 'Passenger'}</p>
                        <p className="text-sm text-gray-600">Ride ID: {ride._id?.slice(-8)}</p>
                      </div>
                      <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Passenger
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={async () => {
                        try {
                          await acceptRide(ride._id).unwrap();
                          toast.success("Ride Accepted Successfully!");
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } catch (err: any) {
                          toast.error(err?.data?.message || "Unable to accept ride");
                        }
                      }}
                      className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Accept Ride
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await rejectRide(ride._id).unwrap();
                          toast.error("Ride Rejected");
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } catch (err: any) {
                          toast.error(err?.data?.message || "Unable to reject ride");
                        }
                      }}
                      className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Reject Ride
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Ride requests automatically refresh every 20 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateRides;