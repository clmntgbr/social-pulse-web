import { ReactElement } from "react";

export default async function NavigationLayout({ children }: { params: Promise<{ locale: string }>; children: ReactElement }) {
  return <>{children}</>;
}
