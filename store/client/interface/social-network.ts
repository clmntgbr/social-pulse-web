export type SocialNetwork = {
  uuid: string;
  socialNetworkId: string;
  avatarUrl: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  followers: boolean;
  followings: boolean;
  shares: boolean;
  comments: boolean;
  likes: boolean;
  name: string;
  email: string | null;
  token: string;
  organization: string;
  verified: boolean;
  socialNetworkType: SocialNetworkType;
} & Partial<LinkedinSocialNetwork> &
  Partial<FacebookSocialNetwork>;

type LinkedinSocialNetwork = {
  language: string | null;
  country: string | null;
};

type FacebookSocialNetwork = {
  website: string | null;
  link: string | null;
};
