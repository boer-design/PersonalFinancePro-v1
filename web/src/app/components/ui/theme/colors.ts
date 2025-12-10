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

    // Greens (success)
    green50: "#caffea",
    green100: "#a0f7d4",
    green200: "#6df6bf",
    green300: "#39f7ab",
    green400: "#05f796",
    green500: "#00c878",
    green600: "#009b5c",
    green700: "#006e41",
    green800: "#004026",
    green900: "#00310c",
    green1000: "#00130b",

    // Yellows (warning)
    yellow50: "#fff9e9",
    yellow100: "#fff6df",
    yellow200: "#ffe8b0",
    yellow300: "#fed777",
    yellow400: "#fcc43f",
    yellow500: "#fab008",
    yellow600: "#c88e03",
    yellow700: "#996a02",
    yellow800: "#664701",
    yellow900: "#332300",
    yellow1000: "#1a1200",
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
      focus: palette.purple500,
    },
    table: {
      bg: palette.neutral900,
      bgHover: palette.purple900,
      },
    badge: {
      neutral: {
        solidBg: palette.neutral800,
        solidBgHover: palette.neutral600,
        solidBgActive: palette.neutral900,
        softBg: palette.neutral900,
        softBgHover: palette.neutral800,
        softBgActive: palette.neutral800,
        textOnSolid: palette.neutral0,
        textOnSoft: palette.neutral100,
        border: palette.neutral600,
      },
      purple: {
        solidBg: palette.purple500,
        solidBgHover: palette.purple400,
        solidBgActive: palette.purple600,
        softBg: palette.purple900,
        softBgHover: palette.purple800,
        softBgActive: palette.purple800,
        textOnSolid: palette.neutral0,
        textOnSoft: palette.purple100,
        border: palette.purple400,
      },
      blue: {
        solidBg: palette.blue600,
        solidBgHover: palette.blue500,
        solidBgActive: palette.blue700,
        softBg: palette.blue900,
        softBgHover: palette.blue800,
        softBgActive: palette.blue800,
        textOnSolid: palette.neutral0,
        textOnSoft: palette.blue100,
        border: palette.blue500,
      },
      red: {
        solidBg: palette.red500,
        solidBgHover: palette.red400,
        solidBgActive: palette.red600,
        softBg: palette.red900,
        softBgHover: palette.red800,
        softBgActive: palette.red800,
        textOnSolid: palette.neutral0,
        textOnSoft: palette.red100,
        border: palette.red400,
      },
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
  
