// web/src/components/ui/theme/spacing.ts

// 4px base grid
export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
  } as const;
  
  export type SpacingScale = keyof typeof spacing;
  
  // Common control heights
  export const controlHeights = {
    sm: 28,
    md: 36,
    lg: 44,
  } as const;
  
  export type ControlSize = keyof typeof controlHeights;
  