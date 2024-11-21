import { Education } from "./education";
import { Experience } from "./experience";
import { FacebookSocialAccount } from "./facebook-social-account";
import { Language } from "./language";
import { LinkedinSocialAccount } from "./linkedin-social-account";
import { Skill } from "./skill";
import { TwitterSocialAccount } from "./twitter-social-account";

export type SocialAccount = {
  socialAccountId: string | null;
  isVerified: boolean | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  profilePicture: string | null;
  backgroundImage: string | null;
  email: string | null;
  followerCount: number | null;
  followingCount: number | null;
  likeCount: number | null;
  postCount: number | null;
  socialAccountType: "facebook_social_account" | "twitter_social_account" | "linkedin_social_account";
  uuid: string;
  languages: Language[];
  educations: Partial<Education[]>;
  experiences: Partial<Experience[]>;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
} & Partial<LinkedinSocialAccount> &
  Partial<FacebookSocialAccount> &
  Partial<TwitterSocialAccount>;
