// web/src/components/ui/theme/colors.ts

// Raw palette from design-tokens.tokensv1.json (alpha stripped)
export const palette = {
    // Neutrals
    neutral0: "#ffffff",
    neutral50: "#f3f2f3",
    neutral100: "#e7e4e7",
    neutral200: "#cecace",
    neutral300: "#b6afb6",
    neutral400: "#9d959d",
    neutral500: "#857a85",
    neutral600: "#6a626a",
    neutral800: "#353135",
    neutral900: "#1b181b",
    neutral1000: "#131113",
  
    // Purples (brand)
    purple50: "#f1edff",
    purple100: "#ddd5f6",
    purple200: "#baaaee",
    purple300: "#9880e5",
    purple400: "#7556dc",
    purple500: "#532bd4",
    purple600: "#4223a9",
    purple800: "#211155",
    purple900: "#11092a",
    purple1000: "#0c061e",
  
    // Blues (support / info)
    blue50: "#e8fbfd",
    blue100: "#d0f7fb",
    blue200: "#a1f0f7",
    blue300: "#72e8f3",
    blue400: "#43e0ef",
    blue500: "#14d9eb",
    blue600: "#10adbc",
    blue700: "#0c828d",
    blue800: "#08575e",
    blue900: "#042b2f",
    blue1000: "#031e21",
  
    // Reds (danger)
    red50: "#fbe9e9",
    red100: "#f7d4d4",
    red200: "#f0a8a8",
    red300: "#e87d7d",
    red400: "#e05252",
    red500: "#d92626",
    red600: "#ad1f1f",
    red700: "#821717",
    red800: "#570f0f",
    red900: "#2b0808",
    red1000: "#1e0505",
  } as const;
  
  export type PaletteKey = keyof typeof palette;
  
  // Semantic colors used by components.
  // We’ll expand this over time; for Button we only need a subset.
  export const semanticColors = {
    background: {
      app: palette.neutral1000,
      surface: palette.neutral900,
      elevated: palette.neutral800,
      subtle: palette.neutral800,

    },
    text: {
      primary: palette.neutral0,
      muted: palette.neutral300,
      subtle: palette.neutral400,
      inverse: palette.neutral1000,
      disabled: palette.neutral600,
    },
    border: {
      subtle: palette.neutral800,
      strong: palette.neutral600,
      focus: palette.blue500,
    },
    table: {
      bg: palette.neutral900,
      bgHover: palette.purple900,
      },
    
    button: {
      primary: {
        bg: palette.neutral0,
        bgHover: palette.neutral50,
        bgActive: palette.neutral100,
        text: palette.neutral1000,
      },
      secondary: {
        bg: palette.neutral900,
        bgHover: palette.neutral800,
        bgActive: palette.neutral800,
        text: palette.neutral0,
        border: palette.neutral600,
      },
      subtle: {
        bg: "transparent",
        bgHover: palette.neutral900,
        bgActive: palette.neutral800,
        text: palette.neutral0,
      },
      signal: {
        purple: {
          bg: palette.purple500,
          bgHover: palette.purple400,
          bgActive: palette.purple600,
          text: palette.neutral0,
          border: palette.purple500,
        },
        blue: {
          bg: palette.blue600,
          bgHover: palette.blue500,
          bgActive: palette.blue700,
          text: palette.neutral0,
          border: palette.blue600,
        },
        red: {
        bg: palette.red500,
        bgHover: palette.red400,
        bgActive: palette.red600,
        text: palette.neutral0,
          border: palette.red500,
        },
        neutral: {
          bg: palette.neutral0,
          bgHover: palette.neutral50,
          bgActive: palette.neutral100,
          text: palette.neutral0,
          hoverText: palette.neutral1000,
          border: palette.neutral200,
        },
      },
    },
  } as const;
  
  export type SemanticColors = typeof semanticColors;
  