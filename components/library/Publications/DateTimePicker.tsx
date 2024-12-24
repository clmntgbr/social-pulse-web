import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as React from "react";

interface DateTimePickerProps {
  onSchedule: (date: Date) => void;
}

export function DateTimePicker({ onSchedule }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date>();
  const [hour, setHour] = React.useState("12");
  const [minute, setMinute] = React.useState("00");

  const handleSchedule = () => {
    if (date) {
      const scheduledDate = new Date(date);
      scheduledDate.setHours(parseInt(hour), parseInt(minute));
      onSchedule(scheduledDate);
    }
  };

  return (
    <div className="absolute bottom-0 mt-2 p-6 bg-white rounded-lg shadow-lg border z-50">
      <div className="space-y-4">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        <div className="flex gap-2">
          <Select value={hour} onValueChange={setHour}>
            <SelectTrigger>
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={minute} onValueChange={setMinute}>
            <SelectTrigger>
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => (
                <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSchedule} disabled={!date} className="w-full">
          Schedule
        </Button>
      </div>
    </div>
  );
}
