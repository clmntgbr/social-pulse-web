import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type SocialAccountsLogoProps = {
  avatarUrl: string;
  username: string;
  logo: string;
};

export const SocialAccountsLogo: React.FC<SocialAccountsLogoProps> = ({ avatarUrl, username, logo }) => {
  return (
    <>
      <div className="relative flex">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 right-0 w-4 h-4 rounded-full bg-primary border-2 border-background z-50">
                  <Image src={logo} alt="Logo image" className="w-full h-full rounded-full" width={40} height={40} />
                </div>
              </>
            </TooltipTrigger>
            <TooltipContent>
              <p>{username}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};
