"use client";

import { onFacebookLoginUrl, onLinkedinLoginUrl, onTwitterLoginUrl } from "@/components/loginUrl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { useI18n } from "@/locales/client";
import { Workspace } from "@/store/client/interface/workspace";
import { deleteSocialAccount } from "@/store/social_accounts/deleteSocialAccount";
import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RefreshCw, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { SocialAccountsLogo } from "../social-accounts-logo";
import { ToastFail, ToastSuccess } from "../Toast";

type WorkspacesMembersProps = {
  workspace: Workspace;
};

export const WorkspacesSocialAccounts: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [uuidLoadingOnDelete, setUuidLoadingOnDelete] = useState("");
  const [uuidLoadingOnRefresh, setUuidLoadingOnRefresh] = useState("");
  const { socialAccountsDispatch } = useSocialAccountsContext();
  const { workspacesDispatch } = useWorkspacesContext();

  const refresh = async (type: string, socialAccountUuid: string) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setUuidLoadingOnRefresh(socialAccountUuid);

    switch (type) {
      case "facebook_social_account":
        await onFacebookLoginUrl(session?.accessToken ?? "", pathname.concat("?uuid=").concat(workspace.uuid), socialAccountsDispatch, router);
        break;
      case "linkedin_social_account":
        await onLinkedinLoginUrl(session?.accessToken ?? "", pathname.concat("?uuid=").concat(workspace.uuid), socialAccountsDispatch, router);
        break;
      case "twitter_social_account":
        await onTwitterLoginUrl(session?.accessToken ?? "", pathname.concat("?uuid=").concat(workspace.uuid), socialAccountsDispatch, router);
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
          getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
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
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle>{t("pages.workspaces.widget.socialAccount.title")}</CardTitle>
          <CardDescription>{t("pages.workspaces.widget.socialAccount.description")} </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {workspace.socialAccounts.filter((socialAccount) => socialAccount.status !== "temporary").length === 0 ? (
              <p className="italic mt-2 font-extralight from-stone-300 text-sm">{t("pages.workspaces.widget.socialAccount.none")}</p>
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
                        <Button variant="outline" size="icon" onClick={() => refresh(socialAccount.socialAccountType, socialAccount.uuid)}>
                          {isLoading && socialAccount.uuid === uuidLoadingOnRefresh ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeSocialAccount(socialAccount.uuid)}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          {isLoading && socialAccount.uuid === uuidLoadingOnDelete ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                        </Button>
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
