"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button variant="outline" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" && <SunIcon className="absolute h-[1.2rem] w-[1.2rem]" />}
        {theme === "dark" && <MoonIcon className="absolute h-[1.2rem] w-[1.2rem]" />}
      </Button>
    </>
  );
}
