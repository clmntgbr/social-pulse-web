export interface SocialAccount {
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
