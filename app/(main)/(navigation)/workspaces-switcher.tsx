"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ToastAction } from "@/components/ui/toast";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useUserContext from "@/contexts/users/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Workspace } from "@/store/client/interface/workspace";
import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { patchUserWorkspace } from "@/store/users/patchUserWorkspace";
import { postWorkspaces } from "@/store/workspaces/postWorkspaces";
import { useAuth } from "@clerk/nextjs";
import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { DiamondPlus } from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function WorkspacesSwitcher() {
  const { workspaces, workspacesDispatch } = useWorkspacesContext();
  const { userDispatch } = useUserContext();
  const { socialAccountsDispatch } = useSocialAccountsContext();
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const token = await getToken();
      postWorkspaces(`${token}`, { label: values.name, logoUrl: "https://avatar.vercel.sh/rauchg.png" }, workspacesDispatch)
        .then(() => {
          setTimeout(() => {
            setIsLoading(false);
            setShowNewWorkspaceDialog(false);
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
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        });
    },
  });

  const onPatchUserWorkspace = async (workspace: Workspace) => {
    setOpen(false);
    setSelectedWorkspace(workspace);

    const token = await getToken();
    patchUserWorkspace(`${token}`, { workspaceUuid: workspace.uuid }, userDispatch)
      .then(() => {
        getSocialAccounts(`${token}`, socialAccountsDispatch);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  useEffect(() => {
    if (!selectedWorkspace) {
      setSelectedWorkspace(workspaces.workspace);
    }
  }, [selectedWorkspace, workspaces.workspace]);

  if (!workspaces || !workspaces.workspace || !workspaces.workspaces || !workspaces.workspaces.member?.length) {
    return null;
  }

  return (
    <Dialog open={showNewWorkspaceDialog} onOpenChange={setShowNewWorkspaceDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} aria-label="Select a workspace" className={cn("min-w-[250px] justify-between font-semibold")}>
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={`https://avatar.vercel.sh/${selectedWorkspace?.uuid}.png`} alt={selectedWorkspace?.label} />
              <AvatarFallback>{selectedWorkspace?.label}</AvatarFallback>
            </Avatar>
            {selectedWorkspace?.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No workspace found.</CommandEmpty>
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
                      <AvatarImage src={`https://avatar.vercel.sh/${workspace.uuid}.png`} alt={workspace.label} />
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
                    Create a workspace
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
            <DialogTitle>Create a Workspace</DialogTitle>
            <DialogDescription>Add a new workspace to manage social accounts & posts.</DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={`${formik.touched.name && formik.errors.name ? "text-red-800" : ""}`}>
                  Workspace name*
                </Label>
                <Input
                  className={`${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  disabled={isLoading}
                  placeholder="Acme Inc."
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewWorkspaceDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Continue
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
