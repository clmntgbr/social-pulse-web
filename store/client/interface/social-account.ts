import { Post } from "./post";

export interface SocialAccount {
  socialAccountId: string;
  isVerified: boolean;
  username: string;
  name: string;
  url: string;
  avatarUrl: string;
  socialAccountTypeAvatarUrl: string;
  status: string;
  socialAccountType: string;
  email: string | null;
  givenName: string | null;
  familyName: string | null;
  uuid: string;
  nbOfPosts: number;
  followersCount: number | null;
  followingCount: number | null;
  likeCount: number | null;
  createdAt: string;
  updatedAt: string;
  recentPosts: Post[];
}
