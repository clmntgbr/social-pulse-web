"use client";

import useWorkspacesContext from "@/contexts/workspaces/hooks";

export default function Home() {
  const { workspaces } = useWorkspacesContext();

  return (
    <>
      <div>{JSON.stringify(workspaces.workspaces?.member)}</div>
      <p>============================================================</p>
      <div>{JSON.stringify(workspaces.workspace)}</div>
    </>
  );
}
