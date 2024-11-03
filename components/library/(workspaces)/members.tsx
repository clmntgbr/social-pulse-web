"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { toast } from "@/hooks/use-toast";
import { WorkspaceFull } from "@/store/client/interface/workspace-full";
import { deleteWorkspaceUser } from "@/store/workspaces/deleteWorkspaceUser";
import { getFullWorkspaces } from "@/store/workspaces/getFullWorkspaces";
import { postWorkspaceInvitation } from "@/store/workspaces/postWorkspaceInvitation";
import { postWorkspacePromote } from "@/store/workspaces/postWorkspacePromote";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { ShieldCheck, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import * as Yup from "yup";

type WorkspacesMembersProps = {
  workspace: WorkspaceFull;
};

export const WorkspacesMembers: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnDelete, setIsLoadingOnDelete] = useState(false);
  const [isLoadingOnPromote, setIsLoadingOnPromote] = useState(false);
  const [uuidLoadingOnDelete, setUuidLoadingOnDelete] = useState("");
  const [uuidLoadingOnPromote, setUuidLoadingOnPromote] = useState("");
  const { workspacesDispatch } = useWorkspacesContext();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUuid, setSelectedUuid] = useState<{ workspaceUuid: string | null; userUuid: string | null }>({
    workspaceUuid: null,
    userUuid: null,
  });

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
          getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          formik.resetForm();
          setTimeout(() => {
            setIsLoading(false);
            toast({
              variant: "destructive",
              title: "Success!",
              description: "Your request was completed successfully.",
              className: "bg-green-700 border-green-700",
            });
          }, 2000);
        })
        .catch((response) => {
          setTimeout(() => {
            setIsLoading(false);
            toast({
              variant: "destructive",
              title: "Something went wrong.",
              description: response.message ?? "There was a problem with your request.",
            });
          }, 2000);
        });
    },
  });

  const removeUser = async (workspaceUuid: string, userUuid: string) => {
    setUuidLoadingOnDelete(userUuid);
    setIsLoadingOnDelete(true);
    deleteWorkspaceUser(session?.accessToken ?? "", workspaceUuid, userUuid, workspacesDispatch)
      .then(() => {
        getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
        setUuidLoadingOnDelete("");
        setTimeout(() => {
          setIsLoadingOnDelete(false);
          toast({
            variant: "destructive",
            title: "Success!",
            description: "Your request was completed successfully.",
            className: "bg-green-700 border-green-700",
          });
        }, 2000);
      })
      .catch((response) => {
        setUuidLoadingOnDelete("");
        setTimeout(() => {
          setIsLoadingOnDelete(false);
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message ?? "There was a problem with your request.",
          });
        }, 2000);
      });
  };

  const promoteUserValidate = async (workspaceUuid: string, userUuid: string) => {
    setSelectedUuid({ workspaceUuid, userUuid });
    setShowDialog(true);
  };

  const promoteUserCancel = async () => {
    setSelectedUuid({ workspaceUuid: null, userUuid: null });
    setShowDialog(false);
  };

  const promoteUser = async () => {
    setUuidLoadingOnPromote(selectedUuid.userUuid ?? "");
    setIsLoadingOnPromote(true);
    postWorkspacePromote(session?.accessToken ?? "", selectedUuid.workspaceUuid ?? "", selectedUuid.userUuid ?? "", workspacesDispatch)
      .then(() => {
        getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
        setUuidLoadingOnPromote("");
        setSelectedUuid({ workspaceUuid: null, userUuid: null });
        setTimeout(() => {
          setIsLoadingOnPromote(false);
          setShowDialog(false);
          toast({
            variant: "destructive",
            title: "Success!",
            description: "Your request was completed successfully.",
            className: "bg-green-700 border-green-700",
          });
        }, 2000);
      })
      .catch(() => {
        setUuidLoadingOnPromote("");
        setTimeout((response) => {
          setIsLoadingOnPromote(false);
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message ?? "There was a problem with your request.",
          });
        }, 2000);
      });
  };

  return (
    <>
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
                    <div className="flex gap-3">
                      <Badge>{user.uuid === workspace.admin.uuid ? "Administrator" : "Member"}</Badge>
                      {session?.user?.id === workspace.admin.uuid && user.uuid !== workspace.admin.uuid && (
                        <>
                          <Badge className="cursor-pointer" variant="destructive" onClick={() => removeUser(workspace.uuid, user.uuid)}>
                            {isLoadingOnDelete && user.uuid === uuidLoadingOnDelete ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                          </Badge>
                          <Badge className="cursor-pointer" variant="outline" onClick={() => promoteUserValidate(workspace.uuid, user.uuid)}>
                            {isLoadingOnPromote && user.uuid === uuidLoadingOnPromote ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <ShieldCheck size={16} />}
                          </Badge>
                        </>
                      )}
                    </div>
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Promote User to Administrator</DialogTitle>
            <DialogDescription>
              You will lose your administrator status and grant this user administrator rights to manage workspace settings and members. Confirm this action to provide them with advanced access and
              management privileges.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" variant="destructive" disabled={isLoadingOnPromote} onClick={() => promoteUserCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoadingOnPromote} onClick={promoteUser}>
              Confirm {isLoadingOnPromote && <ReloadIcon className="h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
