import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { SidebarApp } from "./SidebarApp";
import { SidebarMenu } from "./SidebarMenu";

export function Sidebar({ children }: { children: ReactElement }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname().split("/")[2];

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
        <SidebarApp />
        <SidebarInset className="bg-transparent max-h-screen">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
            <SidebarTrigger
              className="-ml-1"
              onMouseEnter={() => {
                if (!open) {
                  localStorage.setItem("sidebarOpen", (!open).toString());
                  setOpen(!open);
                }
              }}
              onClick={() => {
                localStorage.setItem("sidebarOpen", (!open).toString());
                setOpen(!open);
              }}
            />
            <SidebarMenu />
          </header>
          <div className={`flex flex-1 flex-col gap-4 page-${pathname}`}>
            <div className="flex-1 rounded-xl md:min-h-min p-5">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
