// src/redux/features/rider/riderApi.ts
import { baseApi } from "@/redux/baseApi";
import type { IRide } from "@/types/ride.interface";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Request a ride
    requestRide: builder.mutation<IRide, { pickupLocation: string; dropoffLocation: string }>({
      query: (data) => ({
        url: "/ride/request",
        method: "POST",
        data,
      }),
      transformResponse: (response: { data: IRide }) => response.data,
      invalidatesTags: ["Ride"],
    }),

    // ✅ Get my rides
    getMyRides: builder.query<IRide[], void>({
      query: () => ({
        url: "/ride/my-rides",
        method: "GET",
      }),
      transformResponse: (response: { data: IRide[] }) => response.data,
      providesTags: ["Ride"],
    }),

    // ✅ Get single ride details
    getSingleRide: builder.query<IRide, string>({
      query: (id) => ({
        url: `/ride/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: IRide }) => response.data,
      providesTags: ["Ride"],
    }),

    // ✅ Cancel a ride
    cancelRide: builder.mutation<IRide, string>({
      query: (id) => ({
        url: `/ride/cancel/${id}`,
        method: "PATCH",
      }),
      transformResponse: (response: { data: IRide }) => response.data,
      invalidatesTags: ["Ride"],
    }),
  }),
});

export const {
  useRequestRideMutation,
  useGetMyRidesQuery,
  useGetSingleRideQuery,
  useCancelRideMutation,
} = riderApi;
