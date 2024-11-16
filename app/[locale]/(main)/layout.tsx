import { Sidebar } from "@/components/library/Sidebar/Sidebar";
import { ReactElement } from "react";

export default async function Layout({ children }: { children: ReactElement }) {
  return <Sidebar>{children}</Sidebar>;
}
