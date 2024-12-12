"use client";

import { Sidebar } from "@/components/library/Sidebar/Sidebar";
import { useCurrentLocale } from "@/locales/client";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { LayoutAuth } from "./LayoutAuth";

export default function Layout({ children }: { children: ReactElement }) {
  const locale = useCurrentLocale();
  const pathname = usePathname();

  if (pathname.includes("social-networks/validate")) {
    return (
      <SessionProvider>
        <LayoutAuth locale={locale}>{children}</LayoutAuth>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <LayoutAuth locale={locale}>
        <Sidebar>{children}</Sidebar>
      </LayoutAuth>
    </SessionProvider>
  );
}
