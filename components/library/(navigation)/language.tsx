"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";
import { useEffect, useState } from "react";

export function Language() {
  const locale = useCurrentLocale();
  const [position, setPosition] = useState<"en" | "fr" | "xx">(locale);
  const t = useI18n();
  const changeLocale = useChangeLocale();

  useEffect(() => {
    changeLocale(position);
  }, [changeLocale, position]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full border-slate-200 border-4">
        <img src={`/images/${position}.png`} alt="Language image" width={40} height={40} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="fr">{t("navigation.language.french")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">{t("navigation.language.english")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="xx">{t("navigation.language.xx")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
