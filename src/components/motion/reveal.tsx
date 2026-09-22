"use client";

import { motion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before starting. */
  delay?: number;
  /** Vertical travel in pixels. */
  y?: number;
  /** `mount` animates immediately; `view` waits until the element scrolls into view. */
  mode?: "mount" | "view";
};

/**
 * Fade-and-rise entrance. Transform animations are dropped automatically under
 * `prefers-reduced-motion` thanks to the `MotionConfig reducedMotion="user"` provider.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  mode = "view",
}: RevealProps) {
  const hidden = { opacity: 0, y };
  const shown = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(mode === "mount"
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "0px 0px -12% 0px" } })}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
