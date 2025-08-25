// src/pages/rider/RideDetails.tsx
import React, { useState, useEffect } from 'react';
import { useCancelRideMutation, useGetMyRidesQuery } from "@/redux/features/rider/rider.api";
import type { IRide } from "@/types/ride.interface";
import { toast } from "sonner";
import { 
  MapPin, 
  Flag, 
  Clock, 
  XCircle, 
  Navigation, 
  User, 
  Car, 
  CreditCard,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Loader,
  Phone,
  MessageCircle
} from "lucide-react";
import EmergencySOS from '../sosButton/EmergencySosButton';


const RideDetails = () => {
  const [selectedRide, setSelectedRide] = useState<IRide | null>(null);
  const { data: rides, isLoading, refetch } = useGetMyRidesQuery();
  const [cancelRide, { isLoading: isCancelling }] = useCancelRideMutation();
  const [activeRide, setActiveRide] = useState<IRide | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Check for active rides and set the active ride state
  useEffect(() => {
    if (rides && rides.length > 0) {
      const currentActiveRide = rides.find((ride: IRide) => 
        ride.status === "requested" || ride.status === "accepted" || ride.status === "ongoing"
      );
      setActiveRide(currentActiveRide || null);
    }
  }, [rides]);

  // Get user's location if there's an active ride
  useEffect(() => {
    if (activeRide && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [activeRide]);

  const handleCancel = async (id: string) => {
    try {
      await cancelRide(id).unwrap();
      toast.success("Ride cancelled successfully!");
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Cannot cancel ride");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled": return <XCircle className="h-5 w-5 text-red-500" />;
      case "requested": return <Loader className="h-5 w-5 text-yellow-500 animate-spin" />;
      case "accepted": return <Car className="h-5 w-5 text-blue-500" />;
      case "ongoing": return <Navigation className="h-5 w-5 text-purple-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      case "requested": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted": return "bg-blue-100 text-blue-800 border-blue-200";
      case "ongoing": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-fuchsia-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your rides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride Details</h1>
            <p className="text-gray-600">Track and manage all your rides in one place</p>
          </div>
          
          {/* Emergency SOS Button - Only shows when there's an active ride */}
          <EmergencySOS isActive={!!activeRide} currentLocation={userLocation} />
        </div>

        {!rides || rides.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rides yet</h3>
            <p className="text-gray-600 mb-6">Your ride history will appear here once you start booking</p>
            <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Book Your First Ride
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {rides.map((ride: IRide) => (
              <div
                key={ride._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Ride Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Car className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Ride #{ride._id?.slice(-6)}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(ride.requestedAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      {getStatusIcon(ride.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ride.status)}`}>
                        {ride.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ride Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Route Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <Navigation className="h-5 w-5 text-fuchsia-600 mr-2" />
                        Route Details
                      </h4>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">Pickup Location</p>
                          <p className="text-gray-900 font-semibold">{ride.pickupLocation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">Destination</p>
                          <p className="text-gray-900 font-semibold">{ride.dropoffLocation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Ride Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <Clock className="h-5 w-5 text-fuchsia-600 mr-2" />
                        Ride Information
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Requested At</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(ride.requestedAt).toLocaleTimeString()}
                          </p>
                        </div>
                        
                        {ride.fare && (
                          <div>
                            <p className="text-sm text-gray-600">Fare</p>
                            <p className="text-sm font-semibold text-green-600">৳{ride.fare}</p>
                          </div>
                        )}
                        
                        {ride.driver && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-600">Driver</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-semibold text-gray-900">
                                {ride.driver.name}
                              </span>
                            </div>
                            {ride.driver.phone && (
                              <div className="flex space-x-2 mt-2">
                                <a 
                                  href={`tel:${ride.driver.phone}`}
                                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Phone size={14} className="mr-1" />
                                  Call Driver
                                </a>
                                <a 
                                  href={`sms:${ride.driver.phone}`}
                                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <MessageCircle size={14} className="mr-1" />
                                  Message
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Ride Timeline</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="text-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                        <p>Requested</p>
                        <p className="font-semibold text-xs">
                          {new Date(ride.requestedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                      
                      {ride.pickUpAt && (
                        <div className="text-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                          <p>Picked Up</p>
                          <p className="font-semibold text-xs">
                            {new Date(ride.pickUpAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      )}
                      
                      {ride.completedAt && (
                        <div className="text-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1"></div>
                          <p>Completed</p>
                          <p className="font-semibold text-xs">
                            {new Date(ride.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {ride.status === "requested" && (
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => handleCancel(ride._id!)}
                      disabled={isCancelling}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-3 px-4 rounded-lg border border-red-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <XCircle className="h-5 w-5" />
                      <span>{isCancelling ? "Cancelling..." : "Cancel Ride"}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {rides && rides.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow border border-gray-100 text-center">
              <p className="text-2xl font-bold text-fuchsia-600">{rides.length}</p>
              <p className="text-sm text-gray-600">Total Rides</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border border-gray-100 text-center">
              <p className="text-2xl font-bold text-green-600">
                {rides.filter((r: IRide) => r.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border border-gray-100 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {rides.filter((r: IRide) => r.status === 'requested' || r.status === 'accepted' || r.status === 'ongoing').length}
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border border-gray-100 text-center">
              <p className="text-2xl font-bold text-red-600">
                {rides.filter((r: IRide) => r.status === 'cancelled').length}
              </p>
              <p className="text-sm text-gray-600">Cancelled</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideDetails;