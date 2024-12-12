import React from "react";
import DayCell from "./DayCell";
import { CalendarDay } from "./types/calendar";

interface MonthViewProps {
  days: CalendarDay[];
  onDayClick: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ days, onDayClick }) => {
  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 h-full">
      {days.map((day, index) => (
        <DayCell key={index} day={day} onClick={() => onDayClick(day.date)} />
      ))}
    </div>
  );
};

export default MonthView;
