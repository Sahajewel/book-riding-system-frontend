
import MyRides from "@/pages/rider/MyRides";
import RiderProfile from "@/pages/rider/Profile";
import RequestRide from "@/pages/rider/RequestRide";
import RideDetails from "@/pages/rider/RideDetails";
import type { ISidebarItem } from "@/types";

export const RiderSideItems: ISidebarItem[] = [
  {
    title: "Rider Panel",
    items: [
      {
        title: "Book a Ride",
        url: "/rider/bookings",
        component: RequestRide,
      },
      {
        title: "Ride History",
        url: "/rider/history",
        component: RideDetails,
      },
      {
        title: "My Rides",
        url: "/rider/my-rides",
        component: MyRides,
      },
        {
        title: "Profile",
        url: "/rider/profile",
        component: RiderProfile // ✅ Correct component
      },
    ],
  },
];
