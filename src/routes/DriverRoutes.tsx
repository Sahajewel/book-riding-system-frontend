import type { RouteObject } from "react-router";
import UpdateRides from "@/pages/driver/UpdateRide";

export const driverRoutes: RouteObject[] = [
  { path: "/update-ride", element: <UpdateRides /> },
];
