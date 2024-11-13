"use client";

import { Statistics } from "@/components/library/(social-accounts)/Statistics";
import { SocialAccountsTable } from "@/components/library/(social-accounts)/Table";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/locales/client";
import { MessageCircle, Share2, TrendingUp, Users } from "lucide-react";

export default function Page() {
  const t = useI18n();

  const stats = [
    { icon: Users, label: "Total Followers", value: "272.5K" },
    { icon: MessageCircle, label: "Total Engagement", value: "19K" },
    { icon: Share2, label: "Total Shares", value: "9.7K" },
    { icon: TrendingUp, label: "Average Growth", value: "+10.25%" },
  ];

  return (
    <div className="space-y-6 py-10 px-8 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t("pages.socialAccounts.title")}</h2>
        <p className="text-muted-foreground">{t("pages.socialAccounts.description")}</p>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Statistics />
      </div>

      <SocialAccountsTable />
    </div>
  );
}
