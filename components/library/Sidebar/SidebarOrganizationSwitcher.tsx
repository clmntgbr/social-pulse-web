"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { compressImage } from "@/composables/ConvertFileToBase64";
import useOrganizationsContext from "@/contexts/organizations/hooks";
import usePublicationsContext from "@/contexts/publications/hooks";
import useSocialNetworksContext from "@/contexts/social-networks/hooks";
import useUserContext from "@/contexts/users/hooks";
import { cn } from "@/lib/utils";
import { imageBase64 } from "@/public/imageBase64";
import { Organization } from "@/store/client/interface/organization";
import { postOrganizations } from "@/store/organizations/postOrganizations";
import { getPublications } from "@/store/publications/getPublications";
import { getSocialNetworks } from "@/store/social-networks/getSocialNetworks";
import { patchUserActiveOrganization } from "@/store/users/patchUserActiveOrganization";
import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ToastFail, ToastSuccess } from "../Toast";

export default function SidebarOrganizationSwitcher() {
  const { userDispatch } = useUserContext();
  const { organizations, organizationsDispatch } = useOrganizationsContext();
  const { socialNetworks, socialNetworksDispatch } = useSocialNetworksContext();
  const { publicationsDispatch } = usePublicationsContext();
  const [open, setOpen] = useState(false);
  const { data } = useSession();
  const [file64, setFile64] = useState<string>(imageBase64);
  const fileRef = useRef<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewOrganizationDialog, setShowNewOrganizationDialog] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: async () => {},
  });

  const onPostOrganization = async () => {
    if (formik.errors["name"]) {
      return;
    }

    setIsLoading(true);

    const body = { name: formik.values.name, logo: file64 };
    postOrganizations(`${data?.accessToken}`, body, organizationsDispatch)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          setShowNewOrganizationDialog(false);
          ToastSuccess();
          setFile64(imageBase64);
          formik.resetForm();
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoading(false);
          ToastFail("Something went wrong.", "There was a problem with your request.");
        }, 2000);
      });
  };

  useEffect(() => {
    if (organizations.organization) {
      setSelectedOrganization(organizations.organization);
    }
  }, [organizations.organization]);

  useEffect(() => {
    if (!selectedOrganization) {
      setSelectedOrganization(organizations.organization);
    }
  }, [selectedOrganization, organizations.organization]);

  if (!organizations || !organizations.organization || !organizations.organizations) {
    return null;
  }

  const onChangeActiveOrganization = async (organization: Organization) => {
    setOpen(false);

    patchUserActiveOrganization(`${data?.accessToken}`, organization.uuid, userDispatch)
      .then(() => {
        getSocialNetworks(`${data?.accessToken}`, socialNetworksDispatch);
        getPublications(`${data?.accessToken}`, publicationsDispatch);
      })
      .catch(() => {
        ToastFail("Something went wrong.", "There was a problem with your request.");
      });

    setSelectedOrganization(organization);
  };

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    const image = await compressImage(selectedFile);
    setFile64(image as string);
  };

  const handleFileClick = () => {
    if (fileRef) {
      fileRef.current?.click();
    }
  };

  if (!socialNetworks || !socialNetworks.socialNetworks || !organizations || !organizations.organizations) {
    return null;
  }

  return (
    <Dialog open={showNewOrganizationDialog} onOpenChange={setShowNewOrganizationDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className={cn("min-w-[250px] justify-between font-semibold")}>
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={selectedOrganization?.logoUrl} alt={selectedOrganization?.name} />
              <AvatarFallback>{selectedOrganization?.name}</AvatarFallback>
            </Avatar>
            <span className="overflow-hidden">{selectedOrganization?.name}</span>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>navigation.organization.empty</CommandEmpty>
              <CommandGroup heading="Organizations">
                {organizations.organizations?.map((organization: Organization) => (
                  <CommandItem
                    value={organization.uuid}
                    key={organization.uuid}
                    onSelect={() => {
                      onChangeActiveOrganization(organization);
                    }}
                    className="text-sm font-normal px-4 cursor-pointer"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage src={organization.logoUrl} alt={organization.name} />
                      <AvatarFallback>{organization.name}</AvatarFallback>
                    </Avatar>
                    {organization.name}
                    <CheckIcon className={cn("ml-auto h-4 w-4", selectedOrganization?.uuid === organization.uuid ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    className="text-sm font-normal px-4 cursor-pointer"
                    onSelect={() => {
                      setOpen(false);
                      setShowNewOrganizationDialog(true);
                    }}
                  >
                    <Plus className="h-8 w-8" />
                    Create an organization
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <form className="post-organizations" onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Your Organization</DialogTitle>
            <DialogDescription>
              Start collaborating by creating an organization. You will be able to invite team members once it is set up.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <Label className={`${formik.touched.name && formik.errors.name ? "text-red-800" : ""}`}>Name</Label>
              <Input
                className={`${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-5">
              <Label>Logo</Label>
              <div className="flex items-center space-x-4">
                <Tooltip>
                  <TooltipTrigger>
                    <>
                      <Image
                        src={file64}
                        alt="Base64 Image"
                        onClick={handleFileClick}
                        className="w-24 h-24 object-cover rounded-full"
                        width={96}
                        height={96}
                      />
                      <div>
                        <div className="text-sm font-medium leading-none">
                          <input
                            type="file"
                            hidden
                            ref={fileRef}
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            className="border border-gray-400 p-2 rounded-md w-full"
                          />
                        </div>
                      </div>
                    </>
                  </TooltipTrigger>
                  <TooltipContent side="right">You can change the logo organization by clicking on it.</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewOrganizationDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} onClick={() => onPostOrganization()}>
              Confirm
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
