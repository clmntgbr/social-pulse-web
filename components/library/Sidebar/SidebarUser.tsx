"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import useUserContext from "@/contexts/users/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SidebarUser() {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.me) {
      setIsLoading(false);
    }
  }, [user.me]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {isLoading ? (
          <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
            <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
              <li data-sidebar="menu-item" className="group/menu-item relative">
                <div className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 [&amp;>span:last-child]:truncate [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 hover:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:!p-0 border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div className="flex w-full items-center gap-2 rounded-md">
                    <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
                    <div className="flex flex-col gap-1.5 flex-grow relative">
                      <Skeleton className="h-3 rounded w-20" />
                      <Skeleton className="h-3 rounded w-40" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </ul>
        ) : (
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 [&amp;>span:last-child]:truncate [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 hover:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:!p-0 hover:bg-accent border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <span className="h-8 w-8 rounded-lg overflow-hidden">
              <Image src="/images/avatar.jpg" alt={`${user.me?.uuid}`} width={40} height={40} priority={true} />
            </span>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Joy Wolff</span>
              <span className="truncate text-xs">clement@gmail.com</span>
            </div>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
