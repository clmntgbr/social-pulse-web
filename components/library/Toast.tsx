"use client";

import { toast } from "@/hooks/use-toast";

export function ToastSuccess() {
  toast({
    title: "Great Success!",
    description: "Your request was completed successfully.",
  });
}

export function ToastFail(title?: string | null, description?: string | null) {
  toast({
    variant: "destructive",
    title: title ?? "Something went wrong.",
    description: description ?? "There was a problem with your request.",
  });
}
