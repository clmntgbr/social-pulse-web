"use client";

import { Sidebar } from "@/components/library/Sidebar/Sidebar";
import { useCurrentLocale } from "@/locales/client";
import { SessionProvider } from "next-auth/react";
import { ReactElement } from "react";
import { LayoutAuth } from "./LayoutAuth";

export default function Layout({ children }: { children: ReactElement }) {
  const locale = useCurrentLocale();

  return (
    <SessionProvider>
      <LayoutAuth locale={locale}>
        <Sidebar>{children}</Sidebar>
      </LayoutAuth>
    </SessionProvider>
  );
}
