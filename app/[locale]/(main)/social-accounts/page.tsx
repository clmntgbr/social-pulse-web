"use client";

import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/locales/client";

export default function Page() {
  const t = useI18n();

  return (
    <div className="space-y-6 py-10 px-8 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t("pages.socialAccounts.title")}</h2>
        <p className="text-muted-foreground">{t("pages.socialAccounts.description")}</p>
      </div>
      <Separator className="my-6" />
    </div>
  );
}
