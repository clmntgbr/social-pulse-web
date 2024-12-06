"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";

export function SidebarFavorites() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-bold"></SidebarGroupLabel>
      <SidebarMenu></SidebarMenu>
    </SidebarGroup>
  );
}
