import { SocialAccount } from "./social-account";
import { User } from "./user";
import { WorkspaceInvitation } from "./workspace-invitation";

export interface WorkspaceFull {
  label: string;
  logoUrl: string;
  uuid: string;
  admin: User;
  users: User[];
  workspaceInvitations: WorkspaceInvitation[];
  socialAccounts: SocialAccount[];
}
