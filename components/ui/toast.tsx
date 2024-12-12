import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/app/lib/utils";

export type ToastProps = ToastPrimitives.ToastProps;
export type ToastActionElement = React.ReactElement;

export function ToastProvider({
  children,
  ...props
}: ToastPrimitives.ToastProviderProps) {
  return (
    <ToastPrimitives.Provider {...props}>{children}</ToastPrimitives.Provider>
  );
}

export function Toast({ className, ...props }: ToastProps) {
  return (
    <ToastPrimitives.Root
      className={cn("bg-white rounded-md shadow-lg p-4", className)}
      {...props}
    />
  );
}
