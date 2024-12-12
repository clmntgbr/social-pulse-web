export type CalendarView = "month" | "week" | "day";

export interface Event {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color?: string;
}

export interface CalendarDay {
  date: Date;
  events: Event[];
  isToday: boolean;
  isCurrentMonth: boolean;
}
