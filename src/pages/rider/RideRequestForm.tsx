// src/pages/rider/RequestRide.tsx
import React, { useState } from 'react';
import { useRequestRideMutation } from '@/redux/features/rider/rider.api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface RideRequestForm {
  pickupLocation: string;
  dropoffLocation: string;
}

const RequestRide: React.FC = () => {
  const [fareEstimate, setFareEstimate] = useState<number | null>(null);
  const [requestRide, { isLoading }] = useRequestRideMutation();
  const { register, handleSubmit, watch } = useForm<RideRequestForm>();

  const pickupLocation = watch('pickupLocation');
  const dropoffLocation = watch('dropoffLocation');

  // Calculate fare estimate based on distance (simplified)
  React.useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      const estimatedFare = Math.floor(Math.random() * 200) + 50; // Random fare between 50-250
      setFareEstimate(estimatedFare);
    }
  }, [pickupLocation, dropoffLocation]);

  const onSubmit = async (data: RideRequestForm) => {
    try {
      const result = await requestRide(data).unwrap();
      toast.success('Ride requested successfully!');
      console.log('Ride created:', result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to request ride');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Book a Ride</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            {...register('pickupLocation', { required: 'Pickup location is required' })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter pickup address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <input
            {...register('dropoffLocation', { required: 'Destination is required' })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter destination address"
          />
        </div>

        {fareEstimate && (
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              Estimated Fare: <span className="font-bold">৳{fareEstimate}</span>
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="cash">Cash</option>
            <option value="card">Credit/Debit Card</option>
            <option value="mobile">Mobile Banking</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Requesting Ride...' : 'Request Ride'}
        </button>
      </form>
    </div>
  );
};

export default RequestRide;