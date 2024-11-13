"use client";

import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import { SocialAccount } from "@/store/client/interface/social-account";
import { SocialAccountsLogo } from "../SocialAccountsLogo";

export default function SocialAccounts() {
  const { socialAccounts } = useSocialAccountsContext();

  console.log(socialAccounts);

  if (!socialAccounts || !socialAccounts.socialAccounts) {
    return null;
  }

  return (
    <>
      <div className="flex -space-x-1">
        {socialAccounts.socialAccounts?.member.slice(0, 5).map((socialAccount: SocialAccount) => (
          <SocialAccountsLogo key={socialAccount.uuid} username={socialAccount.username} avatarUrl={socialAccount.avatarUrl} logo={socialAccount.socialAccountTypeAvatarUrl} />
        ))}
      </div>
    </>
  );
}
