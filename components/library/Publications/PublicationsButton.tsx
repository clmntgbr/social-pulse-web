import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";
import React from "react";
import { DateTimePicker } from "./DateTimePicker";

interface Option {
  label: string;
  value: string;
}

interface PublicationsButtonButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  onSelect: (value: string, scheduledDate: Date) => void;
}

export function PublicationsButton({ onSelect, isDisabled, isLoading }: PublicationsButtonButtonProps) {
  const options = [
    { label: "Share now", value: "now" },
    { label: "Save as draft", value: "draft" },
    { label: "Schedule for later", value: "scheduled" },
  ];
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [date, setDate] = React.useState<Date>(new Date());

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    if (option.value === "scheduled") {
      setShowDatePicker(true);
    }
  };

  const handleSchedule = (date: Date) => {
    setShowDatePicker(false);
    setDate(date);
    setSelectedOption({
      label: `Scheduled for ${date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} at ${date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`,
      value: "scheduled",
    });
  };

  return (
    <>
      <div className={`inline-flex ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
        <Button onClick={() => onSelect(selectedOption.value, date)} variant="default" className={`rounded-r-none`} disabled={isDisabled}>
          {selectedOption.label} {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isDisabled}>
            <Button variant="default" className="rounded-l-none border-l border-primary/20 px-2">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {options.map((option) => (
              <DropdownMenuItem key={option.value} onClick={() => handleSelect(option)} className="cursor-pointer">
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {showDatePicker && <DateTimePicker onSchedule={handleSchedule} init={date} />}
    </>
  );
}
