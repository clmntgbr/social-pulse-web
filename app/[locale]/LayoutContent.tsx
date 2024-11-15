"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";
import Providers from "./(main)/providers";

export function LayoutContent({ locale, children }: { locale: string; children: ReactElement }) {
  const { data } = useSession();
  const router = useRouter();
  // const { userDispatch } = useUserContext();
  const pathname = usePathname();

  // useEffect(() => {
  //   const checkAuthAndRedirect = () => {
  //     if (data && !data?.accessToken) {
  //       router.push(`/${locale}/login`);
  //       return;
  //     }

  //     if (data && data.accessToken) {
  //       const token = decodeToken(`${data?.accessToken}`);
  //       if (!token || !isTokenValid(token)) {
  //         router.push(`/${locale}/login`);
  //         return;
  //       }
  //     }
  //   };

  //   checkAuthAndRedirect();
  // }, [data, locale, router]);

  useEffect(() => {
    console.log(data?.accessToken);
    // if (data?.accessToken) {
    //   getUser(`${data.accessToken}`, userDispatch);
    // }
  }, [data?.accessToken]);

  console.log(data?.accessToken);

  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">{children}</main>
    </Providers>
  );
}
