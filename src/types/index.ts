/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";

// export type {ISendOtp, ILoginPayload, IRe} from "./auth.types";
export type TRole = "ADMIN" | "RIDER" | "DRIVER";
export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType<any>;
  }[];
}
// src/types/response.ts
// export type ApiResponse<T> = {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: T;
// };
