import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CallOutProps {
  children?: ReactNode;
  type?: "default" | "warning" | "danger";
}

export function Callout({
  children,
  type = "default",
  ...props
}: CallOutProps) {
  return (
    <div
      className={cn(
        "my-6 items-center rounded-md border-l-4 p-4 w-full dark:max-w-none",
        {
          "border-red-900 bg-red-50 dark:prose": type === "default",
          "border-yellow-900 bg-yellow-50 dark:prose": type === "warning",
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
}
