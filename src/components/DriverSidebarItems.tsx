
import Driver from "@/pages/driver/Driver";
import type { ISidebarItem } from "@/types";

export const DriverSideItems: ISidebarItem[] = [
   
        {
          title: "History",
          items:[
            {
              title: "Bookings",
              url: "/driver/bookings",
              component: Driver
            }
          ]
        },
    
      ]