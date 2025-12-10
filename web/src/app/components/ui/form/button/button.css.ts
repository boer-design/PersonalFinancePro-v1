
import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";

const { colors, radius, spacing, controlHeights, motion, typography } = tokens;

const bgVar = createVar();
const bgHoverVar = createVar();
const bgActiveVar = createVar();
const textVar = createVar();
const textHoverVar = createVar();
const textActiveVar = createVar();
const borderVar = createVar();

export const buttonBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: `${spacing[2]}px`,
  borderRadius: `${radius.md}px`,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
  fontFamily: typography.fontFamily.ui,
  fontWeight: 900,
  fontSize: `${typography.size.sm}px`,
  lineHeight: typography.lineHeight.snug,
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
  selectors: {
    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${colors.border.focus}`,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.55,
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
      [textVar]: colors.button.signal.neutral.text, // default text on transparent
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
    height: `${controlHeights.sm}px`,
    paddingInline: `${spacing[2]}px`,
  },
  md: {
    height: `${controlHeights.md}px`,
    paddingInline: `${spacing[3]}px`,
  },
  lg: {
    height: `${controlHeights.lg}px`,
    paddingInline: `${spacing[4]}px`,
  },
});

export const fullWidth = style({
  width: "100%",
});

export const iconOnly = style({
  paddingInline: `${spacing[2]}px`,
});
