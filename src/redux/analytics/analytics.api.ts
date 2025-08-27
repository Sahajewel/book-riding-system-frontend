import { baseApi } from "../baseApi";


export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/analytics/dashboard",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = analyticsApi;