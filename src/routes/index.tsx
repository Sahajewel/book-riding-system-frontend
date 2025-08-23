import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/about/About";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/login/Login";
import RegisterPage from "@/pages/RegisterPage";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSideItems } from "./adminSidebarItems";
import { DriverSideItems } from "@/components/DriverSidebarItems";
import { RiderSideItems } from "@/components/RiderSidebarItems";
import Features from "@/pages/features/Features";
import Contact from "@/pages/contact/Contact";
import FAQ from "@/pages/faq/Faq";
import Settings from "@/pages/settings/Settings";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: withAuth(About),
        path: "about",
      },
      {
        Component: Features,
        path: "/features",
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        Component: FAQ,
        path: "/faq",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",

    children: [
      { index: true, element: <Navigate to="/admin/analytics"></Navigate> },
      ...generateRoutes(adminSideItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.driver as TRole),
    path: "/driver",
    children: [
      { index: true, element: <Navigate to="/driver/availability" /> },
      ...generateRoutes(
        DriverSideItems.map((item) => ({
          ...item,
          items: item.items.map((subItem) => ({
            ...subItem,
            url: subItem.url.replace("/user/", "/driver/"),
          })),
        }))
      ),
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.rider as TRole),
    path: "/rider",
    children: [
      { index: true, element: <Navigate to="/rider/bookings" /> },
      ...generateRoutes(
        RiderSideItems.map((item) => ({
          ...item,
          items: item.items.map((subItem) => ({
            ...subItem,
            url: subItem.url.replace("/user/", "/rider/"), // optional replacement
          })),
        }))
      ),
    ],
  },

  {
    Component: LoginPage,
    path: "/login",
  },
  {
    Component: RegisterPage,
    path: "/register",
  },
  {
    Component: Settings,
    path: "/settings",
  },
]);
