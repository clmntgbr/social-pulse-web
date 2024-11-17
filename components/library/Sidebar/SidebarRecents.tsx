"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { useEffect, useState } from "react";

export function SidebarRecents() {
  const { analysis } = useAnalysisContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (analysis.recents) {
      setIsLoading(false);
    }
  }, [analysis.recents]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recents</SidebarGroupLabel>
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
            {analysis.recents.map((item) => (
              <SidebarMenuItem key={crypto.randomUUID()} className="hover:bg-gray-100">
                <SidebarMenuButton asChild>
                  <a href={item.title} title={item.title}>
                    <img src={item.socialAccount.socialAccountTypeAvatarUrl} width={20} height={20} className="flex-shrink-0 w-5 h-5 rounded-sm object-cover overflow-hidden" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
