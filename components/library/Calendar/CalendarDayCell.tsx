import { getStatusColorPublication } from "@/components/Calendar";
import { dispatch } from "@/hooks/use-toast";
import { useCurrentLocale } from "@/locales/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { CalendarDay } from "../../types/calendar";

interface DayCellProps {
  day: CalendarDay;
  onClick: (day: CalendarDay | null) => void;
}

const MAX_EVENTS = 2;

const CalendarDayCell: React.FC<DayCellProps> = ({ day, onClick }) => {
  const visibleEvents = day.events.slice(0, MAX_EVENTS);
  const remainingEvents = day.events.length - MAX_EVENTS;
  const router = useRouter();
  const locale = useCurrentLocale();

  const openDialog = () => {
    dispatch({ type: "DISMISS_TOAST", toastId: "success" });
    dispatch({ type: "DISMISS_TOAST", toastId: "fail" });
    onClick(day);
  };

  return (
    <>
      <div
        onClick={openDialog}
        className={`
        min-h-[100px] p-2 bg-white dark:bg-background
        ${!day.isCurrentMonth && "bg-gray-50 text-gray-400 dark:bg-background dark:text-white"}
        ${day.isToday && "bg-blue-50"}
        hover:bg-gray-50 dark:hover:bg-black cursor-pointer
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
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/${locale}/publications/${event.threadUuid}`);
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
    </>
  );
};

export default CalendarDayCell;
