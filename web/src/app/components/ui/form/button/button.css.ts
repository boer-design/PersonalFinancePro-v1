import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";
import { headingStyles } from "../../theme/typography";

const { colors, radius, spacing, motion, typography } = tokens;

// Semantic variable map for buttons
export const buttonVars = {
  color: {
    bg: createVar(),
    bgHover: createVar(),
    bgActive: createVar(),
    text: createVar(),
    textHover: createVar(),
    textActive: createVar(),
    border: createVar(),
    focusRing: createVar(),
  },
  layout: {
    gap: createVar(),
    radius: createVar(),
    paddingSm: createVar(),
    paddingMd: createVar(),
    paddingLg: createVar(),
    heightSm: createVar(),
    heightMd: createVar(),
    heightLg: createVar(),
    borderWidth: createVar(),
  },
  state: {
    disabledOpacity: createVar(),
  },
  typography: {
    fontFamily: createVar(),
    fontWeight: createVar(),
    fontSize: createVar(),
    lineHeight: createVar(),
  },
} as const;

const bgVar = buttonVars.color.bg;
const bgHoverVar = buttonVars.color.bgHover;
const bgActiveVar = buttonVars.color.bgActive;
const textVar = buttonVars.color.text;
const textHoverVar = buttonVars.color.textHover;
const textActiveVar = buttonVars.color.textActive;
const borderVar = buttonVars.color.border;

