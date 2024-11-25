import { SocialAccount } from "./social-account";

export interface Analysis {
  title: string;
  socialAccount: SocialAccount | null;
  uuid: string;
  status: string;
  isFavorite: boolean;
  username: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}
