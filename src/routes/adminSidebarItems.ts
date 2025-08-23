// src/routes/adminSidebarItems.ts
import MyRides from "@/pages/rider/MyRides";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const DriverManagement = lazy(() => import("@/pages/admin/DriverManagement"));
const RiderManagement = lazy(() => import("@/pages/admin/RiderManagement"));



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
        title: "Riders",
        url: "/admin/riders",
        component: RiderManagement,
      },
      {
        title: "Rides",
        url: "/admin/rides",
        component: MyRides,
      },
    ],
  },
];
