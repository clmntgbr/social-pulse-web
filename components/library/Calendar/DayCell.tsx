import React from "react";
import { CalendarDay } from "./types/calendar";

interface DayCellProps {
  day: CalendarDay;
  onClick: () => void;
}

const DayCell: React.FC<DayCellProps> = ({ day, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        min-h-[120px] p-2 bg-white
        ${!day.isCurrentMonth && "bg-gray-50 text-gray-400"}
        ${day.isToday && "bg-blue-50"}
        hover:bg-gray-50 cursor-pointer
      `}
    >
      <div
        className={`
        inline-flex items-center justify-center w-8 h-8 rounded-full
        ${day.isToday && "bg-blue-500 text-white"}
      `}
      >
        {day.date.getDate()}
      </div>
      <div className="mt-2 space-y-1">
        {day.events.map((event) => (
          <div key={event.id} className={`text-sm p-1 rounded truncate ${event.color || "bg-blue-100 text-blue-800"}`}>
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCell;
