"use client";

import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { useCurrentLocale } from "@/locales/client";
import { SocialAccount } from "@/store/client/interface/social-account";
import Link from "next/link";
import { SocialAccountsLogo } from "../SocialAccountsLogo";

export default function SocialAccounts() {
  const { socialAccounts } = useSocialAccountsContext();
  const { workspaces } = useWorkspacesContext();
  const locale = useCurrentLocale();
  const maxToDisplay = 4;

  if (!socialAccounts || !socialAccounts.socialAccounts || !workspaces || !workspaces.workspaces) {
    return null;
  }

  return (
    <>
      <Link className="flex -space-x-1  " href={`/${locale}/social-accounts`}>
        {socialAccounts.socialAccounts?.member.slice(0, maxToDisplay).map((socialAccount: SocialAccount) => (
          <SocialAccountsLogo key={socialAccount.uuid} username={socialAccount.username} avatarUrl={socialAccount.avatarUrl} logo={socialAccount.socialAccountTypeAvatarUrl} />
        ))}
        {socialAccounts.socialAccounts?.member.length > maxToDisplay && (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-9 h-9 rounded-full">
              <span className="text-sm">+{socialAccounts.socialAccounts?.member.length - maxToDisplay}</span>
            </div>
          </div>
        )}
      </Link>
    </>
  );
}
