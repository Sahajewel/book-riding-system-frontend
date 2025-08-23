// src/pages/rider/RideDetails.tsx

import { useGetSingleRideQuery } from "@/redux/features/rider/rider.api";
import { useParams } from "react-router";


const RideDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleRideQuery(id!);
console.log(data)
  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>Ride not found</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Ride Details</h2>
      <p><b>Pickup:</b> {data.pickupLocation}</p>
      <p><b>Dropoff:</b> {data.dropoffLocation}</p>
      <p><b>Status:</b> {data.status}</p>
      {data.fare && <p><b>Fare:</b> ${data.fare}</p>}
      {data.pickUpAt && <p><b>Picked Up At:</b> {new Date(data.pickUpAt).toLocaleString()}</p>}
      {data.inTransitAt && <p><b>In Transit At:</b> {new Date(data.inTransitAt).toLocaleString()}</p>}
      {data.completedAt && <p><b>Completed At:</b> {new Date(data.completedAt).toLocaleString()}</p>}
    </div>
  );
};

export default RideDetails;
