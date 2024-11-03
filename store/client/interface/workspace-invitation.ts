import { User } from "./user";

export interface WorkspaceInvitation {
  user: User;
  status: string;
  uuid: string;
}
