/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/rider/RequestRide.tsx
import React, { useState, useEffect } from "react";
import { useRequestRideMutation } from "@/redux/features/rider/rider.api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

// ✅ Zod schema for frontend validation
const rideSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Dropoff location is required"),
});

// Fare estimation based on distance (mock implementation)
const calculateFare = (pickup: string, dropoff: string): number => {
  const baseFare = 50;
  const distanceRate = 15;
  const distance = Math.abs(pickup.length - dropoff.length) || 5;
  return baseFare + distance * distanceRate;
};

// Payment form component
const PaymentForm = ({
  fare,
  onSuccess,
}: {
  fare: number;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe hasn't loaded yet");
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (paymentMethodError) {
        toast.error(paymentMethodError.message || "Payment error");
        return;
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Payment processed successfully!");
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="text-lg font-semibold mb-3">Card Payment</h3>
      <p className="mb-3 font-medium">Total Fare: ${fare.toFixed(2)}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="p-3 border rounded">
          <CardElement
            options={{
              style: {
                base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-green-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : `Pay $${fare.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

// Main RequestRide component
const RequestRide = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [fare, setFare] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "cash">("card");
  const [requestRide, { isLoading }] = useRequestRideMutation();

  // Calculate fare when locations change
  useEffect(() => {
    if (pickup && dropoff) {
      setFare(calculateFare(pickup, dropoff));
    } else {
      setFare(null);
    }
  }, [pickup, dropoff]);

  const handleRideRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = rideSchema.safeParse({ pickupLocation: pickup, dropoffLocation: dropoff, fare:fare });
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    if (!fare) {
      toast.error("Could not calculate fare");
      return;
    }

    // Show payment form if card selected
    if (selectedPaymentMethod === "card") {
      setShowPayment(true);
      return;
    }

    // Cash payment, directly request ride
    try {
      await requestRide({ pickupLocation: pickup, dropoffLocation: dropoff, fare:fare }).unwrap();
      toast.success("Ride requested! Pay cash to driver.");
      setPickup(""); setDropoff(""); setFare(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to request ride");
    }
  };

  const handlePaymentSuccess = async () => {
    if (!fare) return;
    try {
      await requestRide({ pickupLocation: pickup, dropoffLocation: dropoff, fare }).unwrap();
      toast.success("Ride requested successfully! Payment done.");
      setPickup(""); setDropoff(""); setFare(null); setShowPayment(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to request ride");
    }
  };

  return (
    <div className="w-96 mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Request a Ride</h2>

      <form onSubmit={handleRideRequest} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pickup Location</label>
          <input
            type="text"
            placeholder="Enter pickup address"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={showPayment}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Dropoff Location</label>
          <input
            type="text"
            placeholder="Enter destination address"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={showPayment}
          />
        </div>

        {fare !== null && (
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="text-blue-800 font-semibold">Estimated Fare: ${fare.toFixed(2)}</p>
          </div>
        )}

        {!showPayment && (
          <div className="space-y-2">
            <label>
              <input type="radio" value="card" checked={selectedPaymentMethod === "card"} 
                onChange={() => setSelectedPaymentMethod("card")} /> Card
            </label>
            <label>
              <input type="radio" value="cash" checked={selectedPaymentMethod === "cash"} 
                onChange={() => setSelectedPaymentMethod("cash")} /> Cash
            </label>

            <button
              type="submit"
              disabled={isLoading || !pickup || !dropoff || !fare}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </div>
        )}
      </form>

      {showPayment && fare !== null && (
        <Elements stripe={stripePromise}>
          <PaymentForm fare={fare} onSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default RequestRide;
