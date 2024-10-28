import { SocialAccount } from "./social-account";

export interface GetSocialAccounts {
  "@context": string;
  "@id": string;
  "@type": string;
  totalItems: number;
  member: SocialAccount[];
}
