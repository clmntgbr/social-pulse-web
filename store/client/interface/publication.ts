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

export function initializePublication(index: number, threadType: string | null): Publication {
  return {
    uuid: crypto.randomUUID(),
    id: index,
    publicationType: null,
    publicationId: null,
    threadUuid: null,
    threadType: threadType ?? "primary",
    publishedAt: new Date().toISOString(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
