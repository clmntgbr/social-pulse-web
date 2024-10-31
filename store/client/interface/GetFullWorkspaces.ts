import { WorkspaceFull } from "./workspace-full";

export interface GetFullWorkspaces {
  totalItems: number;
  member: WorkspaceFull[];
}
