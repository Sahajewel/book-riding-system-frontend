import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import Logo from "@/assets/icon/Logo"
import { getSidebarItems } from "./GetSidevarItems"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data: userData} = useUserInfoQuery(undefined)
const data = {  
  navMain: getSidebarItems(userData?.data?.role)
    }
  return (
    <Sidebar {...props}>
     <Link className="pl-5 pt-5" to="/"><Logo></Logo></Link>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
