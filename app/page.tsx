"use client";

import useUserContext from "@/contexts/users/hooks";

export default function Home() {
  const { user } = useUserContext();

  return (
    <>
      <div>{JSON.stringify(user.workspaces?.member)}</div>
      <p>============================================================</p>
      <div>{JSON.stringify(user.workspace)}</div>
    </>
  );
}
