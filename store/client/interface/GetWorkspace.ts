interface SocialAccounts {
  "@id": string;
  "@type": string;
  socialAccountId: string;
  isVerified: boolean;
  username: string;
  name: string;
  avatarUrl: string;
  socialAccountTypeAvatarUrl: string;
  status: string;
  socialAccountType: string;
  email: string | null;
  givenName: string | null;
  familyName: string | null;
  uuid: string;
}

interface User {
  "@id": string;
  "@type": string;
  uuid: string;
  email: string;
  givenName: string | null;
  familyName: string | null;
  avatarUrl: string | null;
}

export interface GetWorkspace {
  "@context": string;
  "@id": string;
  "@type": string;
  label: string;
  logoUrl: string;
  socialAccounts: SocialAccounts[];
  users: User[];
  uuid: string;
}
