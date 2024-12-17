import { SocialNetwork } from "./social-network";

export interface Publication {
  uuid: string;
  publicationType: string;
  publishedAt: string;
  content: string | null;
  status: string;
  socialNetwork: SocialNetwork;
}
