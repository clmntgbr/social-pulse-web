"use client";

import { WorkspacesInvitations } from "@/components/library/(workspaces)/invitations";
import { WorkspacesManage } from "@/components/library/(workspaces)/manage";
import { WorkspacesMembers } from "@/components/library/(workspaces)/members";
import { WorkspacesSidebarNav } from "@/components/library/(workspaces)/sidebar-nav.";
import { WorkspacesSocialAccounts } from "@/components/library/(workspaces)/social-accounts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { Workspace } from "@/store/client/interface/workspace";
import { getWorkspaceInvitations } from "@/store/workspaces/getWorkspaceInvitations";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { workspaces, workspacesDispatch } = useWorkspacesContext();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const currentUuid = searchParams.get("uuid");
  const router = useRouter();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (session?.accessToken) {
        getWorkspaces(session?.accessToken, workspacesDispatch);
      }
    };

    fetchWorkspaces();
  }, [session?.accessToken, workspacesDispatch]);

  const workspaceNavItems =
    workspaces.workspaces?.member.map((workspace: Workspace) => ({
      title: workspace.label,
      href: `?uuid=${workspace.uuid}`,
    })) || [];

  const selectedWorkspace = workspaces.workspaces?.member?.find((workspace: Workspace) => workspace.uuid === currentUuid) || workspaces.workspaces?.member?.[0];

  useEffect(() => {
    if (selectedWorkspace && !currentUuid) {
      router.push(`?uuid=${selectedWorkspace.uuid}`);
    }

    const workspaceInvitations = async () => {
      if (session?.accessToken) {
        getWorkspaceInvitations(session?.accessToken, workspacesDispatch);
      }
    };

    workspaceInvitations();
  }, [selectedWorkspace, currentUuid, router, session?.accessToken, workspacesDispatch]);

  return (
    <div className="space-y-6 py-10 px-8 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Workspaces</h2>
        <p className="text-muted-foreground">
          Manage and organize your workspaces. Create new collaborative environments, configure access permissions, and streamline your social accounts workflow all in one place.
        </p>
      </div>
      <Separator className="my-6" />

      {workspaces.workspaces && (
        <>
          {workspaces.workspaceInvitations && workspaces.workspaceInvitations.length > 0 && (
            <div className="flex-1 lg:max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Invitations</CardTitle>
                </CardHeader>
                {workspaces && workspaces.workspaceInvitations.map((workspaceInvitation) => <WorkspacesInvitations key={workspaceInvitation.uuid} workspaceInvitation={workspaceInvitation} />)}
              </Card>
            </div>
          )}

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside>
              <WorkspacesSidebarNav items={workspaceNavItems} />
            </aside>
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="flex-1 gap-4 grid">
                {selectedWorkspace && <WorkspacesManage workspace={selectedWorkspace} />}
                {selectedWorkspace && <WorkspacesSocialAccounts workspace={selectedWorkspace} />}
              </div>
              <div className="flex-1">{selectedWorkspace && <WorkspacesMembers workspace={selectedWorkspace} />}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
