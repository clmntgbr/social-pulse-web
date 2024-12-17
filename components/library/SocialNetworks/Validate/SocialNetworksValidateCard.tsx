"use client";

import { Capitalize } from "@/components/Capitalize";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { SocialNetwork } from "@/store/client/interface/social-network";
import { User } from "lucide-react";

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
          <Avatar className="h-16 w-16 border-2 border-transparent transition-colors">
            <AvatarImage src={account.avatarUrl} alt={account.name} />
            <AvatarFallback className="bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </AvatarFallback>
          </Avatar>
          {checked && (
            <Badge variant="default" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </Badge>
          )}
        </div>
        <div className="space-y-1">
          <div className="font-medium">{account.name}</div>
          <div className="text-sm text-muted-foreground">{Capitalize(account.socialNetworkType.name)}</div>
        </div>
      </div>
      <Checkbox checked={checked} className={cn("h-5 w-5 transition-opacity")} onCheckedChange={onCheckChange} onClick={(e) => e.stopPropagation()} />
    </Card>
  );
}
