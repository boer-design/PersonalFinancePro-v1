import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";

const { colors, radius, spacing, motion, typography } = tokens;

const softBgVar = createVar();
const softHoverBgVar = createVar();
const softActiveBgVar = createVar();
const softTextVar = createVar();
const borderVar = createVar();

export const badgeBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: `${spacing[1]}px`,
  borderRadius: radius.full,
  border: "1px solid transparent",
  fontFamily: typography.fontFamily.ui,
  fontWeight: typography.weight.semibold,
  letterSpacing: 0.12,
  lineHeight: 1,
  cursor: "default",
  transition: [
    `background-color ${motion.duration.fast} ${motion.easing.standard}`,
    `color ${motion.duration.fast} ${motion.easing.standard}`,
    `border-color ${motion.duration.fast} ${motion.easing.standard}`,
    `box-shadow ${motion.duration.fast} ${motion.easing.standard}`,
    `transform ${motion.duration.fast} ${motion.easing.standard}`,
  ].join(", "),
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: 1,
    },
  },
});

export const badgeSize = styleVariants({
  sm: {
    height: 22,
    paddingInline: `${spacing[2]}px`,
    fontSize: `${typography.size.xs}px`,
  },
  md: {
    height: 28,
    paddingInline: `${spacing[3]}px`,
    fontSize: `${typography.size.sm}px`,
  },
});

export const badgeTone = styleVariants({
  neutral: {
    vars: {
      [softBgVar]: colors.badge.neutral.softBg,
      [softHoverBgVar]: colors.badge.neutral.softBgHover,
      [softActiveBgVar]: colors.badge.neutral.softBgActive,
      [softTextVar]: colors.badge.neutral.textOnSoft,
      [borderVar]: colors.badge.neutral.border,
    },
  },
  purple: {
    vars: {
      [softBgVar]: colors.badge.purple.softBg,
      [softHoverBgVar]: colors.badge.purple.softBgHover,
      [softActiveBgVar]: colors.badge.purple.softBgActive,
      [softTextVar]: colors.badge.purple.textOnSoft,
      [borderVar]: colors.badge.purple.border,
    },
  },
  blue: {
    vars: {
      [softBgVar]: colors.badge.blue.softBg,
      [softHoverBgVar]: colors.badge.blue.softBgHover,
      [softActiveBgVar]: colors.badge.blue.softBgActive,
      [softTextVar]: colors.badge.blue.textOnSoft,
      [borderVar]: colors.badge.blue.border,
    },
  },
  red: {
    vars: {
      [softBgVar]: colors.badge.red.softBg,
      [softHoverBgVar]: colors.badge.red.softBgHover,
      [softActiveBgVar]: colors.badge.red.softBgActive,
      [softTextVar]: colors.badge.red.textOnSoft,
      [borderVar]: colors.badge.red.border,
    },
  },
});

export const badgeAppearanceSoft = style({
  backgroundColor: softBgVar,
  color: softTextVar,
  borderColor: borderVar,
  selectors: {
    "&:hover": {
      backgroundColor: softHoverBgVar,
    },
    "&:active": {
      backgroundColor: softActiveBgVar,
      transform: "translateY(1px)",
    },
  },
});

export const badgeDot = style({
  width: 8,
  height: 8,
  borderRadius: radius.full,
  backgroundColor: borderVar,
  flexShrink: 0,
});

export const badgeIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "inherit",
  flexShrink: 0,
});

export const badgeLabel = style({
  display: "inline-flex",
  alignItems: "center",
});
