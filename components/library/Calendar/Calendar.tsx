import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  calendarFilterPublicationsStatusOptions,
  calendarFilterSocialNetworksOptions,
  calendarMonthNames,
  calendarWeekDaysShort,
} from "@/composables/Calendar";
import usePublicationsContext from "@/contexts/publications/hooks";
import { dispatch } from "@/hooks/use-toast";
import { Publication } from "@/store/client/interface/publication";
import { ChevronLeft, ChevronRight, CirclePlus } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { CalendarDay } from "../../types/calendar";
import CreatePublication from "../Publications/DialogPublications";
import { CalendarFilter } from "./CalendarFilter";
import CalendarMonthView from "./CalendarMonthView";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { publications } = usePublicationsContext();
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [filterSocialNetworks, setFilterSocialNetworks] = useState<string[]>([]);
  const [filterPublicationsStatus, setFilterPublicationsStatus] = useState<string[]>([]);

  const handleFilterSocialNetworks = (values: string[]) => {
    setFilterSocialNetworks(values);
  };

  const handleFilterPublicationsStatus = (values: string[]) => {
    setFilterPublicationsStatus(values);
  };

  const today = () => {
    const today = new Date();
    setCurrentDate(today);
  };

  const onCreatePublication = () => {
    dispatch({ type: "DISMISS_TOAST", toastId: "success" });
    dispatch({ type: "DISMISS_TOAST", toastId: "fail" });
    setOpen(true);
  };

  const navigate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const generateDays = useCallback((): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    let daysFromPrevMonth = firstDay.getDay() - 1;
    if (daysFromPrevMonth === -1) daysFromPrevMonth = 6;

    const isSameDay = (date1: string, date2: Date): boolean => {
      const date = new Date(date1);
      return date.getDate() === date2.getDate() && date.getMonth() === date2.getMonth() && date.getFullYear() === date2.getFullYear();
    };

    const filterEvents = (events: Publication[]) => {
      return events.filter((event) => {
        const matchesSocialNetwork =
          filterSocialNetworks.length === 0 || filterSocialNetworks.includes(event.socialNetwork?.socialNetworkType.name ?? "");

        const matchesStatus = filterPublicationsStatus.length === 0 || filterPublicationsStatus.includes(event.status);

        return matchesSocialNetwork && matchesStatus;
      });
    };

    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - i);
      const dateEvents = publications.publications?.filter((event) => isSameDay(event.publishedAt, date)) ?? [];

      days.push({
        date,
        events: filterEvents(dateEvents),
        isToday: isSameDay(date.toISOString(), today),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateEvents = publications.publications?.filter((event) => isSameDay(event.publishedAt, date)) ?? [];

      days.push({
        date,
        events: filterEvents(dateEvents),
        isToday: isSameDay(date.toISOString(), today),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDay);
      date.setDate(date.getDate() + i);
      const dateEvents = publications.publications?.filter((event) => isSameDay(event.publishedAt, date)) ?? [];

      days.push({
        date,
        events: filterEvents(dateEvents),
        isToday: isSameDay(date.toISOString(), today),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate, publications.publications, filterSocialNetworks, filterPublicationsStatus]);

  useEffect(() => {
    setDays(generateDays());
  }, [generateDays]);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-3 items-center p-3 gap-4">
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="rounded-lg hover:text-primary" onClick={() => today()}>
            Today
          </Button>
          <CalendarFilter options={calendarFilterSocialNetworksOptions} title="Social Network" onChange={handleFilterSocialNetworks} />
          <CalendarFilter options={calendarFilterPublicationsStatusOptions} title="Status" onChange={handleFilterPublicationsStatus} />
        </div>
        <div className="flex items-center justify-center">
          <Button variant="secondary" className="rounded-none rounded-l-lg text-gray-600 hover:text-primary" onClick={() => navigate("prev")}>
            <ChevronLeft className="" />
          </Button>
          <Button variant="secondary" className="rounded-none w-36 hover:text-primary">
            {calendarMonthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Button>
          <Button variant="secondary" className="rounded-none rounded-r-lg text-gray-600 hover:text-primary" onClick={() => navigate("next")}>
            <ChevronRight />
          </Button>
        </div>
        <div className="flex justify-end">
          <Button className="rounded-lg" onClick={() => onCreatePublication()}>
            <CirclePlus /> Create a publication
          </Button>
        </div>
      </div>
      <div className="bg-white overflow-hidden border flex-1">
        <>
          <div className="grid grid-cols-7 bg-secondary h-[30px]">
            {calendarWeekDaysShort.map((day) => (
              <div key={day} className="py-1 text-center text-gray-600 dark:text-white font-semibold border-b">
                {day}
              </div>
            ))}
          </div>
          <CalendarMonthView days={days} />
        </>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] sm:rounded-none rounded-none shadow-none">
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
