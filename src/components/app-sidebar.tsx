import * as React from "react";

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
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import Logo from "@/assets/icon/Logo";
import { getSidebarItems } from "./GetSidevarItems";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };
  return (
    <Sidebar {...props}>
      <Link className="pl-5 pt-5" to="/">
        <Logo />
      </Link>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* এখানে .filter অ্যাড করা হয়েছে */}
                {group.items
                  .filter((item) => item.title) // যদি title খালি থাকে (falsy), তবে সেটা বাদ যাবে
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
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
  );
}
