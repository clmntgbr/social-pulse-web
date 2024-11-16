"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarRail } from "@/components/ui/sidebar";
import { SidebarFavorites } from "./SidebarFavorites";
import { SidebarRecents } from "./SidebarRecents";
import { SidebarSecondary } from "./SidebarSecondary";
import { SidebarUser } from "./SidebarUser";

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarUser />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarFavorites />
        <SidebarRecents />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSecondary className="mt-auto" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
