"use client";

import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useUserContext from "@/contexts/users/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";

export default function Page() {
  const { socialAccounts } = useSocialAccountsContext();
  const { workspaces } = useWorkspacesContext();
  const { user } = useUserContext();

  return <></>;
}
