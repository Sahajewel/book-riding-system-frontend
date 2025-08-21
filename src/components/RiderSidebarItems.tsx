
import Rider from "@/pages/rider/Rider";
import type { ISidebarItem } from "@/types";

export const RiderSideItems: ISidebarItem[] = [
   
        {
          title: "History",
          items:[
            {
              title: "Bookings",
              url: "/rider/bookings",
              component: Rider
            }
          ]
        },
    
      ]