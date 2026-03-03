import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "completed" | "failed" | "scheduled" | "critical" | "high" | "medium" | "low" | "running..."
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80": variant === "destructive",
          "text-foreground": variant === "outline",
          "border-low/30 bg-low/10 text-low": variant === "completed",
          "border-critical/30 bg-critical/10 text-critical": variant === "failed",
          "border-border bg-muted/20 text-muted-foreground": variant === "scheduled",
          "border-transparent bg-critical text-white": variant === "critical",
          "border-transparent bg-high text-white": variant === "high",
          "border-transparent bg-medium text-[#1A1A1A]": variant === "medium",
          "border-transparent bg-low text-white": variant === "low",
          "border-border bg-background text-muted-foreground": variant === "running...",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
