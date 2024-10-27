"use client";

import useUserContext from "@/contexts/users/hooks";
import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { user, userDispatch } = useUserContext();
  const { getToken } = useAuth();

  const handleRefresh = async () => {
    const token = await getToken();
    await getSocialAccounts(`${token}`, userDispatch);
  };

  return (
    <>
      <div>{JSON.stringify(user.workspaces?.member)}</div>
      <p>============================================================</p>
      <div>{JSON.stringify(user.workspace)}</div>
      <p>============================================================</p>
      <div>{JSON.stringify(user.socialAccounts)}</div>

      <button onClick={handleRefresh} className="mb-4">
        Refresh Social accounts Data
      </button>
    </>
  );
}
