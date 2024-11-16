import { AppContextProviders } from "@/contexts";
import { I18nProviderClient } from "@/locales/client";
import { SessionProvider } from "next-auth/react";
import { ReactElement } from "react";
import { LayoutAuth } from "./LayoutAuth";

export default async function Layout({ params, children }: { params: Promise<{ locale: string }>; children: ReactElement }) {
  const { locale } = await params;

  return (
    <SessionProvider>
      <I18nProviderClient locale={locale}>
        <AppContextProviders>
          <LayoutAuth locale={locale}>{children}</LayoutAuth>
        </AppContextProviders>
      </I18nProviderClient>
    </SessionProvider>
  );
}
