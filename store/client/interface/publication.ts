import { SocialNetwork } from "./social-network";

export interface Publication {
  uuid: string;
  publicationType: string;
  socialNetwork: SocialNetwork;
}
