import { Capitalize } from "@/components/Capitalize";
import { SocialNetworkTypeEnum } from "@/enums/SocialNetworkType";

export const calendarFilterSocialNetworksOptions = [
  {
    label: Capitalize(SocialNetworkTypeEnum.FACEBOOK),
    value: SocialNetworkTypeEnum.FACEBOOK,
  },
  {
    label: Capitalize(SocialNetworkTypeEnum.TWITTER),
    value: SocialNetworkTypeEnum.TWITTER,
  },
  {
    label: Capitalize(SocialNetworkTypeEnum.INSTAGRAM),
    value: SocialNetworkTypeEnum.INSTAGRAM,
  },
  {
    label: Capitalize(SocialNetworkTypeEnum.LINKEDIN),
    value: SocialNetworkTypeEnum.LINKEDIN,
  },
  {
    label: Capitalize(SocialNetworkTypeEnum.YOUTUBE),
    value: SocialNetworkTypeEnum.YOUTUBE,
  },
];

export const calendarFilterPublicationsStatusOptions = [
  {
    label: "Posted",
    value: "posted",
  },
  {
    label: "Programmed",
    value: "programmed",
  },
  {
    label: "Failed",
    value: "failed",
  },
  {
    label: "Draft",
    value: "draft",
  },
];

export const calendarMonthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const calendarWeekDaysShort = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
