// src/pages/driver/DriverAvailability.tsx
import { useState, useEffect } from "react";

import { toast } from "react-hot-toast";
import { Power, MapPin, Clock, DollarSign } from "lucide-react";
import { useGetDriverProfileQuery, useUpdateAvailabilityMutation } from "@/redux/features/driver/driver.api";

const DriverAvailability = () => {
  const { data: profile, isLoading: profileLoading } = useGetDriverProfileQuery();
  const [updateAvailability, { isLoading: updating }] = useUpdateAvailabilityMutation();
  
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (profile?.driverInfo?.isAvailable) {
      setIsOnline(profile.driverInfo.isAvailable);
    }
  }, [profile]);

  const handleToggleAvailability = async () => {
    try {
      const newStatus = !isOnline;
      await updateAvailability({ isAvailable: newStatus }).unwrap();
      setIsOnline(newStatus);
      toast.success(`You are now ${newStatus ? 'online' : 'offline'}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update availability");
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check if driver is blocked/suspended
  if (profile?.driverStatus === "suspended") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Power className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Suspended</h2>
          <p className="text-gray-600 mb-6">
            Your driver account has been suspended. Please contact support to resolve this issue.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>📧 Email: support@rideapp.com</p>
            <p>📞 Phone: +880-123-456-789</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Driver Availability</h1>
        
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isOnline ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Power className={`h-12 w-12 ${isOnline ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              You are {isOnline ? 'Online' : 'Offline'}
            </h2>
            
            <p className="text-gray-600 mb-8">
              {isOnline 
                ? 'You are receiving ride requests from nearby riders' 
                : 'Turn online to start receiving ride requests'
              }
            </p>
            
            <button
              onClick={handleToggleAvailability}
              disabled={updating}
              className={`px-8 py-4 rounded-lg font-semibold text-white text-lg transition-colors ${
                isOnline
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              } focus:ring-4 focus:ring-opacity-50 disabled:opacity-50`}
            >
              {updating ? 'Updating...' : (isOnline ? 'Go Offline' : 'Go Online')}
            </button>
          </div>
        </div>

        {/* Driver Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vehicle Type</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile?.driverInfo?.vehicleType || 'Not Set'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-lg font-semibold text-gray-900">
                  ৳{profile?.totalEarnings || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className={`text-lg font-semibold ${
                  profile?.driverStatus === 'approved' ? 'text-green-600' : 
                  profile?.driverStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {profile?.driverStatus ? 
                    profile.driverStatus.charAt(0).toUpperCase() + profile.driverStatus.slice(1) 
                    : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        {!isOnline && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">Ready to Start Driving?</h3>
            <ul className="space-y-2 text-yellow-700">
              <li>• Make sure your vehicle is ready and fueled</li>
              <li>• Check that you have all required documents</li>
              <li>• Ensure your phone is charged for navigation</li>
              <li>• Toggle online to start receiving ride requests</li>
            </ul>
          </div>
        )}

        {isOnline && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">You're Live!</h3>
            <p className="text-green-700">
              You'll receive notifications for nearby ride requests. Keep your app open and drive safely!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverAvailability;