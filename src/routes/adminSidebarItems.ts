// src/routes/adminSidebarItems.ts




import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const DriverManagement = lazy(() => import("@/pages/admin/DriverManagement"));
const AdminSearch = lazy(() => import("@/pages/admin/adminSearch/AdminSearch"));
const RideOversight = lazy(() => import("@/pages/admin/RideOversight"));
const RiderProfile = lazy(() => import("@/pages/rider/Profile"));




export const adminSideItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        component: UserManagement,
      },
      {
        title: "Drivers",
        url: "/admin/drivers",
        component: DriverManagement,
      },
      {
        title: "Ride Oversight",
        url: "/admin/ride-oversight",
        component: RideOversight,
      },
      
      {
        title: "Filter search",
        url: "/admin/filter-search",
        component: AdminSearch,
      },
   {
        title: "Profile",
        url: "/admin/profile",
        component: RiderProfile,
      },

    ],
  },
];
