import { SocialNetwork } from "./social-network";

export interface Publication {
  uuid: string;
  id: number | null;
  publicationType: string | null;
  threadUuid: string | null;
  threadType: string | null;
  publicationId: string | null;
  publishedAt: string;
  content: string | null;
  status: string;
  socialNetwork: SocialNetwork | null;
  pictures: string[];
}

export function initializePublication(index: number): Publication {
  return {
    uuid: crypto.randomUUID(),
    id: index,
    publicationType: null,
    publicationId: null,
    threadUuid: null,
    threadType: "primary",
    publishedAt: new Date().toISOString(),
    content: "",
    status: "draft",
    pictures: [],
    socialNetwork: null,
  };
}

export function initializeCreatePublication(): CreatePublication {
  const publication = initializePublication(1);
  return {
    socialNetwork: null,
    publications: [publication],
    selected: publication,
  };
}

export interface CreatePublication {
  socialNetwork: SocialNetwork | null;
  publications: Publication[];
  selected: Publication;
}
