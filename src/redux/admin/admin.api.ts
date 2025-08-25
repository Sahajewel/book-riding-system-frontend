// src/redux/features/admin/adminApi.ts
import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get all users
    getUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // 🔹 Get single user
    getSingleUser: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // 🔹 Block user
    blockUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    // 🔹 Unblock user
    unblockUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    // 🔹 Approve Driver
    approveDriver: builder.mutation({
      query: (id: string) => ({
        url: `/user/approve-driver/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Driver"],
    }),

    // 🔹 Suspend Driver
    suspendDriver: builder.mutation({
      query: (id: string) => ({
        url: `/user/suspend-driver/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Driver"],
    }),

    // 🔹 Delete User
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // 🔹 Get All Drivers
    getDrivers: builder.query({
      query: () => ({
        url: "/driver",
        method: "GET",
      }),
      providesTags: ["Driver"],
    }),

    // 🔹 Get All Riders
    getRiders: builder.query({
      query: () => ({
        url: "/rider",
        method: "GET",
      }),
      providesTags: ["Rider"],
    }),

    // 🔹 Get All Rides (admin er jonno backend e filter add korte hobe)
    // src/redux/admin/admin.api.ts
getAllRides: builder.query({
  query: (params) => ({
    url: "/ride",
    method: "GET",
    params: params, // query parameters পাঠানোর জন্য
  }),
  providesTags: ["Ride"],
}),

    getRideStats: builder.query({
      query: () => ({
        url: "/ride/ride-stats",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
 getRevenueData: builder.query({
      query: () => ({
        url: "/ride/revenue",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),

    // 🔹 Driver Activity
    getDriverActivity: builder.query({
      query: () => ({
        url: "/ride/driver-activity",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),

    // 🔹 Platform Analytics
    getPlatformAnalytics: builder.query({
      query: () => ({
        url: "/ride/platform",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),

    // 🔹 Hourly Trends
    getRideTrendsByHour: builder.query({
      query: () => ({
        url: "/ride/hourly-trends",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),



  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useDeleteUserMutation,
  useGetDriversQuery,
  useGetRidersQuery,
  useGetAllRidesQuery,
 useGetRideStatsQuery,
  useGetRevenueDataQuery,
  useGetDriverActivityQuery,
  useGetPlatformAnalyticsQuery,
  useGetRideTrendsByHourQuery,
} = adminApi;
