import { useCancelRideMutation, useGetMyRidesQuery } from "@/redux/features/rider/rider.api";
import type { IRide } from "@/types/ride.interface";
import { toast } from "sonner";
import { SOSButton } from "../sosButton/SosButton";

 const mockContacts = [
    { name: "Boudi", phone: "819012345678", email: "boudi@example.com" },
    { name: "Mejda", phone: "818098765432", email: "mejda@example.com" },
  ];
const MyRides = () => {
   const isRideActive = true;
     <SOSButton contacts={mockContacts} activeRide={isRideActive}></SOSButton>
  const { data: rides, isLoading } = useGetMyRidesQuery();
  const [cancelRide] = useCancelRideMutation();

  const handleCancel = async (id: string) => {
    try {
      await cancelRide(id).unwrap();
      toast.success("Ride cancelled successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Cannot cancel ride");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Rides</h2>
      {!rides || rides.length === 0 ? (
        <p>No rides found</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride: IRide) => (
            <div
              key={ride._id}
              className="p-4 bg-fuchsia-600 rounded shadow flex justify-between items-center"
            >
              <div>
                <p><b>Pickup:</b> {ride.pickupLocation}</p>
                <p><b>Dropoff:</b> {ride.dropoffLocation}</p>
                <p><b>Status:</b> {ride.status}</p>
              </div>
              {ride.status === "requested" && (
                <button
                  onClick={() => handleCancel(ride._id!)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRides;
