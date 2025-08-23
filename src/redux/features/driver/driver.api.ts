// src/redux/features/driver/driverApi.ts
import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Update availability (online/offline)
    updateAvailability: builder.mutation({
      query: (data: { isAvailable: boolean }) => ({
        url: "/driver/availability",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Driver"],
    }),

    // ✅ Get earnings history
    getEarnings: builder.query({
      query: () => ({
        url: "/driver/earnings",
        method: "GET",
      }),
      providesTags: ["Driver", "Earnings"],
    }),

    // ✅ Accept Ride
    acceptRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/ride/accept/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Ride"],
    }),

    // ✅ Reject Ride
    rejectRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/ride/reject/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Ride"],
    }),

    // ✅ Update Ride Status (PickedUp → Ongoing → Completed)
    updateRideStatus: builder.mutation({
      query: ({ rideId, status }: { rideId: string; status: string }) => ({
        url: `/ride/${rideId}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Ride"],
    }),

    // ✅ Driver Ride History
    getDriverRides: builder.query({
      query: () => ({
        url: "/ride/my-rides", // ekhane driver er jonno backend adjust korte hobe
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
  }),
});

export const {
  useUpdateAvailabilityMutation,
  useGetEarningsQuery,
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRideStatusMutation,
  useGetDriverRidesQuery,
} = driverApi;
