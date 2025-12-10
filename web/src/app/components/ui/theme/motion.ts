// web/src/components/ui/theme/motion.ts

export const motion = {
    duration: {
      fast: "120ms",
      normal: "180ms",
      slow: "240ms",
    },
    easing: {
      standard: "cubic-bezier(0.2, 0.0, 0.2, 1)",
      decelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
      accelerate: "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
    },
  } as const;
  