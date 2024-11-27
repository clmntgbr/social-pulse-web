import { FacebookPost } from "./facebook-post";
import { LinkedinPost } from "./linkedin-post";
import { TwitterPost } from "./twitter-post";

export type Post = {
  postId: string;
  body: string;
  likeCount: number;
  commentsCount: number;
  repostsCount: number;
  images: Image[];
  url: string;
  postAt: string;
  uuid: string;
} & Partial<LinkedinPost> &
  Partial<FacebookPost> &
  Partial<TwitterPost>;

type Image = {
  url: string;
};
