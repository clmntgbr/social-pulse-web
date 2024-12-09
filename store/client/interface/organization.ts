import { SocialNetwork } from "./social-network";
import { User } from "./user";

export interface Organization {
  uuid: string;
  name: string;
  logoUrl: string;
  socialNetworks?: Partial<SocialNetwork[]>;
  users?: Partial<User[]>;
  admin?: Partial<User>;
}
