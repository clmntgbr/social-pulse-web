"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { toast } from "@/hooks/use-toast";
import { WorkspaceFull } from "@/store/client/interface/workspace-full";
import { getFullWorkspaces } from "@/store/workspaces/getFullWorkspaces";
import { postWorkspaceInvitation } from "@/store/workspaces/postWorkspaceInvitation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import * as Yup from "yup";

type WorkspacesMembersProps = {
  workspace: WorkspaceFull;
};

export const WorkspacesMembers: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { workspacesDispatch } = useWorkspacesContext();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const body = {
        workspaceUuid: workspace.uuid,
        userInvitationEmail: values.email,
      };
      postWorkspaceInvitation(session?.accessToken ?? "", body, workspacesDispatch)
        .then(() => {
          setTimeout(() => {
            getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
            setIsLoading(false);
            formik.resetForm();
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
            setIsLoading(false);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }, 2000);
        });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite people to collaborate</CardTitle>
        <CardDescription> You can invite existing members to collaborate on this workspace, giving them permission to edit and contribute alongside you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="post-workspaces" onSubmit={formik.handleSubmit}>
          <div className="flex space-x-2">
            <Input id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} disabled={isLoading} placeholder="" />
            <Button variant="secondary" className="shrink-0" type="submit" disabled={isLoading}>
              Send invitation
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </form>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">People with access</h4>
          <div className="grid gap-6">
            {workspace &&
              workspace.users.map((user) => (
                <div className="flex items-center justify-between space-x-4" key={crypto.randomUUID()}>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl ?? "https://avatar.vercel.sh/rauchg.png"} />
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium leading-none">
                        {user.givenName} {user.familyName}
                        {session?.user?.id === user.uuid && (
                          <Badge variant="outline" className="ml-1">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Badge>{user.uuid === workspace.admin.uuid ? "Administrator" : "Member"}</Badge>
                </div>
              ))}
          </div>
        </div>
        {workspace && workspace.workspaceInvitations.some((invitation) => invitation.status === "pending") && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Pending invitations</h4>
              <div className="grid gap-6">
                {workspace &&
                  workspace.workspaceInvitations
                    .filter((workspaceInvitation) => workspaceInvitation.status === "pending")
                    .map((workspaceInvitation) => (
                      <div className="flex items-center justify-between space-x-4" key={crypto.randomUUID()}>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={workspaceInvitation.user.avatarUrl ?? "https://avatar.vercel.sh/rauchg.png"} />
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium leading-none">
                              {workspaceInvitation.user.givenName} {workspaceInvitation.user.familyName}
                            </div>
                            <p className="text-sm text-muted-foreground">{workspaceInvitation.user.email}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{workspaceInvitation.status.toLocaleUpperCase()}</Badge>
                      </div>
                    ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
