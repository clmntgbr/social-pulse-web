"use client";

import { WorkspacesMembers } from "@/components/library/(workspaces)/members";
import { WorkspacesSidebarNav } from "@/components/library/(workspaces)/sidebar-nav.";
import { Separator } from "@/components/ui/separator";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { WorkspaceFull } from "@/store/client/interface/workspace-full";
import { getFullWorkspaces } from "@/store/workspaces/getFullWorkspaces";
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
    const getWorkspaces = async () => {
      if (session?.accessToken) {
        getFullWorkspaces(session?.accessToken, workspacesDispatch);
      }
    };

    getWorkspaces();
  }, [session?.accessToken, workspacesDispatch]);

  const workspaceNavItems =
    workspaces.fullWorkspaces?.member.map((workspace: WorkspaceFull) => ({
      title: workspace.label,
      href: `?uuid=${workspace.uuid}`,
    })) || [];

  const selectedWorkspace = workspaces.fullWorkspaces?.member?.find((workspace: WorkspaceFull) => workspace.uuid === currentUuid) || workspaces.fullWorkspaces?.member?.[0];

  useEffect(() => {
    if (selectedWorkspace && !currentUuid) {
      router.push(`?uuid=${selectedWorkspace.uuid}`);
    }
  }, [selectedWorkspace, currentUuid, router]);

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Workspaces</h2>
          <p className="text-muted-foreground">
            Manage and organize your workspaces. Create new collaborative environments, configure access permissions, and streamline your social accounts workflow all in one place.
          </p>
        </div>
        <Separator className="my-6" />

        {workspaces.fullWorkspaces && (
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <WorkspacesSidebarNav items={workspaceNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{selectedWorkspace && <WorkspacesMembers workspace={selectedWorkspace} />}</div>
          </div>
        )}
      </div>
    </>
  );
}
