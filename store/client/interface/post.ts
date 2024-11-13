import { SocialAccount } from "./social-account";

export interface Post {
  uuid: string;
  postId?: string | null;
  groupUuid: string | null;
  groupType: string | null;
  header?: string | null;
  body?: string | null;
  pictures: string[];
  status: string;
  postAt: string;
  socialAccount: SocialAccount | null;
  createdAt: string | null;
  updatedAt: string | null;
}
