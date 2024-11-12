"use client";

import { SocialAccountsTable } from "@/components/library/(social-accounts)/Table";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/locales/client";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Page() {
  const t = useI18n();

  const socialData = [
    {
      platform: "Facebook",
      icon: Facebook,
      followers: "89.5K",
      engagement: "4.2K",
      posts: "156",
      shares: "2.3K",
      growth: "+12%",
      color: "bg-blue-100 text-blue-600",
    },
    {
      platform: "Twitter",
      icon: Twitter,
      followers: "45.8K",
      engagement: "3.1K",
      posts: "243",
      shares: "4.7K",
      growth: "+8%",
      color: "bg-sky-100 text-sky-600",
    },
    {
      platform: "Instagram",
      icon: Instagram,
      followers: "112K",
      engagement: "8.9K",
      posts: "328",
      shares: "1.8K",
      growth: "+15%",
      color: "bg-pink-100 text-pink-600",
    },
    {
      platform: "YouTube",
      icon: Youtube,
      followers: "25.2K",
      engagement: "2.8K",
      posts: "86",
      shares: "956",
      growth: "+6%",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="space-y-6 py-10 px-8 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t("pages.socialAccounts.title")}</h2>
        <p className="text-muted-foreground">{t("pages.socialAccounts.description")}</p>
      </div>
      <Separator className="my-6" />
      <SocialAccountsTable />
    </div>
  );
}
