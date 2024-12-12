import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import MonthView from "./MonthView";
import { isSameDay, monthNames, weekDaysShort } from "./dateUtils";
import { CalendarDay, Event } from "./types/calendar";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly sync with the development team",
      start: new Date(2024, 11, 12, 10, 0), // December 14th, 10 AM
      end: new Date(2024, 11, 12, 11, 30),
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "2",
      title: "Lunch with Client",
      description: "Business lunch with potential client",
      start: new Date(2024, 11, 12, 12, 30), // December 14th, 12:30 PM
      end: new Date(2024, 11, 12, 14, 0),
      color: "bg-green-100 text-green-800",
    },
    {
      id: "3",
      title: "Project Deadline",
      description: "Final submission for Q4 project",
      start: new Date(2024, 11, 14, 16, 0), // December 14th, 4 PM
      end: new Date(2024, 11, 14, 17, 0),
      color: "bg-red-100 text-red-800",
    },
    {
      id: "4",
      title: "Holiday Party",
      description: "Annual company holiday celebration",
      start: new Date(2024, 11, 20, 18, 0),
      end: new Date(2024, 11, 20, 22, 0),
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "5",
      title: "Year-End Review",
      description: "Annual performance review",
      start: new Date(2024, 11, 18, 14, 0),
      end: new Date(2024, 11, 18, 15, 0),
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "6",
      title: "Training Session",
      description: "New software training",
      start: new Date(2024, 11, 15, 9, 0),
      end: new Date(2024, 11, 15, 12, 0),
      color: "bg-indigo-100 text-indigo-800",
    },
  ]);

  const generateDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysFromPrevMonth = firstDay.getDay();
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - i);
      days.push({
        date,
        events: events.filter((event) => isSameDay(event.start, date)),
        isToday: isSameDay(date, today),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push({
        date,
        events: events.filter((event) => isSameDay(event.start, date)),
        isToday: isSameDay(date, today),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDay);
      date.setDate(date.getDate() + i);
      days.push({
        date,
        events: events.filter((event) => isSameDay(event.start, date)),
        isToday: isSameDay(date, today),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const navigate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const handleDayClick = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center py-3">
        <h1 className="text-3xl font-semibold text-gray-800">
          <button onClick={() => navigate("prev")} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          <button onClick={() => navigate("next")} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </h1>
      </div>
      <div className="bg-white overflow-hidden border flex-1">
        <>
          <div className="grid grid-cols-7 bg-gray-100">
            {weekDaysShort.map((day) => (
              <div key={day} className="py-4 text-center text-gray-600 font-semibold border-b">
                {day}
              </div>
            ))}
          </div>
          <MonthView days={generateDays()} onDayClick={handleDayClick} />
        </>
      </div>
    </div>
  );
};

export default Calendar;
