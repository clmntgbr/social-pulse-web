import { SocialNetwork } from "./social-network";

export interface Publication {
  uuid: string;
  publicationType: string | null;
  publishedAt: string;
  content: string | null;
  status: string;
  socialNetwork: SocialNetwork | null;
}

export function initializePublication(): Publication {
  return {
    uuid: crypto.randomUUID(),
    publicationType: null,
    publishedAt: new Date().toISOString(),
    content: null,
    status: "draft",
    socialNetwork: null,
  };
}
