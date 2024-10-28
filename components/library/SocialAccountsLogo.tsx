import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type SocialAccountsLogoProps = {
  avatarUrl: string;
  username: string;
  logo: string;
};

export const SocialAccountsLogo: React.FC<SocialAccountsLogoProps> = ({ avatarUrl, username, logo }) => {
  return (
    <>
      <div className="relative">
        <Avatar className="h-9 w-9">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>

        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary border-2 border-background z-50">
          <img src={logo} alt="Logo" className="w-full h-full rounded-full" />
        </div>
      </div>
    </>
  );
};
