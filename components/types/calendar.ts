import { Publication } from "@/store/client/interface/publication";

export interface CalendarDay {
  date: Date;
  events: Publication[];
  isToday: boolean;
  isCurrentMonth: boolean;
}
