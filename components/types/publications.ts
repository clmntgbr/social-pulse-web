import { SocialNetwork } from "@/store/client/interface/social-network";

export interface CreatePublication {
  socialNetwork: SocialNetwork | null;
  children: CreatePublicationChildren[];
  selected: CreatePublicationChildren;
}

export interface CreatePublicationChildren {
  body: string | null;
  pictures: string[];
  videos: string[];
  id: number;
}
