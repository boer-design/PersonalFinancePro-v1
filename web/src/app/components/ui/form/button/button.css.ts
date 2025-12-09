
import { style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";

const { colors, radius, spacing, controlHeights, motion, typography } = tokens;

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
  fontWeight: typography.weight.semibold,
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
      opacity: 0.5,
      boxShadow: "none",
    },
  },
});

// Variants: primary | secondary | subtle | destructive
export const buttonVariant = styleVariants({
  primary: {
    backgroundColor: colors.button.primary.bg,
    color: colors.button.primary.text,
    borderColor: "transparent",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: colors.button.primary.bgHover,
      },
      "&:active:not(:disabled)": {
        backgroundColor: colors.button.primary.bgActive,
        transform: "translateY(1px)",
      },
    },
  },
  secondary: {
    backgroundColor: colors.button.secondary.bg,
    color: colors.button.secondary.text,
    borderColor: colors.button.secondary.border,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: colors.button.secondary.bgHover,
      },
      "&:active:not(:disabled)": {
        backgroundColor: colors.button.secondary.bgActive,
        transform: "translateY(1px)",
      },
    },
  },
  subtle: {
    backgroundColor: colors.button.subtle.bg,
    color: colors.button.subtle.text,
    borderColor: "transparent",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: colors.button.subtle.bgHover,
      },
      "&:active:not(:disabled)": {
        backgroundColor: colors.button.subtle.bgActive,
        transform: "translateY(1px)",
      },
    },
  },
  destructive: {
    backgroundColor: colors.button.destructive.bg,
    color: colors.button.destructive.text,
    borderColor: "transparent",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: colors.button.destructive.bgHover,
      },
      "&:active:not(:disabled)": {
        backgroundColor: colors.button.destructive.bgActive,
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
