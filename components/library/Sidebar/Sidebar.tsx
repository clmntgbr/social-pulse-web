import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { SidebarApp } from "./SidebarApp";
import { SidebarMenu } from "./SidebarMenu";

export function Sidebar({ children }: { children: ReactElement }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname().split("/")[2];
  const [showTrigger, setShowTrigger] = useState(true);

  useEffect(() => {
    if (!open) {
      setShowTrigger(false);
      const timer = setTimeout(() => {
        setShowTrigger(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [open]);

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
        <SidebarApp
          onMouseLeave={() => {
            if (open) {
              setOpen(!open);
            }
          }}
        />
        <SidebarInset className="bg-transparent max-h-screen">
          <header className="flex h-16 shrink-0 items-center px-4 border-b justify-between">
            {!open && showTrigger && (
              <SidebarTrigger
                className="-ml-1"
                onMouseEnter={() => {
                  if (!open) {
                    setOpen(!open);
                  }
                }}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            )}
            <SidebarMenu />
            {/* <ThemeSwitcher /> */}
          </header>
          <div className={`flex flex-1 flex-col gap-4 page-${pathname}`}>
            <div className="flex-1 rounded-xl md:min-h-min p-8">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
