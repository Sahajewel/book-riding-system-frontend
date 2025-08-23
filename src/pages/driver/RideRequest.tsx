/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/driver/RideRequests.tsx

import {
  useAcceptRideMutation,
  useGetDriverRidesQuery,
  useRejectRideMutation,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";
// import { toast } from "react-hot-toast";

const RideRequests = () => {
  const { data, isLoading } = useGetDriverRidesQuery(null);
  console.log(data);
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Incoming Ride Requests</h2>
      <div className="space-y-4">
        {data?.data?.map((ride: any) => (
          <div key={ride._id} className="p-4 bg-white rounded shadow">
            <p>
              <b>Pickup:</b> {ride.pickupLocation}
            </p>
            <p>
              <b>Dropoff:</b> {ride.dropoffLocation}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={async () => {
                  try {
                    await acceptRide(ride._id).unwrap();
                    toast.success("Ride Accepted");
                  } catch (err: any) {
                    toast.error(err?.data?.message || "Unable to accept ride");
                  }
                }}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Accept
              </button>
              <button
                onClick={async () => {
                  try {
                    await rejectRide(ride._id).unwrap();
                    toast.error("Ride Rejected");
                  } catch (err: any) {
                    toast.error(err?.data?.message || "Unable to reject ride");
                  }
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RideRequests;
