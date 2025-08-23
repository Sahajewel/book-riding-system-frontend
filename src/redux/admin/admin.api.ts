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
    getAllRides: builder.query({
      query: () => ({
        url: "/ride", // 🚨 backend e ekta /ride GET admin specific korte hobe
        method: "GET",
      }),
      providesTags: ["Ride"],
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
} = adminApi;
