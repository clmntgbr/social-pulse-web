"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { useI18n } from "@/locales/client";
import { Workspace } from "@/store/client/interface/workspace";
import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { deleteWorkspace } from "@/store/workspaces/deleteWorkspace";
import { getWorkspace } from "@/store/workspaces/getWorkspace";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { leaveWorkspace } from "@/store/workspaces/leaveWorkspace";
import { patchWorkspace } from "@/store/workspaces/patchWorkspace";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ToastFail, ToastSuccess } from "../Toast";

type WorkspacesMembersProps = {
  workspace: Workspace;
};

export const WorkspacesManage: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const { workspacesDispatch } = useWorkspacesContext();
  const { socialAccountsDispatch } = useSocialAccountsContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnLeave, setIsLoadingOnLeave] = useState(false);
  const [isLoadingOnDelete, setIsLoadingOnDelete] = useState(false);
  const [file64, setFile64] = useState<string | null>(null);
  const fileRef = useRef<any | null>(null);
  const router = useRouter();
  const t = useI18n();
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    convertToBase64(selectedFile);
  };

  const handleFileClick = () => {
    if (workspace.admin.uuid !== session?.user?.id || isLoading) {
      return;
    }

    if (fileRef) {
      fileRef.current?.click();
    }
  };

  const formik = useFormik({
    initialValues: {
      label: "",
    },
    validationSchema: Yup.object({
      label: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const body = { label: values.label, avatar: file64 };

      patchWorkspace(session?.accessToken ?? "", workspace.uuid, body, workspacesDispatch)
        .then(() => {
          setTimeout(async () => {
            ToastSuccess();
            getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
            getWorkspace(session?.accessToken ?? "", workspacesDispatch);
            setIsLoading(false);
          }, 2000);
        })
        .catch((response) => {
          setTimeout(() => {
            setIsLoading(false);
            ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
          }, 2000);
        });
    },
  });

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setFile64(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const showLeaveDialog = async (event: any) => {
    event.preventDefault();
    setShowDialog(true);
  };

  const showDeleteDialog = async (event: any) => {
    event.preventDefault();
    setShowDialogDelete(true);
  };

  const onDeleteWorkspace = async () => {
    setIsLoadingOnDelete(true);

    deleteWorkspace(session?.accessToken ?? "", workspace.uuid, workspacesDispatch)
      .then(() => {
        setTimeout(async () => {
          ToastSuccess();
          getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          getWorkspace(session?.accessToken ?? "", workspacesDispatch);
          getSocialAccounts(session?.accessToken ?? "", socialAccountsDispatch);
          router.push(`?uuid=`);
          setShowDialog(false);
          setShowDialogDelete(false);
          setIsLoadingOnDelete(false);
        }, 2000);
      })
      .catch((response) => {
        setTimeout(() => {
          setShowDialogDelete(false);
          setIsLoadingOnDelete(false);
          ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
        }, 2000);
      });
  };

  const onLeaveWorkspace = async () => {
    setIsLoadingOnLeave(true);

    leaveWorkspace(session?.accessToken ?? "", workspace.uuid, workspacesDispatch)
      .then(() => {
        setTimeout(async () => {
          ToastSuccess();
          getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          getWorkspace(session?.accessToken ?? "", workspacesDispatch);
          router.push(`?uuid=`);
          setIsLoading(false);
          setShowDialog(false);
          setIsLoadingOnLeave(false);
        }, 2000);
      })
      .catch((response) => {
        setTimeout(() => {
          setIsLoading(false);
          setShowDialog(false);
          setIsLoadingOnLeave(false);
          ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
        }, 2000);
      });
  };

  useEffect(() => {
    setFile64(null);
    formik.setFieldValue("label", workspace.label);
  }, [workspace]);

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{workspace.label}</CardTitle>
          <CardDescription>{t("pages.workspaces.widget.manage.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="post-workspaces" onSubmit={formik.handleSubmit} key={workspace.uuid}>
            <div>
              <Label htmlFor="name" className={`${formik.touched.label && formik.errors.label ? "text-red-800" : ""}`}>
                {t("pages.workspaces.widget.manage.form.name")}
              </Label>
              <Input
                className={`${formik.touched.label && formik.errors.label ? "border-red-500" : ""}`}
                id="label"
                name="label"
                onBlur={formik.handleBlur}
                value={formik.values.label}
                onChange={formik.handleChange}
                disabled={workspace.admin.uuid !== session?.user?.id || isLoading}
              />
            </div>

            <div className="mt-5">
              <Label htmlFor="logo" className={`${formik.touched.label && formik.errors.label ? "text-red-800" : ""}`}>
                {t("pages.workspaces.widget.manage.form.logo")}
              </Label>

              <div className="flex items-center space-x-4">
                <Tooltip>
                  <TooltipTrigger>
                    <>
                      <img className="w-24 h-24 object-cover rounded-full " onClick={handleFileClick} src={file64 ?? workspace.logoUrl} alt="Base64 Image" />
                      <div>
                        <div className="text-sm font-medium leading-none">
                          <input type="file" hidden ref={fileRef} id="file" name="file" onChange={handleFileChange} className="border border-gray-400 p-2 rounded-md w-full" />
                        </div>
                      </div>
                    </>
                  </TooltipTrigger>
                  <TooltipContent side="right">{t("pages.workspaces.widget.manage.form.tips")}</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <Button type="submit" className="mt-5" disabled={workspace.admin.uuid !== session?.user?.id || isLoading}>
                {t("pages.workspaces.widget.manage.form.save")}
                {isLoading && <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />}
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="mt-5" onClick={showLeaveDialog}>
                  {t("pages.workspaces.widget.manage.leave.button")}
                </Button>
                {workspace.admin.uuid === session?.user?.id && (
                  <Button variant="destructive" className="mt-5" onClick={showDeleteDialog}>
                    {t("pages.workspaces.widget.manage.delete.button")}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("pages.workspaces.widget.manage.leave.title", { name: workspace.label })}</DialogTitle>
              <DialogDescription>
                {workspace.admin.uuid === session?.user?.id ? <>{t("pages.workspaces.widget.manage.leave.description.denied")}</> : <>{t("pages.workspaces.widget.manage.leave.description.accept")}</>}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {workspace.admin.uuid !== session?.user?.id && (
                <>
                  <Button type="submit" disabled={isLoadingOnLeave} variant="destructive" onClick={() => setShowDialog(false)}>
                    {t("pages.workspaces.widget.manage.leave.cancel")}
                  </Button>
                  <Button type="submit" disabled={isLoadingOnLeave} onClick={() => onLeaveWorkspace()}>
                    {t("pages.workspaces.widget.manage.leave.confirm")}
                    {isLoadingOnLeave && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showDialogDelete} onOpenChange={setShowDialogDelete}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("pages.workspaces.widget.manage.delete.title", { name: workspace.label })}</DialogTitle>
              <DialogDescription>{t("pages.workspaces.widget.manage.delete.description")}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit" disabled={isLoadingOnDelete} variant="destructive" onClick={() => setShowDialogDelete(false)}>
                {t("pages.workspaces.widget.manage.delete.cancel")}
              </Button>
              <Button type="submit" disabled={isLoadingOnDelete} onClick={() => onDeleteWorkspace()}>
                {t("pages.workspaces.widget.manage.delete.confirm")}
                {isLoadingOnDelete && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};
