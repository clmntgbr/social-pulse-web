"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { useCurrentLocale } from "@/locales/client";
import { Analysis } from "@/store/client/interface/analysis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SidebarRecents() {
  const { analysis } = useAnalysisContext();
  const locale = useCurrentLocale();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (analysis.recents) {
      setIsLoading(false);
    }
  }, [analysis.recents]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-bold">Recents</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2 py-1 px-2">
                <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
                <Skeleton className="h-4 w-40 bg-gray-200" />
              </div>
            ))}
          </>
        ) : (
          <>
            {analysis.recents.length <= 0 && (
              <div className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&amp;>span:last-child]:truncate [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm">
                <span className="font-medium">You dont have any recents analysis</span>
              </div>
            )}
            {analysis.recents.map((item: Analysis) => (
              <SidebarMenuItem key={crypto.randomUUID()} className="hover:bg-accent rounded-xl">
                <SidebarMenuButton asChild>
                  <Link href={`/${locale}/analysis/${item.uuid}`} title={item.title}>
                    <Image
                      src={`/images/${item.platform}-logo.png`}
                      alt={item.username}
                      width={20}
                      height={20}
                      className="flex-shrink-0 w-5 h-5 rounded-sm object-cover overflow-hidden"
                    />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
