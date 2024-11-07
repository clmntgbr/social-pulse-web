"use client";

import { onFacebookLoginUrl, onLinkedinLoginUrl, onTwitterLoginUrl } from "@/components/loginUrl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { WorkspaceFull } from "@/store/client/interface/workspace-full";
import { deleteSocialAccount } from "@/store/social_accounts/deleteSocialAccount";
import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { getFullWorkspaces } from "@/store/workspaces/getFullWorkspaces";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RefreshCw, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { SocialAccountsLogo } from "../SocialAccountsLogo";
import { ToastFail, ToastSuccess } from "../Toast";

type WorkspacesMembersProps = {
  workspace: WorkspaceFull;
};

export const WorkspacesSocialAccounts: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [uuidLoadingOnDelete, setUuidLoadingOnDelete] = useState("");
  const { socialAccountsDispatch } = useSocialAccountsContext();
  const { workspacesDispatch } = useWorkspacesContext();

  const refresh = async (type: string) => {
    if (isLoading) {
      return;
    }

    switch (type) {
      case "facebook_social_account":
        await onFacebookLoginUrl(session?.accessToken ?? "", pathname, socialAccountsDispatch, router);
        break;
      case "linkedin_social_account":
        await onLinkedinLoginUrl(session?.accessToken ?? "", pathname, socialAccountsDispatch, router);
        break;
      case "twitter_social_account":
        await onTwitterLoginUrl(session?.accessToken ?? "", pathname, socialAccountsDispatch, router);
        break;
      default:
        ToastFail("Unsupported platform", "The specified platform type is not supported.");
    }
  };

  const removeSocialAccount = async (socialAccountUuid: string) => {
    if (isLoading) {
      return;
    }

    setUuidLoadingOnDelete(socialAccountUuid);
    setIsLoading(true);
    deleteSocialAccount(session?.accessToken ?? "", socialAccountUuid, socialAccountsDispatch)
      .then(() => {
        setTimeout(() => {
          getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          getSocialAccounts(session?.accessToken ?? "", socialAccountsDispatch);
          setIsLoading(false);
          ToastSuccess();
        }, 2000);
      })
      .catch((response) => {
        setTimeout(() => {
          setIsLoading(false);
          ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
        }, 2000);
      });
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Social Accounts</CardTitle>
          <CardDescription>
            Connect and manage your social media accounts to streamline your content publishing. Link platforms like Twitter, LinkedIn, and Instagram to post directly from this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {workspace.socialAccounts.filter((socialAccount) => socialAccount.status !== "temporary").length === 0 ? (
              <p className="italic mt-2 font-extralight from-stone-300 text-sm">No social accounts available</p>
            ) : (
              workspace.socialAccounts
                .filter((socialAccount) => socialAccount.status !== "temporary")
                .map((socialAccount) => (
                  <div className="flex items-center justify-between space-x-4" key={socialAccount.uuid}>
                    <div className="flex items-center space-x-4">
                      <SocialAccountsLogo username={socialAccount.username} avatarUrl={socialAccount.avatarUrl} logo={socialAccount.socialAccountTypeAvatarUrl} />
                      <div>
                        <div className="text-sm font-medium leading-none">{socialAccount.username}</div>
                        <p className="text-sm text-muted-foreground">{socialAccount.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <>
                        <Badge className="cursor-pointer" variant="destructive" onClick={() => removeSocialAccount(socialAccount.uuid)}>
                          {isLoading && socialAccount.uuid === uuidLoadingOnDelete ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                        </Badge>
                        <Badge className="cursor-pointer" variant="outline" onClick={() => refresh(socialAccount.socialAccountType)}>
                          <RefreshCw size={16} />
                        </Badge>
                      </>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
