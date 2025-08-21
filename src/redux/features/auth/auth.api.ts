import { baseApi } from "@/redux/baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
      
        login: builder.mutation({
            query: (data)=>({
                url: "/auth/login",
                method: "POST",
                data
            })
        }),
        logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
     invalidatesTags: ["User"]
    }),
      register: builder.mutation({
           query:(userInfo)=>({
            url: "/auth/register",
            method: "POST",
            data: userInfo
           })
        }),
      
        userInfo: builder.query({
            query: ()=>({
                url: "/user/me",
                method: "GET",
              
            }),
          providesTags:["User"]
        }),
    }),
    
});
export const {useRegisterMutation, useLoginMutation,  useLogoutMutation, useUserInfoQuery} = authApi