export const buttonBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: buttonVars.layout.gap,
  borderRadius: buttonVars.layout.radius,
  borderWidth: buttonVars.layout.borderWidth,
  borderStyle: "solid",
  borderColor: "transparent",
  fontFamily: buttonVars.typography.fontFamily,
  fontWeight: buttonVars.typography.fontWeight,
  fontSize: buttonVars.typography.fontSize,
  lineHeight: buttonVars.typography.lineHeight,
  cursor: "pointer",
  whiteSpace: "nowrap",
  textDecoration: "none",
  outline: "none",
  transition: [
    `background-color ${motion.duration.fast} ${motion.easing.standard}`,
    `color ${motion.duration.fast} ${motion.easing.standard}`,
    `border-color ${motion.duration.fast} ${motion.easing.standard}`,
    `box-shadow ${motion.duration.fast} ${motion.easing.standard}`,
    `transform ${motion.duration.fast} ${motion.easing.standard}`,
  ].join(", "),
  vars: {
    [buttonVars.layout.gap]: `${spacing[2]}px`,
    [buttonVars.layout.radius]: `${radius.md}px`,
    [buttonVars.layout.paddingSm]: `${spacing[3]}px`,
    [buttonVars.layout.paddingMd]: `${spacing[4]}px`,
    [buttonVars.layout.paddingLg]: `${spacing[6]}px`,
    [buttonVars.layout.heightSm]: `${headingStyles.xxxs.lineHeight}px`,
    [buttonVars.layout.heightMd]: `${headingStyles.xxs.lineHeight}px`,
    [buttonVars.layout.heightLg]: `${headingStyles.xs.lineHeight}px`,
    [buttonVars.layout.borderWidth]: "1px",
    [buttonVars.color.bg]: colors.button.signal.purple.bg,
    [buttonVars.color.bgHover]: colors.button.signal.purple.bgHover,
    [buttonVars.color.bgActive]: colors.button.signal.purple.bgActive,
    [buttonVars.color.text]: colors.button.signal.purple.text,
    [buttonVars.color.textHover]: colors.button.signal.purple.text,
    [buttonVars.color.textActive]: colors.button.signal.purple.text,
    [buttonVars.color.border]: colors.button.signal.purple.border,
    [buttonVars.color.focusRing]: colors.border.focus,
    [buttonVars.state.disabledOpacity]: "0.55",
    [buttonVars.typography.fontFamily]: typography.fontFamily.ui,
    [buttonVars.typography.fontWeight]: `${headingStyles.xxs.fontWeight}`,
    [buttonVars.typography.fontSize]: `${headingStyles.xxs.fontSize}px`,
    [buttonVars.typography.lineHeight]: `${headingStyles.xxs.lineHeight}px`,
  },
  selectors: {
    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${buttonVars.color.focusRing}`,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: buttonVars.state.disabledOpacity,
      boxShadow: "none",
    },
  },
});

// Tone sets color variables for the button; appearance consumes them.
export const buttonTone = styleVariants({
  purple: {
    vars: {
      [bgVar]: colors.button.signal.purple.bg,
      [bgHoverVar]: colors.button.signal.purple.bgHover,
      [bgActiveVar]: colors.button.signal.purple.bgActive,
      [textVar]: colors.button.signal.purple.text,
      [textHoverVar]: colors.button.signal.purple.text,
      [textActiveVar]: colors.button.signal.purple.text,
      [borderVar]: colors.button.signal.purple.border,
    },
  },
  blue: {
    vars: {
      [bgVar]: colors.button.signal.blue.bg,
      [bgHoverVar]: colors.button.signal.blue.bgHover,
      [bgActiveVar]: colors.button.signal.blue.bgActive,
      [textVar]: colors.button.signal.blue.text,
      [textHoverVar]: colors.button.signal.blue.text,
      [textActiveVar]: colors.button.signal.blue.text,
      [borderVar]: colors.button.signal.blue.border,
    },
  },
  red: {
    vars: {
      [bgVar]: colors.button.signal.red.bg,
      [bgHoverVar]: colors.button.signal.red.bgHover,
      [bgActiveVar]: colors.button.signal.red.bgActive,
      [textVar]: colors.button.signal.red.text,
      [textHoverVar]: colors.button.signal.red.text,
      [textActiveVar]: colors.button.signal.red.text,
      [borderVar]: colors.button.signal.red.border,
    },
  },
  neutral: {
    vars: {
      [bgVar]: colors.button.signal.neutral.bg,
      [bgHoverVar]: colors.button.signal.neutral.bgHover,
      [bgActiveVar]: colors.button.signal.neutral.bgActive,
      [textVar]: colors.button.signal.neutral.text,
      [textHoverVar]: colors.button.signal.neutral.hoverText ?? colors.text.inverse,
      [textActiveVar]: colors.button.signal.neutral.hoverText ?? colors.text.inverse,
      [borderVar]: colors.button.signal.neutral.border,
    },
  },
});

// Appearances: primary (filled), secondary (outline), tertiary (ghost)
export const buttonAppearance = styleVariants({
  primary: {
    backgroundColor: bgVar,
    color: textVar,
    borderColor: "transparent",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: bgHoverVar,
      },
      "&:active:not(:disabled)": {
        backgroundColor: bgActiveVar,
        transform: "translateY(1px)",
      },
    },
  },
  secondary: {
    backgroundColor: "transparent",
    color: textVar,
    borderColor: borderVar,
    borderWidth: "2px",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: bgHoverVar,
        color: textHoverVar,
      },
      "&:active:not(:disabled)": {
        backgroundColor: bgActiveVar,
        color: textActiveVar,
        transform: "translateY(1px)",
      },
    },
  },
  tertiary: {
    backgroundColor: "transparent",
    color: textVar,
    borderColor: "transparent",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: bgHoverVar,
        color: textHoverVar,
      },
      "&:active:not(:disabled)": {
        backgroundColor: bgActiveVar,
        color: textActiveVar,
        transform: "translateY(1px)",
      },
    },
  },
});

export const buttonSize = styleVariants({
  sm: {
    height: buttonVars.layout.heightSm,
    padding: buttonVars.layout.paddingSm,
  },
  md: {
    height: buttonVars.layout.heightMd,
    padding: buttonVars.layout.paddingMd,
  },
  lg: {
    height: buttonVars.layout.heightLg,
    padding: buttonVars.layout.paddingLg,
  },
});

export const fullWidth = style({
  width: "100%",
});

export const iconOnly = style({
  padding: buttonVars.layout.paddingSm,
});
