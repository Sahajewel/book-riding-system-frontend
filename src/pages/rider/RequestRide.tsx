// src/pages/rider/RequestRide.tsx
import React, { useState } from "react";
import { useRequestRideMutation } from "@/redux/features/rider/rider.api";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Zod schema for frontend validation
const rideSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Dropoff location is required"),
});

const RequestRide = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [requestRide, { isLoading }] = useRequestRideMutation();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log({ pickup, dropoff }); // ✅ ekhane dekho ki pathaccho

  // Zod validation
  const result = rideSchema.safeParse({ pickupLocation: pickup, dropoffLocation: dropoff });
  if (!result.success) {
    result.error.issues.forEach(issue => toast.error(issue.message));
    return;
  }

  try {
    await requestRide({ pickupLocation: pickup, dropoffLocation: dropoff }).unwrap();
    toast.success("Ride requested successfully!");
    setPickup("");
    setDropoff("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const message = err?.data?.message || "Failed to request ride";
    toast.error(message);
  }
};


  return (
    <div className="max-w-md mx-auto p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Request a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Dropoff Location"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? "Requesting..." : "Request Ride"}
        </button>
      </form>
    </div>
  );
};

export default RequestRide;
