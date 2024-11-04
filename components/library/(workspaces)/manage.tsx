"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { toast } from "@/hooks/use-toast";
import { WorkspaceFull } from "@/store/client/interface/workspace-full";
import { getFullWorkspaces } from "@/store/workspaces/getFullWorkspaces";
import { getWorkspace } from "@/store/workspaces/getWorkspace";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { patchWorkspace } from "@/store/workspaces/patchWorkspace";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

type WorkspacesMembersProps = {
  workspace: WorkspaceFull;
};

export const WorkspacesManage: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const { workspacesDispatch } = useWorkspacesContext();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      label: "",
    },
    validationSchema: Yup.object({
      label: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      patchWorkspace(session?.accessToken ?? "", workspace.uuid, { label: values.label }, workspacesDispatch)
        .then(() => {
          setTimeout(() => {
            getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
            getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
            getWorkspace(session?.accessToken ?? "", workspacesDispatch);
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

  useEffect(() => {
    formik.setFieldValue("label", workspace.label);
  }, [formik, workspace]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{workspace.label}</CardTitle>
          <CardDescription> Update your workspace settings. Set your workspace name and avatar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="post-workspaces" onSubmit={formik.handleSubmit} key={workspace.uuid}>
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
            <Button type="submit" className="mt-3" disabled={workspace.admin.uuid !== session?.user?.id || isLoading}>
              Save
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
