"use client";

import { decodeToken, isTokenValid } from "@/components/Token";
import { AppContextProviders } from "@/contexts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";
import Providers from "./providers";

export function LayoutAuth({ locale, children }: { locale: string; children: ReactElement }) {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = () => {
      if (data && !data?.accessToken) {
        router.push(`/${locale}/login`);
        return;
      }
      if (data && data.accessToken) {
        const token = decodeToken(`${data?.accessToken}`);
        if (!token || !isTokenValid(token)) {
          router.push(`/${locale}/login`);
          return;
        }
      }
    };

    checkAuthAndRedirect();
  }, [data, locale, router]);

  return (
    <AppContextProviders>
      <Providers>{children}</Providers>
    </AppContextProviders>
  );
}
