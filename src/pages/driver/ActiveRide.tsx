// src/pages/driver/ActiveRide.tsx
import { useState, useEffect } from "react";
import { useGetDriverRidesQuery, useUpdateRideStatusMutation } from "@/redux/features/driver/driver.api";
import { toast } from "react-hot-toast";
import { MapPin, Clock, User, Phone, Navigation, CheckCircle } from "lucide-react";
import { RideStatus, type UpdatableRideStatus } from "@/types/ride.interface";
import { Link } from "react-router";

const ActiveRide = () => {
  const { data: ridesResponse, isLoading, refetch } = useGetDriverRidesQuery(undefined);
  const [updateRideStatus] = useUpdateRideStatusMutation();
  
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Extract rides array from response or default to empty array
  const rides = ridesResponse?.data || []; // Adjust based on your API response structure

  // Filter for active rides (accepted, ongoing)
  const activeRide = rides.find(ride => 
    ride.status === RideStatus.ACCEPTED || 
    ride.status === RideStatus.ONGOING
  );

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleStatusUpdate = async (newStatus: UpdatableRideStatus) => {
    if (!activeRide?._id) return;

    try {
      setUpdatingStatus(true);
      await updateRideStatus({
        rideId: activeRide._id,
        status: newStatus
      }).unwrap();
      
      const statusMessages: Record<UpdatableRideStatus, string> = {
        [RideStatus.ACCEPTED]: "Ride accepted",
        [RideStatus.ONGOING]: "Ride started - passenger picked up!",
        [RideStatus.COMPLETED]: "Ride completed successfully!",
        [RideStatus.CANCELLED]: "Ride cancelled",
      };
      
      toast.success(statusMessages[newStatus] || "Status updated");
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { status: RideStatus.ACCEPTED, label: "Ride Accepted", icon: CheckCircle },
      { status: RideStatus.ONGOING, label: "In Transit", icon: Navigation },
      { status: RideStatus.COMPLETED, label: "Completed", icon: CheckCircle },
    ];

    return steps.map((step, index) => {
      const Icon = step.icon;
      const isCompleted = getStatusIndex(activeRide?.status) > index;
      const isCurrent = activeRide?.status === step.status;

      return (
        <div key={step.status} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            isCompleted ? 'bg-green-500 text-white' : 
            isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-1 mx-2 ${
              isCompleted ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      );
    });
  };

  const getStatusIndex = (status?: string) => {
    const statusOrder = [RideStatus.ACCEPTED, RideStatus.ONGOING, RideStatus.COMPLETED];
    return status ? statusOrder.indexOf(status) : -1;
  };

  const getNextActionButton = () => {
    if (!activeRide) return null;

    switch (activeRide.status) {
      case RideStatus.ACCEPTED:
        return (
          <button
            onClick={() => handleStatusUpdate(RideStatus.ONGOING as UpdatableRideStatus)}
            disabled={updatingStatus}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            {updatingStatus ? "Updating..." : "Start Trip (Passenger Picked Up)"}
          </button>
        );
      case RideStatus.ONGOING:
        return (
          <button
            onClick={() => handleStatusUpdate(RideStatus.COMPLETED as UpdatableRideStatus)}
            disabled={updatingStatus}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            {updatingStatus ? "Completing..." : "Complete Trip"}
          </button>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!activeRide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Ride</h2>
          <p className="text-gray-600 mb-6">
            You don't have any active rides at the moment. Check incoming requests for new ride opportunities.
          </p>
          <button
           
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            <Link to = "/update-ride">View Incoming Requests</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Active Ride</h1>

        {/* Current Status Progress */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trip Progress</h2>
          <div className="flex items-center justify-center">
            {getStatusSteps()}
          </div>
          <p className="text-center mt-4 text-gray-600">
            Current Status: <span className="font-semibold text-blue-600">{activeRide.status}</span>
          </p>
        </div>

        {/* Ride Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Trip Details</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <Clock className="h-4 w-4" />
                <span>Started {new Date(activeRide.requestedAt).toLocaleString()}</span>
              </div>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              activeRide.status === RideStatus.ACCEPTED ? 'bg-blue-100 text-blue-800' :
              activeRide.status === RideStatus.ONGOING ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {activeRide.status}
            </span>
          </div>

          {/* Route Information */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Pickup Location</p>
                <p className="text-gray-700">{activeRide.pickupLocation}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Destination</p>
                <p className="text-gray-700">{activeRide.dropoffLocation}</p>
              </div>
            </div>
          </div>

          {/* Passenger Contact */}
          <div className="border-t pt-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Passenger Contact</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Passenger</p>
                  <p className="text-sm text-gray-600">Ride ID: {activeRide._id?.slice(-8)}</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </button>
            </div>
          </div>

          {/* Fare Information */}
          {activeRide.fare && (
            <div className="border-t pt-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">Trip Fare</span>
                <span className="text-2xl font-bold text-green-600">৳{activeRide.fare}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {getNextActionButton()}
          
          {/* Emergency Cancel Button */}
          {activeRide.status !== RideStatus.COMPLETED && (
            <button
              onClick={() => handleStatusUpdate(RideStatus.CANCELLED as UpdatableRideStatus)}
              disabled={updatingStatus}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {updatingStatus ? "Cancelling..." : "Cancel Trip (Emergency)"}
            </button>
          )}
        </div>

        {/* Trip Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Ride Requested:</span>
              <span className="font-medium">{new Date(activeRide.requestedAt).toLocaleString()}</span>
            </div>
            {activeRide.pickUpAt && (
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Passenger Picked Up:</span>
                <span className="font-medium">{new Date(activeRide.pickUpAt).toLocaleString()}</span>
              </div>
            )}
            {activeRide.inTransitAt && (
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Trip Started:</span>
                <span className="font-medium">{new Date(activeRide.inTransitAt).toLocaleString()}</span>
              </div>
            )}
            {activeRide.completedAt && (
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Trip Completed:</span>
                <span className="font-medium">{new Date(activeRide.completedAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRide;

// // src/pages/driver/ActiveRide.tsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { 
//   useGetDriverRidesQuery, 
//   useUpdateRideStatusMutation 
// } from "@/redux/features/driver/driver.api";
// import { toast } from "react-hot-toast";
// import { MapPin, Clock, User, Phone, Navigation, CheckCircle } from "lucide-react";
// import { RideStatus, type UpdatableRideStatus } from "@/types/ride.interface";

// const ActiveRide = () => {
//   const navigate = useNavigate();
//   const { data: rides, isLoading, refetch } = useGetDriverRidesQuery();
//   const [updateRideStatus] = useUpdateRideStatusMutation();
  
//   const [updatingStatus, setUpdatingStatus] = useState(false);

//   // Filter for active rides (accepted, ongoing)
//   const activeRide = rides?.find(ride => 
//     ride.status === RideStatus.ACCEPTED || 
//     ride.status === RideStatus.ONGOING
//   );

//   // ... rest of the component
// };

// export default ActiveRide;