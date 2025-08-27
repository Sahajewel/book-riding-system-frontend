
// import MyRides from "@/pages/rider/MyRides";
// import RiderProfile from "@/pages/rider/Profile";
// import RequestRide from "@/pages/rider/RequestRide";
// import RideDetails from "@/pages/rider/RideDetails";
// import type { ISidebarItem } from "@/types";

// export const RiderSideItems: ISidebarItem[] = [
//   {
//     title: "Rider Panel",
//     items: [
//       {
//         title: "Book a Ride",
//         url: "/rider/bookings",
//         component: RequestRide,
//       },
//       {
//         title: "Ride History",
//         url: "/rider/history",
//         component: RideDetails,
//       },
//       {
//         title: "My Rides",
//         url: "/rider/my-rides",
//         component: MyRides,
//       },
//         {
//         title: "Profile",
//         url: "/rider/profile",
//         component: RiderProfile // ✅ Correct component
//       },
//     ],
//   },
// ];


// src/routes/router.tsx (update this file)
// import RequestRide from "@/pages/rider/RequestRide";
// import MyRides from "@/pages/rider/MyRides";
// import RideDetails from "@/pages/rider/RideDetails";
// import RiderProfile from "@/pages/rider/Profile";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
// import Home from "@/pages/home/Home";

// ... existing imports ...

const RequestRide = lazy(() => import("@/pages/rider/RequestRide"));
const MyRides = lazy(() => import("@/pages/rider/MyRides"));
const RideDetails = lazy(() => import("@/pages/rider/RideDetails"));
const RiderProfile = lazy(() => import("@/pages/rider/Profile"));

export const RiderSideItems: ISidebarItem[] = [
  {
    title: "Rider Panel",
    items: [
      // {
      //   title: "Home",
      //   url: "/admin/",
      //   component: Home,
      // },
      {
        title: "Book a Ride",
        url: "/rider/bookings",
        component: RequestRide,
      },
      {
        title: "My Rides",
        url: "/rider/my-rides",
        component: MyRides,
      },
      {
        title: "Ride Details",
        url: "/rider/ride-details",
        component: RideDetails,
      },
      {
        title: "Profile",
        url: "/rider/profile",
        component: RiderProfile,
      },
    ],
  },
];