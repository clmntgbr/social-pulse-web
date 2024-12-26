import { getStatusColorPublication } from "@/components/Calendar";
import { CapitalizeWords } from "@/components/Capitalize";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCurrentLocale } from "@/locales/client";
import { DateTime } from "luxon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CalendarDay } from "../../types/calendar";
import CalendarDayCell from "./CalendarDayCell";

interface MonthViewProps {
  days: CalendarDay[];
}

const CalendarMonthView: React.FC<MonthViewProps> = ({ days }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [day, setDay] = useState<CalendarDay | null>(null);
  const locale = useCurrentLocale();
  const router = useRouter();

  const onClick = (day: CalendarDay | null) => {
    setDay(day);
    if (day) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-7 divide-x divide-y [&>*]:border-[hsl(var(--border))]" style={{ height: "calc(100% - 30px)" }}>
      {days.map((day) => (
        <CalendarDayCell key={crypto.randomUUID()} day={day} onClick={onClick} />
      ))}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>
              {day && CapitalizeWords(DateTime.fromISO(day.date.toISOString(), { zone: "utc" }).setLocale("fr").toFormat("cccc d MMMM"))}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-2 space-y-1 w-full">
            {day?.events.map((event) => {
              const date = new Date(event.publishedAt);
              const hours = date.getHours().toString().padStart(2, "0");
              const minutes = date.getMinutes().toString().padStart(2, "0");
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/${locale}/publications/${event.threadUuid}`);
                  }}
                  key={event.uuid}
                  className={`border flex z-50 py-2 items-center cursor-pointer text-sm px-1 rounded truncate text-ellipsis gap-1 ${getStatusColorPublication(
                    event.status
                  )}`}
                >
                  <Image
                    src={`/images/${event.socialNetwork?.socialNetworkType.name}-logo.png`}
                    alt={event.uuid}
                    width={10}
                    height={10}
                    className="flex-shrink-0 w-4 h-4 rounded-sm object-cover overflow-hidden"
                  />
                  <span>
                    {hours}:{minutes} {event.content}
                  </span>
                </div>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="block w-[50vw] max-w-[50vw]">
          <DialogHeader>
            <DialogTitle className="font-normal py-3">
              {day && CapitalizeWords(DateTime.fromISO(day.date.toISOString(), { zone: "utc" }).setLocale("fr").toFormat("cccc d MMMM"))}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-1 w-full">
            {day?.events.map((event) => {
              const date = new Date(event.publishedAt);
              const hours = date.getHours().toString().padStart(2, "0");
              const minutes = date.getMinutes().toString().padStart(2, "0");
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/${locale}/publications/${event.threadUuid}`);
                  }}
                  key={event.uuid}
                  className={`border flex z-50 py-2 items-center cursor-pointer text-sm px-1 rounded truncate text-ellipsis gap-1 ${getStatusColorPublication(
                    event.status
                  )}`}
                >
                  <Image
                    src={`/images/${event.socialNetwork?.socialNetworkType.name}-logo.png`}
                    alt={event.uuid}
                    width={10}
                    height={10}
                    className="flex-shrink-0 w-4 h-4 rounded-sm object-cover overflow-hidden"
                  />
                  <span>
                    {hours}:{minutes} {event.content}
                  </span>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default CalendarMonthView;
