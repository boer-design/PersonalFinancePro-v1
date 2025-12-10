// web/src/components/ui/theme/typography.ts

export type TextStyle = {
    fontSize: number;     // in px; we’ll convert to rem inside CSS
    lineHeight: number;   // in px
    fontWeight: number;
    letterSpacing: number; // px
  };
  
  const baseFontFamily = '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  
  export const fontFamilies = {
    body: baseFontFamily,
    heading: baseFontFamily,
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  } as const;
  
  // These are taken directly from design-tokens.tokensv1.json /font.heading & /font.body
  // Sizes are in px/line-height from the JSON.
  
  export const headingStyles: Record<
    'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'xxxs' | 'xxxxs',
    TextStyle
  > = {
    xxl: { fontSize: 60, lineHeight: 72, fontWeight: 800, letterSpacing: 0.6 },
    xl: { fontSize: 48, lineHeight: 60, fontWeight: 800, letterSpacing: 0.48 },
    l: { fontSize: 36, lineHeight: 43.2, fontWeight: 800, letterSpacing: 0.36 },
    m: { fontSize: 28, lineHeight: 33.6, fontWeight: 800, letterSpacing: 0.28 },
    s: { fontSize: 24, lineHeight: 28.8, fontWeight: 800, letterSpacing: 0.24 },
    xs: { fontSize: 20, lineHeight: 24, fontWeight: 800, letterSpacing: 0.2 },
    xxs: { fontSize: 16, lineHeight: 19.2, fontWeight: 800, letterSpacing: 0.16 },
    xxxs: { fontSize: 14, lineHeight: 16.8, fontWeight: 800, letterSpacing: 0.14 },
    xxxxs: { fontSize: 12, lineHeight: 14.4, fontWeight: 800, letterSpacing: 0.12 },
  };
  
  export const bodyStyles: Record<
    'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'xxxs' | 'xxxxs',
    TextStyle
  > = {
    xxl: { fontSize: 60, lineHeight: 90, fontWeight: 200, letterSpacing: 0.6 },
    xl: { fontSize: 48, lineHeight: 72, fontWeight: 200, letterSpacing: 0.48 },
    l: { fontSize: 36, lineHeight: 54, fontWeight: 200, letterSpacing: 0.36 },
    m: { fontSize: 28, lineHeight: 42, fontWeight: 200, letterSpacing: 0.28 },
    s: { fontSize: 24, lineHeight: 36, fontWeight: 200, letterSpacing: 0.24 },
    xs: { fontSize: 20, lineHeight: 30, fontWeight: 200, letterSpacing: 0.2 },
    xxs: { fontSize: 16, lineHeight: 24, fontWeight: 400, letterSpacing: 0.16 },
    xxxs: { fontSize: 14, lineHeight: 21, fontWeight: 400, letterSpacing: 0.14 },
    xxxxs: { fontSize: 12, lineHeight: 18, fontWeight: 400, letterSpacing: 0.12 },

  };
  
  // “Semantic” typography scale the app can use.
  export const typography = {
    fontFamily: {
        ui: '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      },
    
      weight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    
      size: {
        xxs: 12,
        xs: 13,
        sm: 14,
        md: 16,
      },
    
      lineHeight: {
        snug: 1.3,
        normal: 1.5,
      },
    // Headlines: dashboard titles, section titles, etc.
    heading: {
      h1: headingStyles.xl,
      h2: headingStyles.l,
      h3: headingStyles.m,
      h4: headingStyles.s,
      h5: headingStyles.xs,
      h6: headingStyles.xxs,
    },
  
    // Body: default text, captions, labels.
    body: {
      lg: bodyStyles.m,
      md: bodyStyles.xs,
      sm: bodyStyles.xxs,
    },
  } as const;

  
  
  export type Typography = typeof typography;
  