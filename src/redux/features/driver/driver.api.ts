// src/redux/features/driver/driverApi.ts
import { baseApi } from "@/redux/baseApi";
import type { IDriver } from "@/types/driver.interface";
// import type { IRide } from "@/types/ride.interface";


interface EarningsData {
  _id: string;
  totalEarnings: number;
}
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
    // getEarnings: builder.query({
    //   query: () => ({
    //     url: "/driver/earnings",
    //     method: "GET",
    //   }),
    //   providesTags: ["Driver", "Earnings"],
    // }),

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
    //  ✅ Get driver profile
    getDriverProfile: builder.query<IDriver, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      transformResponse: (response: { data: IDriver }) => response.data,
      providesTags: ["Driver"],
    }),
    //   getDriverRides: builder.query<IRide[], void>({
    //   query: () => ({
    //     url: "/ride/my-rides",
    //     method: "GET",
    //   }),
    //   transformResponse: (response: { data: IRide[] }) => response.data,
    //   providesTags: ["Ride"],
    // }),
     getEarningsHistory: builder.query<EarningsData[], void>({
      query: () => ({
        url: "/driver/earnings",
        method: "GET",
      }),
      transformResponse: (response: { data: EarningsData[] }) => response.data,
      providesTags: ["Earnings"],
    }),
    updateDriverProfile: builder.mutation<IDriver, { id: string; data: Partial<IDriver> }>({
  query: ({ id, data }) => ({
    url: `/user/${id}`,
    method: "PUT",
    data, // সরাসরি data পাঠানো হচ্ছে
  }),
  transformResponse: (response: { data: IDriver }) => response.data,
  invalidatesTags: ["Driver"],
}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   updateDriverProfile: builder.mutation<any, Partial<any>>({
    //   query: (data) => ({
    //     url: `/users/${data._id}`,
    //     method: "PUT",
    //     data,
    //   }),
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   transformResponse: (response: { data: any }) => response.data,
    //   invalidatesTags: ["User"],
    // }),
  }),
});

export const {
  useUpdateAvailabilityMutation,
  // useGetEarningsQuery,
  useUpdateDriverProfileMutation,
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRideStatusMutation,
  useGetDriverRidesQuery,
  useGetDriverProfileQuery,
  useGetEarningsHistoryQuery
 
} = driverApi;



// src/redux/features/driver/driverApi.ts
// import { baseApi } from "@/redux/baseApi";
// import type { IDriver } from "@/types/driver.interface";
// import type { IRide, UpdatableRideStatus } from "@/types/ride.interface";

// interface EarningsData {
//   _id: string;
//   totalEarnings: number;
// }

// interface AvailabilityPayload {
//   isAvailable: boolean;
// }

// export const driverApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Update availability (Online/Offline Toggle)
//     updateAvailability: builder.mutation<IDriver, AvailabilityPayload>({
//       query: (data) => ({
//         url: "/driver/availability",
//         method: "PATCH",
//         data,
//       }),
//       transformResponse: (response: { data: IDriver }) => response.data,
//       invalidatesTags: ["Driver"],
//     }),

//     // ✅ Get earnings history
//     getEarningsHistory: builder.query<EarningsData[], void>({
//       query: () => ({
//         url: "/driver/earnings",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: EarningsData[] }) => response.data,
//       providesTags: ["Earnings"],
//     }),

//     // ✅ Get available rides for driver (rides that are requested)
//     getAvailableRides: builder.query<IRide[], void>({
//       query: () => ({
//         url: "/ride?status=requested",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide[] }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Accept a ride
//     acceptRide: builder.mutation<IRide, string>({
//       query: (rideId) => ({
//         url: `/ride/accept/${rideId}`,
//         method: "PATCH",
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       invalidatesTags: ["Ride"],
//     }),

//     // ✅ Reject a ride
//     rejectRide: builder.mutation<IRide, string>({
//       query: (rideId) => ({
//         url: `/ride/reject/${rideId}`,
//         method: "PATCH",
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       invalidatesTags: ["Ride"],
//     }),

//     // ✅ Update ride status (Accepted → Picked Up → In Transit → Completed)
//     updateRideStatus: builder.mutation<
//       IRide,
//       { rideId: string; status: UpdatableRideStatus }
//     >({
//       query: ({ rideId, status }) => ({
//         url: `/ride/${rideId}/status`,
//         method: "PATCH",
//         data: { status },
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       invalidatesTags: ["Ride"],
//     }),

//     // ✅ Get driver's rides (ride history)
//     getDriverRides: builder.query<IRide[], void>({
//       query: () => ({
//         url: "/ride/my-rides",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide[] }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Get single ride details
//     getDriverSingleRide: builder.query<IRide, string>({
//       query: (rideId) => ({
//         url: `/ride/${rideId}`,
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Get driver profile
//     getDriverProfile: builder.query<IDriver, void>({
//       query: () => ({
//         url: "/user/me",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IDriver }) => response.data,
//       providesTags: ["Driver"],
//     }),

//     // ✅ Update driver profile
//     updateDriverProfile: builder.mutation<IDriver, Partial<IDriver> & { id: string }>({
//       query: ({ id, ...data }) => ({
//         url: `/user/${id}`,
//         method: "PUT",
//         data,
//       }),
//       transformResponse: (response: { data: IDriver }) => response.data,
//       invalidatesTags: ["Driver"],
//     }),
//   }),
// });

