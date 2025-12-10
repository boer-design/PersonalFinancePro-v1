// web/src/components/ui/theme/radius.ts

export const radius = {
    xs: 3,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  } as const;
  
  export type RadiusKey = keyof typeof radius;
  