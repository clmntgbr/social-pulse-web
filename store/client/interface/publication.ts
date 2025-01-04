import { SocialNetwork } from "./social-network";

export type Publication = {
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
} & Partial<{
  characters: number;
}>;

export function initializePublication(index: number, threadType: string | null): Publication {
  return {
    uuid: crypto.randomUUID(),
    id: index,
    publicationType: null,
    publicationId: null,
    threadUuid: null,
    characters: 0,
    threadType: threadType ?? "primary",
    publishedAt: new Date().toISOString(),
    content: "",
    status: "draft",
    pictures: [],
    socialNetwork: null,
  };
}

export function initializeCreatePublication(): CreatePublication {
  const publication = initializePublication(1, null);
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