// export const {
//   useUpdateAvailabilityMutation,
//   useGetEarningsHistoryQuery,
//   useGetAvailableRidesQuery,
//   useAcceptRideMutation,
//   useRejectRideMutation,
//   useUpdateRideStatusMutation,
//   useGetDriverRidesQuery,
//   useGetDriverSingleRideQuery,
//   useGetDriverProfileQuery,
//   useUpdateDriverProfileMutation,
// } = driverApi;




// // src/redux/features/driver/driverApi.ts
// import { baseApi } from "@/redux/baseApi";
// import type { IDriver } from "@/types/driver.interface";
// import type { IRide, UpdatableRideStatus } from "@/types/ride.interface";

// interface EarningsData {
//   _id: string;
//   totalEarnings: number;
// }

// interface AvailabilityPayload {
//   isAvailable: boolean;
// }

// // interface RideStatusPayload {
// //   status: string;
// // }


// export const driverApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
    
//     // ✅ Update availability (Online/Offline Toggle)
//     updateAvailability: builder.mutation<IDriver, AvailabilityPayload>({
//       query: (data) => ({
//         url: "/driver/availability",
//         method: "PATCH",
//         data,
//       }),
//       transformResponse: (response: { data: IDriver }) => response.data,
//       invalidatesTags: ["Driver"],
//     }),

//     // ✅ Get earnings history
//     getEarningsHistory: builder.query<EarningsData[], void>({
//       query: () => ({
//         url: "/driver/earnings",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: EarningsData[] }) => response.data,
//       providesTags: ["Earnings"],
//     }),

//     // ✅ Get available rides for driver (rides that are requested)
//     getAvailableRides: builder.query<IRide[], void>({
//       query: () => ({
//         url: "/ride?status=requested", // Assuming backend filters by status
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide[] }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Accept a ride
//     // acceptRide: builder.mutation<IRide, string>({
//     //   query: (rideId) => ({
//     //     url: `/ride/accept/${rideId}`,
//     //     method: "PATCH",
//     //   }),
//     //   transformResponse: (response: { data: IRide }) => response.data,
//     //   invalidatesTags: ["Ride"],
//     // }),
//  acceptRide: builder.mutation({
//       query: (rideId: string) => ({
//         url: `/ride/accept/${rideId}`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["Ride"],
//     }),
//     // ✅ Reject a ride
//     // rejectRide: builder.mutation<IRide, string>({
//     //   query: (rideId) => ({
//     //     url: `/ride/reject/${rideId}`,
//     //     method: "PATCH",
//     //   }),
//     //   transformResponse: (response: { data: IRide }) => response.data,
//     //   invalidatesTags: ["Ride"],
//     // }),

//      rejectRide: builder.mutation({
//       query: (rideId: string) => ({
//         url: `/ride/reject/${rideId}`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["Ride"],
//     }),
//     // ✅ Update ride status (Accepted → Picked Up → In Transit → Completed)
//     // updateRideStatus: builder.mutation<IRide, { rideId: string; status: string }>({
//     //   query: ({ rideId, status }) => ({
//     //     url: `/ride/${rideId}/status`,
//     //     method: "PATCH",
//     //     data: { status },
//     //   }),
//     //   transformResponse: (response: { data: IRide }) => response.data,
//     //   invalidatesTags: ["Ride"],
//     // }),
    
// updateRideStatus: builder.mutation<
//   IRide,
//   { rideId: string; status: UpdatableRideStatus }
// >({
//   query: ({ rideId, status }) => ({
//     url: `/ride/${rideId}/status`,
//     method: "PATCH",
//     data: { status },
//   }),
//   transformResponse: (response: { data: IRide }) => response.data,
//   invalidatesTags: ["Ride"],
// }),

//     // ✅ Get driver's rides (ride history)
//     getDriverRides: builder.query<IRide[], void>({
//       query: () => ({
//         url: "/ride/my-rides",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide[] }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Get single ride details
//     getDriverSingleRide: builder.query<IRide, string>({
//       query: (rideId) => ({
//         url: `/ride/${rideId}`,
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IRide }) => response.data,
//       providesTags: ["Ride"],
//     }),

//     // ✅ Get driver profile
//     getDriverProfile: builder.query<IDriver, void>({
//       query: () => ({
//         url: "/user/me",
//         method: "GET",
//       }),
//       transformResponse: (response: { data: IDriver }) => response.data,
//       providesTags: ["Driver"],
//     }),

//     // ✅ Update driver profile
//     updateDriverProfile: builder.mutation<IDriver, Partial<IDriver> & { id: string }>({
//       query: ({ id, ...data }) => ({
//         url: `/user/${id}`,
//         method: "PUT",
//         data,
//       }),
//       transformResponse: (response: { data: IDriver }) => response.data,
//       invalidatesTags: ["Driver"],
//     }),
//   }),
// });

// export const {
//   useUpdateAvailabilityMutation,
//   useGetEarningsHistoryQuery,
//   useGetAvailableRidesQuery,
// useAcceptRideMutation,
// useRejectRideMutation,

//   useUpdateRideStatusMutation,
//   useGetDriverRidesQuery,
//   useGetDriverSingleRideQuery,
//   useGetDriverProfileQuery,
//   useUpdateDriverProfileMutation,
// } = driverApi;