import React from "react";
import { CalendarDay } from "../../types/calendar";
import CalendarDayCell from "./CalendarDayCell";

interface MonthViewProps {
  days: CalendarDay[];
}

const CalendarMonthView: React.FC<MonthViewProps> = ({ days }) => {
  return (
    <div className="grid grid-cols-7 divide-x divide-y [&>*]:border-[hsl(var(--border))]" style={{ height: "calc(100% - 30px)" }}>
      {days.map((day) => (
        <CalendarDayCell key={crypto.randomUUID()} day={day} />
      ))}
    </div>
  );
};

export default CalendarMonthView;
