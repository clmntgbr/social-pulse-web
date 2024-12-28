"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { SocialNetwork } from "@/store/client/interface/social-network";
import Image from "next/image";

interface SocialNetworksValidateCardProps {
  account: SocialNetwork;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

export function SocialNetworksValidateCard({ account, checked, onCheckChange }: SocialNetworksValidateCardProps) {
  const handleClick = () => {
    onCheckChange(!checked);
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      className={cn(
        "group relative flex items-center justify-between w-full p-4 shadow-none",
        "transition-colors duration-200",
        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        checked && "data-[state=checked]"
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
          e.preventDefault();
        }
      }}
      data-state={checked ? "checked" : "unchecked"}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={`${account.avatarUrl}`}
            alt={account.username}
            width={100}
            height={100}
            className="flex-shrink-0 w-14 h-14 rounded-full object-cover overflow-hidden"
          />
          <Image
            src={`/images/${account.socialNetworkType.name}-logo.png`}
            alt={account.username}
            width={10}
            height={10}
            className="absolute -bottom-[7px] left-[35px] flex-shrink-0 w-6 h-6 object-cover overflow-hidden border-white dark:border-card border-2 rounded-full"
          />
        </div>
        <div className="space-y-1">
          <div className="font-medium">{account.name}</div>
          {account.username !== account.name && <div className="text-sm text-muted-foreground">{account.username}</div>}
        </div>
      </div>
      <Checkbox checked={checked} className={cn("h-5 w-5 transition-opacity")} onCheckedChange={onCheckChange} onClick={(e) => e.stopPropagation()} />
    </Card>
  );
}
