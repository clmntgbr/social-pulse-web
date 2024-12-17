import React from "react";
import DayCell from "./DayCell";
import { CalendarDay } from "./types/calendar";

interface MonthViewProps {
  days: CalendarDay[];
}

const MonthView: React.FC<MonthViewProps> = ({ days }) => {
  return (
    <div className="grid grid-cols-7 divide-x divide-y [&>*]:border-[hsl(var(--border))]" style={{ height: "calc(100% - 30px)" }}>
      {days.map((day) => (
        <DayCell key={crypto.randomUUID()} day={day} />
      ))}
    </div>
  );
};

export default MonthView;
