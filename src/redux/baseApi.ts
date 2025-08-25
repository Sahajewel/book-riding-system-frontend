import {createApi} from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "./axioxBaseQuery"

// import config from "@/config"
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["User", "Driver", "Ride", "Earnings", "Rider", "Analytics" ],
    // baseQuery: fetchBaseQuery({
    //     baseUrl: config.baseUrl,
    //     credentials: "include"
    // }),
    endpoints: ()=>({})
})