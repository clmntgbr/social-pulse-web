interface Workspace {
  "@id": string;
  "@type": string;
  label: string;
  logoUrl: string;
  uuid: string;
}

export interface GetWorkspaces {
  "@context": string;
  "@id": string;
  "@type": string;
  totalItems: number;
  member: Workspace[];
}
