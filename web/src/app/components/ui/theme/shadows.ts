// web/src/components/ui/theme/shadows.ts

export const shadows = {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 10px rgba(0, 0, 0, 0.35)',
    lg: '0 12px 30px rgba(0, 0, 0, 0.45)',
  } as const;
  
  export type ShadowScale = keyof typeof shadows;
  