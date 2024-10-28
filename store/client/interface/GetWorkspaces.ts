import { Workspace } from "./workspace";

export interface GetWorkspaces {
  "@context": string;
  "@id": string;
  "@type": string;
  totalItems: number;
  member: Workspace[];
}
