"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { WorkspaceInvitation } from "@/store/client/interface/workspace-invitation";
import { getWorkspaceInvitations } from "@/store/workspaces/getWorkspaceInvitations";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { patchWorkspaceInvitation } from "@/store/workspaces/patchWorkspaceInvitation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ToastFail, ToastSuccess } from "../Toast";

type WorkspaceInvitationsProps = {
  workspaceInvitation: WorkspaceInvitation;
};

export const WorkspacesInvitations: React.FC<WorkspaceInvitationsProps> = ({ workspaceInvitation }) => {
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isLoadingDecline, setIsLoadingDecline] = useState(false);
  const { data: session } = useSession();
  const { workspacesDispatch } = useWorkspacesContext();

  const acceptWorkspaceInvitation = async () => {
    setIsLoadingAccept(true);
    patchWorkspaceInvitation(session?.accessToken ?? "", workspaceInvitation.uuid, { status: "accepted" }, workspacesDispatch)
      .then(() => {
        setTimeout(() => {
          ToastSuccess();
          getWorkspaceInvitations(session?.accessToken ?? "", workspacesDispatch);
          getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          setIsLoadingAccept(false);
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoadingAccept(false);
          ToastFail("Something went wrong.", "There was a problem with your request.");
        }, 2000);
      });
  };

  const declineWorkspaceInvitation = async () => {
    setIsLoadingDecline(true);
    patchWorkspaceInvitation(session?.accessToken ?? "", workspaceInvitation.uuid, { status: "denied" }, workspacesDispatch)
      .then(() => {
        setTimeout(() => {
          getWorkspaceInvitations(session?.accessToken ?? "", workspacesDispatch);
          getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          setIsLoadingAccept(false);
          ToastSuccess();
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoadingAccept(false);
          ToastFail("Something went wrong.", "There was a problem with your request.");
        }, 2000);
      });
  };

  return (
    <CardContent>
      {workspaceInvitation && <></>}
      <div className="space-y-4">
        <div className="grid gap-6">
          <div className="flex items-center justify-between space-x-4" key={crypto.randomUUID()}>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={workspaceInvitation.workspace.logoUrl ?? "https://avatar.vercel.sh/rauchg.png"} />
              </Avatar>
              <div>
                <div className="text-sm font-medium leading-none">{workspaceInvitation.workspace.label}</div>
                <p className="text-sm text-muted-foreground">
                  Invited by {workspaceInvitation.createdBy.givenName} {workspaceInvitation.createdBy.familyName}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant={"destructive"} disabled={isLoadingAccept || isLoadingDecline} onClick={declineWorkspaceInvitation}>
                Decline
                {isLoadingDecline && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
              <Button variant={"secondary"} disabled={isLoadingAccept || isLoadingDecline} onClick={acceptWorkspaceInvitation}>
                Accept
                {isLoadingAccept && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
};
