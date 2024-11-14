import { BadgeDefault } from "./badge/BadgeDefault";
import { BadgeError } from "./badge/BadgeError";
import { BadgeSuccess } from "./badge/BadgeSuccess";
import { BadgeWarning } from "./badge/BadgeWarning";

export const postStatus = (status: string) => {
  switch (status) {
    case "posted":
      return <BadgeSuccess label="posts.status.posted" />;
    case "programmed":
      return <BadgeWarning label="posts.status.programmed" />;
    case "failed":
      return <BadgeError label="posts.status.failed" />;
    default:
      return <BadgeDefault label="posts.status.draft" />;
  }
};
