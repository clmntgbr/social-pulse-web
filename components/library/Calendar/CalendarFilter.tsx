import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface CalendarFilterProps {
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (values: string[]) => void;
  title: string;
}

export function CalendarFilter({ options, title, onChange }: CalendarFilterProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm" className="h-8 hover:text-primary text-sm">
            <SlidersHorizontal />
            {title}
            {selectedValues?.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.length > 1 ? (
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      {selectedValues.length} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.includes(option.value))
                      .map((option) => (
                        <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          setSelectedValues(selectedValues.filter((value) => value !== option.value));
                          onChange?.(selectedValues.filter((value) => value !== option.value));
                        } else {
                          setSelectedValues([...selectedValues, option.value]);
                          onChange?.([...selectedValues, option.value]);
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <Check />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup
                    onClick={() => {
                      setSelectedValues([]);
                      onChange?.([]);
                    }}
                  >
                    <CommandItem className="justify-center text-center cursor-pointer">Clear filters</CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
