import { onFacebookLoginUrl, onLinkedinLoginUrl, onTwitterLoginUrl } from "@/components/loginUrl";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { useCurrentLocale } from "@/locales/client";
import { SocialAccount } from "@/store/client/interface/social-account";
import { deleteSocialAccount } from "@/store/social_accounts/deleteSocialAccount";
import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowUpDown, ChevronDown, ChevronRight, FileText, RefreshCw, ThumbsUp, Trash2, UserCheck, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BadgeDefault } from "../badge/BadgeDefault";
import { BadgeError } from "../badge/BadgeError";
import { BadgeSuccess } from "../badge/BadgeSuccess";
import { BadgeWarning } from "../badge/BadgeWarning";
import { SocialAccountsLogo } from "../SocialAccountsLogo";
import { ToastFail, ToastSuccess } from "../Toast";
import SkeletonTable from "./TableSkeleton";

export function SocialAccountsTable() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { socialAccounts, socialAccountsDispatch } = useSocialAccountsContext();
  const { workspacesDispatch } = useWorkspacesContext();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [uuidLoadingOnDelete, setUuidLoadingOnDelete] = useState("");
  const [uuidLoadingOnRefresh, setUuidLoadingOnRefresh] = useState("");
  const locale = useCurrentLocale();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SocialAccount;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  useEffect(() => {
    if (socialAccounts && socialAccounts?.socialAccounts) {
      setAccounts(socialAccounts?.socialAccounts?.member);
    }
  }, [socialAccounts]);

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const getSocialAccountStatus = (status: string) => {
    switch (status) {
      case "is_actif":
        return <BadgeSuccess label="socialAccounts.status.is_actif" />;
      case "expire_soon":
        return <BadgeWarning label="socialAccounts.status.expire_soon" />;
      case "is_expired":
        return <BadgeError label="socialAccounts.status.is_expired" />;
      default:
        return null;
    }
  };

  const getPostStatus = (status: string) => {
    switch (status) {
      case "posted":
        return <BadgeSuccess label="posts.status.posted" />;
      case "programmed":
        return <BadgeWarning label="posts.status.programmed" />;
      case "failed":
        return <BadgeError label="posts.status.failed" />;
      default:
        return <BadgeDefault label="posts.status.draft" />;
    }
  };

  const handleSort = (key: keyof SocialAccount) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedAccounts = [...accounts].sort((a, b) => {
      if (!a[key] || !b[key]) {
        return 0;
      }

      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setAccounts(sortedAccounts);
  };

  const refresh = async (type: string, socialAccountUuid: string) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setUuidLoadingOnRefresh(socialAccountUuid);

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

  const formatDateWithTime = (date: string) => {
    const dateObj = new Date(date);
    return (
      dateObj.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " à " +
      dateObj.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredAccounts = accounts.filter((account) => account.name.toLowerCase());

  if (!socialAccounts.socialAccounts) {
    return <SkeletonTable />;
  }

  if (socialAccounts.socialAccounts.totalItems <= 0) {
    return (
      <Alert className="bg-orange-100 text-orange-800 border border-orange-300">
        <AlertDescription className="font-light">You currently have no social accounts connected. Please connect a social account to start sharing and engaging with your audience.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead className="w-[300px] py-4">
                <h3 className="font-semibold leading-none tracking-tight text-black text-center">Account</h3>
              </TableHead>
              <TableHead className="py-4">
                <Button variant="ghost" onClick={() => handleSort("status")} className="mx-auto flex items-center gap-1 font-semibold leading-none tracking-tight text-black text-center">
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="py-4">
                <Button variant="ghost" onClick={() => handleSort("nbOfPosts")} className="mx-auto flex items-center gap-1 font-semibold leading-none tracking-tight text-black text-center">
                  Posts
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="py-4">
                <Button variant="ghost" onClick={() => handleSort("createdAt")} className="mx-auto flex items-center gap-1 font-semibold leading-none tracking-tight text-black text-center">
                  Created At
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="py-4">
                <Button variant="ghost" onClick={() => handleSort("updatedAt")} className="mx-auto flex items-center gap-1 font-semibold leading-none tracking-tight text-black text-center">
                  Updated At
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="py-4">
                <h3 className="font-semibold leading-none tracking-tight text-black text-center">Actions</h3>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <Fragment key={account.uuid}>
                <TableRow key={account.uuid} className="cursor-pointer hover:bg-muted/50 transition-transform duration-200">
                  <TableCell onClick={() => toggleRow(account.uuid)}>
                    <Button variant="ghost" size="icon" onClick={() => toggleRow(account.uuid)}>
                      {expandedRows.has(account.uuid) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell className="py-4" onClick={() => toggleRow(account.uuid)}>
                    <div className="flex items-center space-x-4">
                      <SocialAccountsLogo username={account.username} avatarUrl={account.avatarUrl} logo={account.socialAccountTypeAvatarUrl} />
                      <div>
                        <div className="text-sm font-medium leading-none">{account.username}</div>
                        <p className="text-sm text-muted-foreground">{account.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center" onClick={() => toggleRow(account.uuid)}>
                    {getSocialAccountStatus(account.status)}
                  </TableCell>
                  <TableCell className="py-4 mx-auto" onClick={() => toggleRow(account.uuid)}>
                    <div className="flex items-center gap-1 justify-center">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {account.nbOfPosts}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center" onClick={() => toggleRow(account.uuid)}>
                    {formatDate(account.createdAt)}
                  </TableCell>
                  <TableCell className="py-4 text-center" onClick={() => toggleRow(account.uuid)}>
                    {formatDate(account.updatedAt)}
                  </TableCell>
                  <TableCell className="py-4 " onClick={() => toggleRow(account.uuid)}>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" className="z-50" size="icon" onClick={() => refresh(account.socialAccountType, account.uuid)}>
                        {isLoading && account.uuid === uuidLoadingOnRefresh ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => removeSocialAccount(account.uuid)} className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        {isLoading && account.uuid === uuidLoadingOnDelete ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows.has(account.uuid) && (
                  <TableRow className="transition-all duration-200 ease-in-out hover:bg-white">
                    <TableCell colSpan={6} className="p-4 transition-all duration-200 ease-in-out">
                      <div className="p-6 border-none">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Analytics Overview</h3>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <UserCheck className="h-4 w-4" />
                                  Followers
                                </div>
                                <p className="text-2xl font-bold">{account.followersCount ?? "~"}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  Followings
                                </div>
                                <p className="text-2xl font-bold">{account.followingCount ?? "~"}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <ThumbsUp className="h-4 w-4" />
                                  Likes
                                </div>
                                <p className="text-2xl font-bold">{account.likeCount ?? "~"}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Recently created posts</h3>
                            <div className="space-y-3">
                              {account.recentPosts.length <= 0 && <p className="italic mt-2 font-extralight from-stone-300 text-sm">You didnt posted yet.</p>}
                              {account.recentPosts.map((post) => (
                                <Link href={`/${locale}/posts/${post.uuid}/show`} key={post.uuid}>
                                  <Card className="flex items-center gap-3 bg-white hover:bg-slate-100 border-none shadow-none p-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={post.pictures[0] ?? "https://avatar.vercel.sh/personal.png"} alt={post.header ?? post.uuid} />
                                    </Avatar>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">{post.header}</p>
                                      <div className="flex items-center justify-start gap-3">
                                        <p className="text-xs text-muted-foreground">{formatDateWithTime(post.postAt)}</p>
                                        {getPostStatus(post.status)}
                                      </div>
                                    </div>
                                  </Card>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
