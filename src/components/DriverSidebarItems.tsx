
import Earnings from "@/pages/driver/Earnings";
// import DriverDashboard from "@/pages/driver/Driver"; 
import type { ISidebarItem } from "@/types";
import Availability from "@/pages/driver/AvailabilityToggle";
import RideRequests from "@/pages/driver/RideRequest";

export const DriverSideItems: ISidebarItem[] = [
  {
    title: "Driver Panel",
    items: [
      {
        title: "Availability",
        url: "/driver/availability",
        component: Availability,
      },
      {
        title: "Ride Requests",
        url: "/driver/rides",
        component: RideRequests,
      },
      {
        title: "History",
        url: "/driver/history",
        component: RideRequests, 
      },
      {
        title: "Earnings",
        url: "/driver/earnings",
        component: Earnings,
      },
    ],
  },
];
