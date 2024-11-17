interface SocialAccount {
  socialAccountId: string;
  isVerified: boolean;
  username: string;
  name: string | null;
  avatarUrl: string | null;
  socialAccountTypeAvatarUrl: string;
  socialAccountType: "facebook_social_account" | "twitter_social_account" | "linkedin_social_account";
  email: string | null;
  givenName: string | null;
  familyName: string | null;
  followersCount: number;
  followingCount: number;
  likeCount: number;
  postCount: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}
