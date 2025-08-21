import type { ComponentType } from "react";

export type {ISendOtp, ILogin, IVerifyOtp} from "./auth.types";
export type TRole =  "ADMIN" | "RIDER" | "DRIVER" 
export interface ISidebarItem {
  title: string,
  items:{
    title: string,
    url: string,
    component: ComponentType
  }[],
}