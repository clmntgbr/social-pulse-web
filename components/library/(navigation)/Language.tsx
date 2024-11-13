"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Language() {
  const locale = useCurrentLocale();
  const [position, setPosition] = useState<"en" | "fr" | "xx">(locale);
  const t = useI18n();
  const changeLocale = useChangeLocale();

  const handleSetPosition = (value: string) => {
    setPosition(value as "en" | "fr" | "xx");
  };

  useEffect(() => {
    changeLocale(position);
  }, [changeLocale, position]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image src={`/images/${position}.png`} alt="Language image" width={30} height={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleSetPosition("fr")}>
              <div className="flex items-center space-x-4 py-1">
                <Image src={`/images/fr.png`} alt="Language image" width={20} height={20} />
                <div>
                  <div className="text-sm font-medium leading-none">{t("navigation.language.french")}</div>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetPosition("en")}>
              <div className="flex items-center space-x-4 py-1">
                <Image src={`/images/en.png`} alt="Language image" width={20} height={20} />
                <div>
                  <div className="text-sm font-medium leading-none">{t("navigation.language.english")}</div>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetPosition("xx")}>
              <div className="flex items-center space-x-4 py-1">
                <Image src={`/images/xx.png`} alt="Language image" width={20} height={20} />
                <div>
                  <div className="text-sm font-medium leading-none">{t("navigation.language.xx")}</div>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
