import { User } from "./user";
import { WorkspaceFull } from "./workspace-full";

export interface WorkspaceInvitationFull {
  workspace: WorkspaceFull;
  user: User;
  createdBy: User;
  updatedBy: User;
  status: "pending" | "accepted" | "denied";
  uuid: string;
  createdAt: string;
  updatedAt: string;
}
