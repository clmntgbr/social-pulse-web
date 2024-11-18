"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { useCurrentLocale } from "@/locales/client";
import { Analysis } from "@/store/client/interface/analysis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SidebarFavorites() {
  const { analysis } = useAnalysisContext();
  const locale = useCurrentLocale();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (analysis.favorites) {
      setIsLoading(false);
    }
  }, [analysis.favorites]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
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
            {analysis.favorites.map((item: Analysis) => (
              <SidebarMenuItem key={crypto.randomUUID()} className="hover:bg-slate-200">
                <SidebarMenuButton asChild>
                  <Link href={`/${locale}/analysis/${item.uuid}`} title={item.title}>
                    <Image src={`/images/${item.platform}-logo.png`} alt={item.username} width={20} height={20} className="flex-shrink-0 w-5 h-5 rounded-sm object-cover overflow-hidden" />
                    <span>{item.title}</span>
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
