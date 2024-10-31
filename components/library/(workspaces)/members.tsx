"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { WorkspaceFull } from "@/store/client/interface/workspace-full";
import { useSession } from "next-auth/react";
import React from "react";

type WorkspacesMembersProps = {
  workspace: WorkspaceFull;
};

export const WorkspacesMembers: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite people to collaborate</CardTitle>
        <CardDescription> You can invite existing members to collaborate on this workspace, giving them permission to edit and contribute alongside you.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input value="" readOnly />
          <Button variant="secondary" className="shrink-0">
            Send invitation
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">People with access</h4>
          <div className="grid gap-6">
            {workspace &&
              workspace.users.map((user) => (
                <div className="flex items-center justify-between space-x-4" key={crypto.randomUUID()}>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl ?? "https://avatar.vercel.sh/rauchg.png"} />
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium leading-none">
                        {user.givenName} {user.familyName}{" "}
                        {session?.user?.id === user.uuid && (
                          <Badge variant="outline" className="ml-1">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Badge>{user.uuid === workspace.admin.uuid ? "Administrator" : "Member"}</Badge>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
