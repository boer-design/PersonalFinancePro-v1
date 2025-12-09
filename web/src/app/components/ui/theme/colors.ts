// web/src/components/ui/theme/colors.ts

// 1) Raw palette, closely mirroring your design-tokens JSON names.
//    These values come from design-tokens.tokensv1.json (neutral / purple / blue / red).
//    You can expand or tweak as needed.

export const rawColors = {
    // neutral
    'neutral-0': '#ffffffff',
    'neutral-50': '#f3f2f3ff',
    'neutral-100': '#e7e4e7ff',
    'neutral-200': '#cecaceff',
    'neutral-300': '#b6afb6ff',
    'neutral-400': '#9d959dff',
    'neutral-500': '#857a85ff',
    'neutral-600': '#6a626aff',
    'neutral-800': '#353135ff',
    'neutral-900': '#1b181bff',
    'neutral-1000': '#131113ff',
  
    // purple
    'purple-50': '#f1edffff',
    'purple-100': '#ddd5f6ff',
    'purple-200': '#baaaeeff',
    'purple-300': '#9880e5ff',
    'purple-400': '#7556dcff',
    'purple-500': '#532bd4ff',
    'purple-600': '#4223a9ff',
    'purple-800': '#211155ff',
    'purple-900': '#11092aff',
    'purple-1000': '#0c061eff',
  
    // blue
    'blue-50': '#e8fbfdff',
    'blue-100': '#d0f7fbff',
    'blue-200': '#a1f0f7ff',
    'blue-300': '#72e8f3ff',
    'blue-400': '#43e0efff',
    'blue-500': '#14d9ebff',
    'blue-600': '#10adbcff',
    'blue-700': '#0c828dff',
    'blue-800': '#08575eff',
    'blue-900': '#042b2fff',
    'blue-1000': '#031e21ff',
  
    // red
    'red-50': '#fbe9e9ff',
    'red-100': '#f7d4d4ff',
    'red-200': '#f0a8a8ff',
    'red-300': '#e87d7dff',
    'red-400': '#e05252ff',
    'red-500': '#d92626ff',
    'red-600': '#ad1f1fff',
    'red-700': '#821717ff',
    'red-800': '#570f0fff',
    'red-900': '#2b0808ff',
    'red-1000': '#1e0505ff',
  } as const;
  
  export type RawColorName = keyof typeof rawColors;
  
  // 2) Semantic aliases: what components will actually use.
  //    This is where we decide “app background”, “card surface”, “primary button”, etc.
  //    Based on: dark-ish UI, finance dashboard, and your palette.
  
  export const semanticColors = {
    // App backgrounds
    appBackground: rawColors['neutral-1000'],
    appForeground: rawColors['neutral-0'],
  
    surface: rawColors['neutral-900'],
    surfaceSubtle: rawColors['neutral-800'],
    surfaceElevated: rawColors['neutral-800'],
    surfaceMuted: rawColors['neutral-600'],
  
    // Borders
    borderSubtle: rawColors['neutral-800'],
    borderDefault: rawColors['neutral-600'],
    borderStrong: rawColors['neutral-400'],
    borderFocus: rawColors['blue-500'],
  
    // Text
    textPrimary: rawColors['neutral-0'],
    textSecondary: rawColors['neutral-300'],
    textMuted: rawColors['neutral-400'],
    textOnAccent: rawColors['neutral-0'],
    textOnInverted: rawColors['neutral-1000'],
  
    // Brand / accent
    brandPrimary: rawColors['blue-500'],
    brandPrimarySoft: rawColors['blue-300'],
    brandPrimaryStrong: rawColors['blue-600'],
  
    brandSecondary: rawColors['purple-500'],
    brandSecondarySoft: rawColors['purple-300'],
    brandSecondaryStrong: rawColors['purple-600'],
  
    // Status
    success: rawColors['blue-600'], // using blue as “positive” in this palette for now
    successSoft: rawColors['blue-100'],
    danger: rawColors['red-500'],
    dangerSoft: rawColors['red-100'],
    warning: rawColors['red-300'], // can introduce a dedicated yellow later
    warningSoft: rawColors['red-50'],
    info: rawColors['blue-400'],
    infoSoft: rawColors['blue-100'],
  
    // UI controls (we’ll reuse in Button/Input/etc)
    controlBackground: rawColors['neutral-900'],
    controlBackgroundSubtle: rawColors['neutral-800'],
    controlBorder: rawColors['neutral-600'],
    controlPlaceholder: rawColors['neutral-400'],
    controlDisabledBg: rawColors['neutral-900'],
    controlDisabledText: rawColors['neutral-600'],
  
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.5)',
  } as const;
  
  export type SemanticColorName = keyof typeof semanticColors;
  