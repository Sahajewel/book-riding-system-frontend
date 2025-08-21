import { role } from "@/constants/role";
import { adminSideItems } from "@/routes/adminSidebarItems";
import type { TRole } from "@/types";
import { DriverSideItems } from "./DriverSidebarItems";
import { RiderSideItems } from "./RiderSidebarItems";

export const getSidebarItems = (userRole: TRole)=>{
switch (userRole) {
    case role.admin:
        return [...adminSideItems];
    case role.driver:
        return [...DriverSideItems];
     case role.rider: 
     return [...RiderSideItems]   

    default:
        return [];
}
}