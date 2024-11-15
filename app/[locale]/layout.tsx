import { AppContextProviders } from "@/contexts";
import { I18nProviderClient } from "@/locales/client";
import { SessionProvider } from "next-auth/react";
import { ReactElement } from "react";
import { LayoutContent } from "./LayoutContent";

export default async function Layout({ params, children }: { params: Promise<{ locale: string }>; children: ReactElement }) {
  const { locale } = await params;

  return (
    <SessionProvider>
      <I18nProviderClient locale={locale}>
        <AppContextProviders>
          <LayoutContent locale={locale}>{children}</LayoutContent>
        </AppContextProviders>
      </I18nProviderClient>
    </SessionProvider>
  );
}
