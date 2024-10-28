"use client";

import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { cn } from "@/lib/utils";
import { Workspace } from "@/store/client/interface/workspace";
import { useEffect, useState } from "react";

export default function WorkspacesSwitcher() {
  const { workspaces } = useWorkspacesContext();
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Workspace | null>(null);

  useEffect(() => {
    if (!selectedTeam) {
      setSelectedTeam(workspaces.workspace);
    }
  });

  if (
    !workspaces ||
    !workspaces.workspace ||
    !workspaces.workspaces ||
    !workspaces.workspaces.member?.length
  ) {
    return null;
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("min-w-[250px] justify-between font-semibold")}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedTeam?.uuid}.png`}
                alt={selectedTeam?.label}
                className="grayscale"
              />
              <AvatarFallback>{selectedTeam?.label}</AvatarFallback>
            </Avatar>
            {selectedTeam?.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              {workspaces.workspaces?.member.map((workspace: Workspace) => (
                <CommandItem
                  key={workspace.label}
                  onSelect={() => {
                    setSelectedTeam(workspace);
                    setOpen(false);
                  }}
                  className="text-sm font-light px-4"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${workspace.uuid}.png`}
                      alt={workspace.label}
                      className="grayscale"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {workspace.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedTeam?.uuid === workspace.uuid
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
