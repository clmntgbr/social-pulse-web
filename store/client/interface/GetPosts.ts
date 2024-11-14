import { Post } from "./post";

export interface GetPosts {
  totalItems: number;
  member: Post[];
}
