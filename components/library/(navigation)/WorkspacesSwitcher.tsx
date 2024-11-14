"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useUserContext from "@/contexts/users/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { cn } from "@/lib/utils";
import { useI18n } from "@/locales/client";
import { imageBase64 } from "@/public/imageBase64";
import { Workspace } from "@/store/client/interface/workspace";
import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { patchUserWorkspace } from "@/store/users/patchUserWorkspace";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { postWorkspaces } from "@/store/workspaces/postWorkspaces";
import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { DiamondPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ToastFail, ToastSuccess } from "../Toast";

export default function WorkspacesSwitcher() {
  const { workspaces, workspacesDispatch } = useWorkspacesContext();
  const { userDispatch } = useUserContext();
  const { socialAccounts, socialAccountsDispatch } = useSocialAccountsContext();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const t = useI18n();
  const [file64, setFile64] = useState<string>(imageBase64);
  const fileRef = useRef<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>();

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

      postWorkspaces(session?.accessToken ?? "", body, workspacesDispatch)
        .then(() => {
          setTimeout(() => {
            getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
            setIsLoading(false);
            setShowNewWorkspaceDialog(false);
            ToastSuccess();
            setFile64(imageBase64);
            formik.resetForm();
          }, 2000);
        })
        .catch((response) => {
          setTimeout(() => {
            ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
            setIsLoading(false);
          }, 2000);
        });
    },
  });

  const onPatchUserWorkspace = async (workspace: Workspace) => {
    setOpen(false);
    setSelectedWorkspace(workspace);
    patchUserWorkspace(session?.accessToken ?? "", { workspaceUuid: workspace.uuid }, userDispatch)
      .then(() => {
        getSocialAccounts(session?.accessToken ?? "", socialAccountsDispatch);
      })
      .catch(() => {
        ToastFail("Something went wrong.", "There was a problem with your request.");
      });
  };

  useEffect(() => {
    if (workspaces.workspace) {
      setSelectedWorkspace(workspaces.workspace);
    }
  }, [workspaces.workspace]);

  useEffect(() => {
    if (!selectedWorkspace) {
      setSelectedWorkspace(workspaces.workspace);
    }
  }, [selectedWorkspace, workspaces.workspace]);

  if (!workspaces || !workspaces.workspace || !workspaces.workspaces) {
    return null;
  }

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setFile64(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    convertToBase64(selectedFile);
  };

  const handleFileClick = () => {
    if (fileRef) {
      fileRef.current?.click();
    }
  };

  if (!socialAccounts || !socialAccounts.socialAccounts || !workspaces || !workspaces.workspaces) {
    return null;
  }

  return (
    <Dialog open={showNewWorkspaceDialog} onOpenChange={setShowNewWorkspaceDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className={cn("min-w-[250px] justify-between font-semibold")}>
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={selectedWorkspace?.logoUrl} alt={selectedWorkspace?.label} />
              <AvatarFallback>{selectedWorkspace?.label}</AvatarFallback>
            </Avatar>
            {selectedWorkspace?.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>{t("navigation.workspace.empty")}</CommandEmpty>
              <CommandGroup heading="Workspaces">
                {workspaces.workspaces?.member.map((workspace: Workspace) => (
                  <CommandItem
                    value={workspace.uuid}
                    key={workspace.uuid}
                    onSelect={() => {
                      onPatchUserWorkspace(workspace);
                    }}
                    className="text-sm font-light px-4"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage src={workspace.logoUrl} alt={workspace.label} />
                      <AvatarFallback>{workspace.label}</AvatarFallback>
                    </Avatar>
                    {workspace.label}
                    <CheckIcon className={cn("ml-auto h-4 w-4", selectedWorkspace?.uuid === workspace.uuid ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    className="text-sm font-semibold text-slate-500 px-4"
                    onSelect={() => {
                      setOpen(false);
                      setShowNewWorkspaceDialog(true);
                    }}
                  >
                    <DiamondPlus className="h-8 w-8" />
                    {t("navigation.workspace.create.button")}
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <form className="post-workspaces" onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("navigation.workspace.create.title")}</DialogTitle>
            <DialogDescription>{t("navigation.workspace.create.description")}</DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
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
                      <Image src={file64} alt="Base64 Image" onClick={handleFileClick} className="w-24 h-24 object-cover rounded-full" width={96} height={96} />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewWorkspaceDialog(false)}>
              {t("navigation.workspace.create.form.cancel")}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {t("navigation.workspace.create.form.confirm")}
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
