// web/src/components/ui/theme/zIndex.ts

export const zIndex = {
    base: 0,
    header: 10,
    overlay: 20,
    modal: 30,
    toast: 40,
    tooltip: 50,
  } as const;
  
  export type ZIndex = keyof typeof zIndex;
  