// src/pages/driver/Availability.tsx
import { useUpdateAvailabilityMutation } from "@/redux/features/driver/driver.api";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Availability = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [updateAvailability] = useUpdateAvailabilityMutation();

  const handleToggle = async () => {
    try {
      await updateAvailability({ isAvailable: !isAvailable }).unwrap();
      setIsAvailable(!isAvailable);
      toast.success(`You are now ${!isAvailable ? "Online" : "Offline"}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Availability</h2>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded ${
          isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {isAvailable ? "Go Offline" : "Go Online"}
      </button>
    </div>
  );
};

export default Availability;
