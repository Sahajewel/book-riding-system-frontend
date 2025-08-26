// src/pages/driver/RideRequests.tsx
import {
  useAcceptRideMutation,
  useGetDriverRidesQuery,
  useRejectRideMutation,
} from "@/redux/features/driver/driver.api";
import type { IRide } from "@/types/ride.interface";
import { toast } from "sonner";

interface RidesResponse {
  data: IRide[];
  message?: string;
  success?: boolean;
}

const RideRequests = () => {
  const { data, isLoading } = useGetDriverRidesQuery(undefined);
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();

  const ridesResponse = data as unknown as RidesResponse;
  const rides = ridesResponse?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 animate-pulse">Loading ride requests...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 ">
        🚖 Incoming Ride Requests
      </h2>

      {rides.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow">
          <p className="text-gray-500">No new ride requests right now.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {rides.map((ride: IRide) => (
            <div
              key={ride._id}
              className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100"
            >
              {/* Top Section */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Ride Request
                  </h3>
                  <p className="text-sm text-gray-500">
                    Requested by <span className="font-medium">{ride.rider?.name}</span>
                  </p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  {ride.status}
                </span>
              </div>

              {/* Locations */}
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">📍 Pickup:</span>{" "}
                  {ride.pickupLocation}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">🏁 Dropoff:</span>{" "}
                  {ride.dropoffLocation}
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={async () => {
                    try {
                      await acceptRide(ride._id).unwrap();
                      toast.success("Ride Accepted");
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (err: any) {
                      toast.error(err?.data?.message || "Unable to accept ride");
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
                >
                  ✅ Accept
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
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideRequests;
