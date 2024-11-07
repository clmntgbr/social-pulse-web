import { User } from "./user";
import { Workspace } from "./workspace";

export interface WorkspaceInvitation {
  workspace: Workspace;
  user: User;
  createdBy: User;
  updatedBy: User;
  status: "pending" | "accepted" | "denied";
  uuid: string;
  createdAt: string;
  updatedAt: string;
}
