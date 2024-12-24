"use client";

import { toast } from "@/hooks/use-toast";

export function ToastSuccess() {
  toast({
    id: "success",
    variant: "default",
    title: "Great Success!",
    description: "Your request was completed successfully.",
  });
}

export function ToastFail(title?: string | null, description?: string | null) {
  toast({
    id: "fail",
    variant: "destructive",
    title: title ?? "Something went wrong.",
    description: description ?? "There was a problem with your request.",
  });
}
