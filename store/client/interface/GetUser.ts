interface Workspace {
  "@id": string;
  "@type": string;
  label: string;
  logoUrl: string;
  uuid: string;
}

export interface GetUser {
  "@context": string;
  "@id": string;
  "@type": string;
  uuid: string;
  email: string;
  givenName: string | null;
  familyName: string | null;
  avatarUrl: string | null;
  activeWorkspace: Workspace;
  workspaces: Workspace[];
}
