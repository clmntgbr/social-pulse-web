"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarRail } from "@/components/ui/sidebar";
import SidebarOrganizationSwitcher from "./SidebarOrganizationSwitcher";
import { SidebarSecondary } from "./SidebarSecondary";
import { SidebarSocialNetworks } from "./SidebarSocialNetworks";

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarOrganizationSwitcher />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSocialNetworks />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSecondary className="mt-auto" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
