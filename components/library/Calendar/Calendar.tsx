import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import usePublicationsContext from "@/contexts/publications/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { CalendarDay } from "../../types/calendar";
import CreatePublication from "../Publications/DialogPublications";
import MonthView from "./MonthView";
import { isSameDay, monthNames, weekDaysShort } from "./dateUtils";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { publications } = usePublicationsContext();
  const [open, setOpen] = useState(false);

  const generateDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    let daysFromPrevMonth = firstDay.getDay() - 1;
    if (daysFromPrevMonth === -1) daysFromPrevMonth = 6;

    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - i);
      days.push({
        date,
        events: publications.publications?.filter((event) => isSameDay(event.publishedAt, date)) ?? [],
        isToday: isSameDay(date.toISOString(), today),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push({
        date,
        events: publications.publications?.filter((event) => isSameDay(event.publishedAt, date)) ?? [],
        isToday: isSameDay(date.toISOString(), today),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDay);
      date.setDate(date.getDate() + i);
      days.push({
        date,
        events: publications.publications?.filter((event) => isSameDay(event.publishedAt, date)) ?? [],
        isToday: isSameDay(date.toISOString(), today),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const today = () => {
    const today = new Date();
    setCurrentDate(today);
  };

  const onCreatePublication = () => {
    setOpen(true);
  };

  const navigate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3">
        <div>
          <Button variant="secondary" className="rounded-lg" onClick={() => today()}>
            Today
          </Button>
        </div>
        <div className="flex items-center mx-auto">
          <Button variant="secondary" className="rounded-none rounded-l-lg" onClick={() => navigate("prev")}>
            <ChevronLeft className="text-gray-600" />
          </Button>
          <Button variant="secondary" className="rounded-none w-36">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Button>
          <Button variant="secondary" className="rounded-none rounded-r-lg" onClick={() => navigate("next")}>
            <ChevronRight className="text-gray-600" />
          </Button>
        </div>
        <div>
          <Button className="rounded-lg" onClick={() => onCreatePublication()}>
            Create a publication
          </Button>
        </div>
      </div>
      <div className="bg-white overflow-hidden border flex-1">
        <>
          <div className="grid grid-cols-7 bg-secondary h-[30px]">
            {weekDaysShort.map((day) => (
              <div key={day} className="py-1 text-center text-gray-600 dark:text-white font-semibold border-b">
                {day}
              </div>
            ))}
          </div>
          <MonthView days={generateDays()} />
        </>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] sm:rounded-none rounded-none">
          <DialogHeader className="hidden">
            <DialogTitle className="hidden">Create your publication</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreatePublication onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
