"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* `reducedMotion="user"` disables transform and layout animations when the OS asks for reduced motion. */}
      <MotionConfig reducedMotion="user">
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
