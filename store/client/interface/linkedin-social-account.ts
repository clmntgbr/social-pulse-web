import { Education } from "./education";
import { Language } from "./language";
import { Position } from "./position";
import { Skill } from "./skill";

export type LinkedinSocialAccount = {
  isOpenToWork: boolean;
  isHiring: boolean;
  summary: string | null;
  headline: string | null;
  country: string | null;
  city: string | null;
  educations: Partial<Education>;
  languages: Partial<Language>;
  skills: Partial<Skill>;
  positions: Partial<Position>;
};
