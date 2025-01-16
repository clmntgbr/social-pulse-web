"use client";

import { dispatch, toast } from "@/hooks/use-toast";

export function ToastSuccess() {
  toast({
    id: "success",
    variant: "default",
    title: "Great Success!",
    description: "Your request was completed successfully.",
  });

  setTimeout(() => {
    dispatch({ type: "DISMISS_TOAST", toastId: "success" });
    dispatch({ type: "DISMISS_TOAST", toastId: "fail" });
  }, 4000);
}

export function ToastFail(title?: string | null, description?: string | null) {
  toast({
    id: "fail",
    variant: "destructive",
    title: title ?? "Something went wrong.",
    description: description ?? "There was a problem with your request.",
  });

  setTimeout(() => {
    dispatch({ type: "DISMISS_TOAST", toastId: "success" });
    dispatch({ type: "DISMISS_TOAST", toastId: "fail" });
  }, 4000);
}
