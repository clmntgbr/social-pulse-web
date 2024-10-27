"use client";

import useUserContext from "@/contexts/users/hooks";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { user, userDispatch } = useUserContext();
  const { getToken } = useAuth();

  return (
    <>
      <div>{JSON.stringify(user.workspaces?.member)}</div>
      <p>============================================================</p>
      <div>{JSON.stringify(user.workspace)}</div>
      <p>============================================================</p>
      <div>{JSON.stringify(user.socialAccounts)}</div>
      <p>============================================================</p>
      <div>{JSON.stringify(user.me)}</div>
    </>
  );
}
