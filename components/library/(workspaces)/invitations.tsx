"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { toast } from "@/hooks/use-toast";
import { WorkspaceInvitationFull } from "@/store/client/interface/workspace-invitation-full";
import { getFullWorkspaces } from "@/store/workspaces/getFullWorkspaces";
import { getWorkspaceInvitations } from "@/store/workspaces/getWorkspaceInvitations";
import { patchWorkspaceInvitation } from "@/store/workspaces/patchWorkspaceInvitation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type WorkspaceInvitationsProps = {
  workspaceInvitation: WorkspaceInvitationFull;
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
          getWorkspaceInvitations(session?.accessToken ?? "", workspacesDispatch);
          getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          setIsLoadingAccept(false);
          toast({
            variant: "destructive",
            title: "Success!",
            description: "Your request was completed successfully.",
            className: "bg-green-700 border-green-700",
          });
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoadingAccept(false);
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }, 2000);
      });
  };

  const declineWorkspaceInvitation = async () => {
    setIsLoadingDecline(true);
    patchWorkspaceInvitation(session?.accessToken ?? "", workspaceInvitation.uuid, { status: "denied" }, workspacesDispatch)
      .then(() => {
        setTimeout(() => {
          getWorkspaceInvitations(session?.accessToken ?? "", workspacesDispatch);
          getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          setIsLoadingAccept(false);
          toast({
            variant: "destructive",
            title: "Success!",
            description: "Your request was completed successfully.",
            className: "bg-green-700 border-green-700",
          });
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoadingAccept(false);
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
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
