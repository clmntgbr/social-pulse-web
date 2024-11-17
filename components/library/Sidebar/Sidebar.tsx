import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactElement, useEffect, useState } from "react";
import { SidebarApp } from "./SidebarApp";

export function Sidebar({ children }: { children: ReactElement }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const storedValue = localStorage.getItem("sidebarOpen")?.toLowerCase() === "true";
    setOpen(storedValue);
  }, []);

  return (
    <>
      {open}
      <SidebarProvider
        open={open}
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <SidebarApp />
        <SidebarInset className="bg-transparent">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger
              className="-ml-1"
              onClick={() => {
                localStorage.setItem("sidebarOpen", (!open).toString());
                setOpen(!open);
              }}
            />
          </header>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex-1 rounded-xl md:min-h-min ">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
