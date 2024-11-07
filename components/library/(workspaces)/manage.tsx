"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { WorkspaceFull } from "@/store/client/interface/workspace-full";
import { getFullWorkspaces } from "@/store/workspaces/getFullWorkspaces";
import { getWorkspace } from "@/store/workspaces/getWorkspace";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { patchWorkspace } from "@/store/workspaces/patchWorkspace";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ToastFail, ToastSuccess } from "../Toast";

type WorkspacesMembersProps = {
  workspace: WorkspaceFull;
};

export const WorkspacesManage: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const { workspacesDispatch } = useWorkspacesContext();
  const [isLoading, setIsLoading] = useState(false);
  const [file64, setFile64] = useState<string | null>(null);
  const fileRef = useRef(null);

  const handleFileChange = (event: { target: { files: any[] } }) => {
    const selectedFile = event.target.files[0];
    convertToBase64(selectedFile);
  };

  const handleFileClick = () => {
    if (workspace.admin.uuid !== session?.user?.id || isLoading) {
      return;
    }

    if (fileRef) {
      fileRef.current.click();
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
          setTimeout(() => {
            ToastSuccess();
            getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
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

  useEffect(() => {
    setFile64(null);
    formik.setFieldValue("label", workspace.label);
  }, [workspace]);

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{workspace.label}</CardTitle>
          <CardDescription> Update your workspace settings. Set your workspace name and avatar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="post-workspaces" onSubmit={formik.handleSubmit} key={workspace.uuid}>
            <div>
              <Label htmlFor="name" className={`${formik.touched.label && formik.errors.label ? "text-red-800" : ""}`}>
                Name
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
                Logo
              </Label>

              <div className="flex items-center space-x-4">
                <img className="w-24 h-24 object-cover rounded-full " onClick={handleFileClick} src={file64 ?? workspace.logoUrl} alt="Base64 Image" />

                <div>
                  <div className="text-sm font-medium leading-none">
                    <input type="file" hidden ref={fileRef} id="file" name="file" onChange={handleFileChange} className="border border-gray-400 p-2 rounded-md w-full" />
                  </div>
                </div>
              </div>
            </div>
            <p className="italic mt-2 font-extralight from-stone-300 text-sm">You can change the workspace logo by clicking on it</p>
            <Button type="submit" className="mt-5" disabled={workspace.admin.uuid !== session?.user?.id || isLoading}>
              Save
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
