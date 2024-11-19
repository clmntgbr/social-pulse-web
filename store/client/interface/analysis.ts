import { SocialAccount } from "./social-account";

export interface Analysis {
  title: string;
  socialAccount: SocialAccount | null;
  uuid: string;
  status: string;
  username: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}
