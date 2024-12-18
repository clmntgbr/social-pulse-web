import { getStatusColorPublication } from "@/components/Calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCurrentLocale } from "@/locales/client";
import { DateTime } from "luxon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CalendarDay } from "../../types/calendar";

interface DayCellProps {
  day: CalendarDay;
}

const MAX_EVENTS = 2;

const DayCell: React.FC<DayCellProps> = ({ day }) => {
  const visibleEvents = day.events.slice(0, MAX_EVENTS);
  const remainingEvents = day.events.length - MAX_EVENTS;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useCurrentLocale();

  const openDialog = () => setOpen(true);

  const dateFormat = DateTime.fromISO(day.date.toISOString(), { zone: "utc" }).setLocale("fr").toFormat("cccc d MMMM");

  return (
    <>
      <div
        onClick={openDialog}
        className={`
        min-h-[100px] p-2 bg-white dark:bg-black
        ${!day.isCurrentMonth && "bg-gray-50 text-gray-400 dark:bg-black dark:text-white"}
        ${day.isToday && "bg-blue-50"}
        hover:bg-gray-50 cursor-pointer
      `}
      >
        <div
          className={`
        inline-flex items-center justify-center w-5 h-5 rounded-full text-sm
        ${day.isToday && "bg-blue-500 text-white"}
      `}
        >
          {day.date.getDate()}
        </div>
        <div className="mt-2 space-y-1">
          {visibleEvents.map((event) => {
            const date = new Date(event.publishedAt);
            const hours = date.getUTCHours().toString().padStart(2, "0");
            const minutes = date.getUTCMinutes().toString().padStart(2, "0");
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/${locale}/publications/${event.uuid}`);
                }}
                key={event.uuid}
                className={`border flex z-50 items-center cursor-pointer text-sm px-1 py-0.5 rounded truncate text-ellipsis gap-1 ${getStatusColorPublication(
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
          {remainingEvents > 0 && (
            <div className="text-sm px-1 py-0.5 rounded cursor-pointer bg-gray-200 dark:bg-gray-400 text-gray-700 hover:bg-gray-200 transition-colors text-center">
              +{remainingEvents} more
            </div>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="block w-[50vw] max-w-[50vw]">
          <DialogHeader>
            <DialogTitle className="font-normal py-3">{dateFormat}</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-1 w-full">
            {day.events.map((event) => {
              const date = new Date(event.publishedAt);
              const hours = date.getUTCHours().toString().padStart(2, "0");
              const minutes = date.getUTCMinutes().toString().padStart(2, "0");
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/${locale}/publications/${event.uuid}`);
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
      </Dialog>
    </>
  );
};

export default DayCell;
