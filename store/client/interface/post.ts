import { SocialAccount } from "./social-account";

export interface Post {
  uuid: string;
  groupType: "parent" | "children";
  header: string;
  body: string;
  pictures: string[];
  status: "posted" | "programmed" | "failed" | "draft";
  postAt: string;
  socialAccount: Partial<SocialAccount>;
  createdAt: string;
  updatedAt: string;
  postId: string | null;
  position: number;
  parent: Post | null;
  children: Post[];
}
