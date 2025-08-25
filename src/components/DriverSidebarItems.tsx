// src/components/DriverSidebarItems.ts
import DriverAvailability from "@/pages/driver/DriverAvailability";
import ActiveRide from "@/pages/driver/ActiveRide";
import EarningsDashboard from "@/pages/driver/EarningDashboard";
import DriverRideHistory from "@/pages/driver/DriverHistory";
import RideRequests from "@/pages/driver/RideRequest";
import type { ISidebarItem } from "@/types";
// import RiderManagement from "@/pages/admin/RiderManagement";
// import RiderProfile from "@/pages/rider/Profile";
import DriverProfile from "@/pages/driver/DriverProfile";

export const DriverSideItems: ISidebarItem[] = [
  {
    title: "Driver Panel",
    items: [
      {
        title: "Availability",
        url: "/driver/availability",
        component: DriverAvailability,
      },
      {
        title: "Ride Requests",
        url: "/driver/rides",
        component: RideRequests,
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
        title: "Active Ride",
        url: "/driver/active-ride",
        component: ActiveRide,
      },
      {
        title: "Profile Management",
        url: "/driver/profile",
        component: DriverProfile,
      },
    
    ],
  },
  
];