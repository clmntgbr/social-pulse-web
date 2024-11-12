import { onFacebookLoginUrl, onLinkedinLoginUrl, onTwitterLoginUrl } from "@/components/loginUrl";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { SocialAccount } from "@/store/client/interface/social-account";
import { deleteSocialAccount } from "@/store/social_accounts/deleteSocialAccount";
import { getSocialAccounts } from "@/store/social_accounts/getSocialAccounts";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowUpDown, ChevronDown, ChevronRight, FileText, RefreshCw, Share2, ThumbsUp, Trash2, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { SocialAccountsLogo } from "../social-accounts-logo";
import { ToastFail, ToastSuccess } from "../Toast";
import SkeletonTable from "./table-skeleton";

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "is_actif":
        return <Badge className="bg-green-500">Actif</Badge>;
      case "expire_soon":
        return <Badge variant="secondary">Expire Soon</Badge>;
      case "is_expired":
        return <Badge variant="destructive">Is Expired</Badge>;
      default:
        return null;
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
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
                <h3 className="font-semibold leading-none tracking-tight text-black text-center">Actions</h3>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <Fragment key={account.uuid}>
                <TableRow key={account.uuid} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => toggleRow(account.uuid)}>
                      {expandedRows.has(account.uuid) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-4">
                      <SocialAccountsLogo username={account.username} avatarUrl={account.avatarUrl} logo={account.socialAccountTypeAvatarUrl} />
                      <div>
                        <div className="text-sm font-medium leading-none">{account.username}</div>
                        <p className="text-sm text-muted-foreground">{account.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">{getStatusBadge(account.status)}</TableCell>
                  <TableCell className="py-4 mx-auto">
                    <div className="flex items-center gap-1 justify-center">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {account.nbOfPosts}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">{formatDate(account.createdAt)}</TableCell>
                  <TableCell className="py-4 ">
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="icon" onClick={() => refresh(account.socialAccountType, account.uuid)}>
                        {isLoading && account.uuid === uuidLoadingOnRefresh ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => removeSocialAccount(account.uuid)} className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        {isLoading && account.uuid === uuidLoadingOnDelete ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows.has(account.uuid) && (
                  <TableRow>
                    <TableCell colSpan={6} className="p-4">
                      <Card className="p-6 border-none">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Analytics Overview</h3>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  Followers
                                </div>
                                <p className="text-2xl font-bold">{formatNumber(12)}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <ThumbsUp className="h-4 w-4" />
                                  Likes
                                </div>
                                <p className="text-2xl font-bold">{formatNumber(23)}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Share2 className="h-4 w-4" />
                                  Shares
                                </div>
                                <p className="text-2xl font-bold">{formatNumber(45)}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Engagement Rate</span>
                                <span className="text-sm font-medium">{28}%</span>
                              </div>
                              <Progress value={28} className="h-2" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Recent Members</h3>
                            <div className="space-y-3">
                              {/* {account.details.recentMembers.map((member) => (
                                <div key={member.id} className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">Joined {formatDate(member.joinedDate)}</p>
                                  </div>
                                </div>
                              ))} */}
                            </div>
                          </div>
                        </div>
                      </Card>
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
