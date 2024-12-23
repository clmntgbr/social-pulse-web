import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { DropdownMenuUser } from "../DropdownMenuUser";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { SidebarApp } from "./SidebarApp";
import { SidebarNavigationMenu } from "./SidebarNavigationMenu";

export function Sidebar({ children }: { children: ReactElement }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname().split("/")[2] ?? "home";

  useEffect(() => {
    if (!localStorage.getItem("sidebarOpen")) {
      setOpen(true);
      return;
    }

    const storedValue = localStorage.getItem("sidebarOpen")?.toLowerCase() === "true";
    setOpen(storedValue);
  }, []);

  return (
    <>
      <SidebarProvider
        open={open}
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <SidebarApp variant="floating" className="border-gray-200" />
        <SidebarInset className="bg-transparent max-h-screen border-gray-200">
          <header className="flex h-16 shrink-0 items-center px-4 border-b justify-between">
            <SidebarTrigger
              className="-ml-1 hover:text-blue-400"
              onClick={() => {
                localStorage.setItem("sidebarOpen", (!open).toString());
                setOpen(!open);
              }}
            />
            <SidebarNavigationMenu />
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <DropdownMenuUser />
            </div>
          </header>
          <div className={`flex flex-1 flex-col gap-4 page-${pathname}`} style={{ height: "calc(100vh - 4rem)" }}>
            <div className="flex-1 rounded-xl md:min-h-min">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
