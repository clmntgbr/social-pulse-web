"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import useSocialNetworksContext from "@/contexts/social-networks/hooks";
import { SocialNetwork } from "@/store/client/interface/social-network";
import Image from "next/image";

export function SidebarSocialNetworks() {
  const { socialNetworks } = useSocialNetworksContext();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-bold">Social Networks</SidebarGroupLabel>
      <SidebarMenu>
        {socialNetworks.socialNetworks && socialNetworks.socialNetworks.length <= 0 && (
          <div className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&amp;>span:last-child]:truncate [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm">
            <span className="font-light text-xs">You dont have any social networks linked</span>
          </div>
        )}
        {socialNetworks.socialNetworks?.map((item: SocialNetwork) => (
          <SidebarMenuItem key={crypto.randomUUID()} className="hover:bg-accent rounded-sm">
            <SidebarMenuButton asChild>
              <div className="flex w-full items-center gap-2 overflow-hidden rounded-sm p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm">
                <Image
                  src={`${item.avatarUrl}`}
                  alt={item.username}
                  width={28}
                  height={28}
                  className="flex-shrink-0 w-7 h-7 rounded-full object-cover overflow-hidden"
                />
                <Image
                  src={`/images/${item.socialNetworkType}-logo.png`}
                  alt={item.username}
                  width={10}
                  height={10}
                  className="absolute -bottom-[0px] left-[25px] flex-shrink-0 w-3 h-3 rounded-sm object-cover overflow-hidden"
                />
                <span className="font-medium">{item.username}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
