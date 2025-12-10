// web/src/components/ui/theme/spacing.ts

// 4px base scale
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
  
  export type SpacingKey = keyof typeof spacing;
  
  // Control heights mainly used for buttons/inputs
  export const controlHeights = {
    sm: 28,
    md: 36,
    lg: 44,
  } as const;
  
  export type ControlSizeKey = keyof typeof controlHeights;
  