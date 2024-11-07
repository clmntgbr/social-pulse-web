import { SocialAccount } from "./social-account";
import { User } from "./user";
import { WorkspaceInvitation } from "./workspace-invitation";

export interface Workspace {
  label: string;
  logoUrl: string;
  uuid: string;
  admin: User;
  users: User[];
  workspaceInvitations: WorkspaceInvitation[];
  socialAccounts: SocialAccount[];
}
