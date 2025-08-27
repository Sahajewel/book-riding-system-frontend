/* eslint-disable @typescript-eslint/no-explicit-any */
// // src/redux/features/rider/riderApi.ts
// import { baseApi } from "@/redux/baseApi";
// import type { IRide } from "@/types/ride.interface";

// export const riderApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

//     // ✅ Request a ride
//     requestRide: builder.mutation<IRide, { pickupLocation: string; dropoffLocation: string }>({
//       query: (data) => ({
//         url: "/ride/request",
//         method: "POST",
//         data,
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       invalidatesTags: ["Ride"],
//     }),

//     // ✅ Get my rides
//     getMyRides: builder.query<IRide[], void>({
//       query: () => ({
//         url: "/ride/my-rides",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide[] }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Get single ride details
//     getSingleRide: builder.query<IRide, string>({
//       query: (id) => ({
//         url: `/ride/${id}`,
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Cancel a ride
//     cancelRide: builder.mutation<IRide, string>({
//       query: (id) => ({
//         url: `/ride/cancel/${id}`,
//         method: "PATCH",
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       invalidatesTags: ["Ride"],
//     }),
//   }),
// });

// export const {
//   useRequestRideMutation,
//   useGetMyRidesQuery,
//   useGetSingleRideQuery,
//   useCancelRideMutation,
// } = riderApi;


// src/redux/features/rider/riderApi.ts
import { baseApi } from "@/redux/baseApi";
import type { IRide } from "@/types/ride.interface";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Request a ride
    requestRide: builder.mutation<IRide, { pickupLocation: string; dropoffLocation: string, fare:number }>({
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

    // ✅ Get rider profile
    getRiderProfile: builder.query<any, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["User"],
    }),

    // ✅ Update rider profile
    updateRiderProfile: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: `/users/${data._id}`,
        method: "PUT",
        data,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRequestRideMutation,
  useGetMyRidesQuery,
  useGetSingleRideQuery,
  useCancelRideMutation,
  useGetRiderProfileQuery,
  useUpdateRiderProfileMutation,
} = riderApi;