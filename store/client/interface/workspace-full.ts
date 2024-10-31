import { SocialAccount } from "./social-account";
import { User } from "./user";

export interface WorkspaceFull {
  label: string;
  logoUrl: string;
  uuid: string;
  admin: User;
  users: User[];
  socialAccounts: SocialAccount[];
}
