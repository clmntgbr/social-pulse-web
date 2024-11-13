"use client";

import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import { useCurrentLocale } from "@/locales/client";
import { SocialAccount } from "@/store/client/interface/social-account";
import Link from "next/link";
import { SocialAccountsLogo } from "../SocialAccountsLogo";

export default function SocialAccounts() {
  const { socialAccounts } = useSocialAccountsContext();
  const locale = useCurrentLocale();

  if (!socialAccounts || !socialAccounts.socialAccounts) {
    return null;
  }

  return (
    <>
      <Link className="flex -space-x-1" href={`/${locale}/social-accounts`}>
        {socialAccounts.socialAccounts?.member.slice(0, 5).map((socialAccount: SocialAccount) => (
          <SocialAccountsLogo key={socialAccount.uuid} username={socialAccount.username} avatarUrl={socialAccount.avatarUrl} logo={socialAccount.socialAccountTypeAvatarUrl} />
        ))}
      </Link>
    </>
  );
}
