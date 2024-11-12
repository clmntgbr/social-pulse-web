import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import { ArrowUpDown, ChevronDown, ChevronRight, Facebook, FileText, Linkedin, RefreshCw, Share2, ThumbsUp, Trash2, Twitter, Users } from "lucide-react";
import { Fragment, useState } from "react";

type SocialAccount = {
  id: string;
  platform: "facebook" | "twitter" | "linkedin";
  name: string;
  avatar: string;
  status: "active" | "pending" | "error";
  posts: number;
  createdAt: string;
  details: {
    followers: number;
    following: number;
    likes: number;
    shares: number;
    views: number;
    engagement: number;
    recentMembers: Array<{
      id: string;
      name: string;
      avatar: string;
      joinedDate: string;
    }>;
  };
};

const initialAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "facebook",
    name: "Tech Company Page",
    avatar: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&fit=crop&crop=faces",
    status: "active",
    posts: 1234,
    createdAt: "2023-01-15T10:30:00",
    details: {
      followers: 15420,
      following: 892,
      likes: 45200,
      shares: 2340,
      views: 128900,
      engagement: 78,
      recentMembers: [
        {
          id: "m1",
          name: "Alice Cooper",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
          joinedDate: "2024-02-15",
        },
        {
          id: "m2",
          name: "Bob Wilson",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop&crop=faces",
          joinedDate: "2024-02-14",
        },
      ],
    },
  },
  {
    id: "2",
    platform: "twitter",
    name: "Product Updates",
    avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=64&h=64&fit=crop&crop=faces",
    status: "active",
    posts: 3456,
    createdAt: "2023-06-20T09:45:00",
    details: {
      followers: 28930,
      following: 1245,
      likes: 89400,
      shares: 12400,
      views: 234500,
      engagement: 92,
      recentMembers: [
        {
          id: "m3",
          name: "Carol Smith",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
          joinedDate: "2024-02-13",
        },
      ],
    },
  },
  {
    id: "3",
    platform: "linkedin",
    name: "Corporate Profile",
    avatar: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=64&h=64&fit=crop&crop=faces",
    status: "error",
    posts: 892,
    createdAt: "2022-12-14T15:20:00",
    details: {
      followers: 8420,
      following: 445,
      likes: 12300,
      shares: 890,
      views: 45600,
      engagement: 45,
      recentMembers: [
        {
          id: "m4",
          name: "David Brown",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
          joinedDate: "2024-02-12",
        },
      ],
    },
  },
];

export function SocialAccountsTable() {
  const { socialAccounts } = useSocialAccountsContext();
  const [accounts, setAccounts] = useState<SocialAccount[]>(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SocialAccount;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case "twitter":
        return <Twitter className="h-5 w-5 text-sky-500" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  const handleSort = (key: keyof SocialAccount) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedAccounts = [...accounts].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setAccounts(sortedAccounts);
  };

  const handleDelete = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const handleSync = (id: string) => {
    setAccounts(accounts.map((account) => (account.id === id ? { ...account, status: "pending" as const } : account)));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  const filteredAccounts = accounts.filter((account) => account.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card shadow-lg">
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
                <Button variant="ghost" onClick={() => handleSort("posts")} className="mx-auto flex items-center gap-1 font-semibold leading-none tracking-tight text-black text-center">
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
              <Fragment key={account.id}>
                <TableRow key={account.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => toggleRow(account.id)}>
                      {expandedRows.has(account.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={account.avatar} alt={account.name} />
                        <AvatarFallback>{account.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="font-medium">{account.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {getPlatformIcon(account.platform)}
                          <span className="ml-1">{account.platform}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">{getStatusBadge(account.status)}</TableCell>
                  <TableCell className="py-4 mx-auto">
                    <div className="flex items-center gap-1 justify-center">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {account.posts.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">{formatDate(account.createdAt)}</TableCell>
                  <TableCell className="py-4 ">
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="icon" onClick={() => handleSync(account.id)}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(account.id)} className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows.has(account.id) && (
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
                                <p className="text-2xl font-bold">{formatNumber(account.details.followers)}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <ThumbsUp className="h-4 w-4" />
                                  Likes
                                </div>
                                <p className="text-2xl font-bold">{formatNumber(account.details.likes)}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Share2 className="h-4 w-4" />
                                  Shares
                                </div>
                                <p className="text-2xl font-bold">{formatNumber(account.details.shares)}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Engagement Rate</span>
                                <span className="text-sm font-medium">{account.details.engagement}%</span>
                              </div>
                              <Progress value={account.details.engagement} className="h-2" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Recent Members</h3>
                            <div className="space-y-3">
                              {account.details.recentMembers.map((member) => (
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
                              ))}
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
