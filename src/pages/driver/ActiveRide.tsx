// src/pages/driver/ActiveRide.tsx

import { useUpdateRideStatusMutation } from "@/redux/features/driver/driver.api";
import { toast } from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActiveRide = ({ ride }: { ride: any }) => {
  const [updateRideStatus] = useUpdateRideStatusMutation();

  const handleStatusChange = (status: string) => {
    updateRideStatus({ rideId: ride._id, status })
      .unwrap()
      .then(() => toast.success(`Ride status updated to ${status}`));
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3 className="font-bold">Active Ride</h3>
      <p>Pickup: {ride.pickupLocation}</p>
      <p>Dropoff: {ride.dropoffLocation}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => handleStatusChange("PICKEDUP")} className="btn">Picked Up</button>
        <button onClick={() => handleStatusChange("ONGOING")} className="btn">In Transit</button>
        <button onClick={() => handleStatusChange("COMPLETED")} className="btn bg-green-500 text-white">Completed</button>
      </div>
    </div>
  );
};
export default ActiveRide;
