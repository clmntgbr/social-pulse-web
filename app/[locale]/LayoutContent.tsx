"use client";

import { decodeToken, isTokenValid } from "@/components/Token";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";
import Providers from "./(main)/providers";

export function LayoutContent({ locale, children }: { locale: string; children: ReactElement }) {
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
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">{children}</main>
    </Providers>
  );
}
