// src/components/DriverSidebarItems.ts
// import DriverAvailability from "@/pages/driver/DriverAvailability";
// import ActiveRide from "@/pages/driver/ActiveRide";
// import EarningsDashboard from "@/pages/driver/EarningDashboard";
// import DriverRideHistory from "@/pages/driver/DriverHistory";
// import RideRequests from "@/pages/driver/RideRequest";
import UpdateRides from "@/pages/driver/UpdateRide";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

// import RiderManagement from "@/pages/admin/RiderManagement";
// import RiderProfile from "@/pages/rider/Profile";
// import DriverProfile from "@/pages/driver/DriverProfile";

const DriverProfile = lazy(() => import("@/pages/driver/DriverProfile"));
const DriverAvailability = lazy(
  () => import("@/pages/driver/DriverAvailability")
);
const ActiveRide = lazy(() => import("@/pages/driver/ActiveRide"));
const EarningsDashboard = lazy(() => import("@/pages/driver/EarningDashboard"));
const DriverRideHistory = lazy(() => import("@/pages/driver/DriverHistory"));
// const RideRequests = lazy(() => import("@/pages/driver/RideRequest"));

export const DriverSideItems: ISidebarItem[] = [
  {
    title: "Driver Panel",
    items: [
      {
        title: "Availability",
        url: "/driver/availability",
        component: DriverAvailability,
      },
      // {
      //   title: "Ride Requests",
      //   url: "/driver/rides",
      //   component: RideRequests,
      // },
      {
        title: "Active Ride",
        url: "/driver/active-ride",
        component: ActiveRide,
      },
      {
        title: "Ride History",
        url: "/driver/history",
        component: DriverRideHistory,
      },
      {
        title: "Earnings",
        url: "/driver/earnings",
        component: EarningsDashboard,
      },

      {
        title: "Profile Management",
        url: "/driver/profile",
        component: DriverProfile,
      },
      {
        title: "",
        url: "/driver/update-ride",
        component: UpdateRides,
      },
    ],
  },
];
