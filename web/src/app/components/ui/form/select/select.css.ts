import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";

const { colors, radius, spacing, controlHeights, motion, typography } = tokens;

const bgVar = createVar();
const borderVar = createVar();
const textVar = createVar();
const placeholderVar = createVar();
const focusVar = createVar();
const optionHoverVar = createVar();
const triggerBorderVar = createVar();
const triggerBgVar = createVar();
const triggerTextVar = createVar();
const iconVar = createVar();

export const selectTone = styleVariants({
  purple: {
    vars: {
      [bgVar]: colors.button.signal.purple.bg,
      [borderVar]: colors.button.signal.purple.border,
      [textVar]: colors.text.primary,
      [placeholderVar]: colors.text.subtle,
      [focusVar]: colors.border.focus,
      [optionHoverVar]: colors.button.signal.purple.bgHover,
      [triggerBorderVar]: colors.border.subtle,
      [triggerBgVar]: colors.background.surface,
      [triggerTextVar]: colors.text.primary,
      [iconVar]: colors.text.subtle,
    },
  },
});

export const selectRoot = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  gap: spacing[1],
  minWidth: 220,
});

export const selectLabel = style({
  fontSize: typography.size.xs,
  color: colors.text.muted,
});

export const selectTrigger = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: `${controlHeights.md}px`,
  paddingInline: `${spacing[3]}px`,
  backgroundColor: triggerBgVar,
  color: triggerTextVar,
  borderRadius: radius.md,
  border: `1px solid ${triggerBorderVar}`,
  fontFamily: typography.fontFamily.ui,
  fontSize: `${typography.size.sm}px`,
  lineHeight: typography.lineHeight.snug,
  transition: `border-color ${motion.duration.fast} ${motion.easing.standard}, box-shadow ${motion.duration.fast} ${motion.easing.standard}, background-color ${motion.duration.fast} ${motion.easing.standard}`,
  selectors: {
    "&:hover": {
      borderColor: borderVar,
      backgroundColor: colors.background.subtle,
    },
    "&:focus-visible": {
      outline: "none",
      borderColor: focusVar,
      boxShadow: `0 0 0 2px ${focusVar}`,
    },
    "&[data-placeholder=true]": {
      color: placeholderVar,
    },
    "&[data-disabled=true]": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
});

export const selectValue = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const selectIcon = style({
  marginLeft: spacing[2],
  color: iconVar,
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
});

export const selectAppearance = styleVariants({
  solid: {},
});

export const selectContent = style({
  backgroundColor: colors.background.surface,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radius.md,
  boxShadow: `0 20px 50px rgba(0,0,0,0.4)`,
  overflow: "hidden",
  minWidth: 220,
});

export const selectViewport = style({
  padding: spacing[1],
});

export const selectItem = style({
  display: "flex",
  alignItems: "center",
  gap: spacing[2],
  padding: `${spacing[2]}px ${spacing[3]}px`,
  borderRadius: radius.sm,
  fontSize: `${typography.size.sm}px`,
  color: colors.text.primary,
  cursor: "pointer",
  transition: `background-color ${motion.duration.fast} ${motion.easing.standard}`,
  selectors: {
    "&[data-highlighted]": {
      backgroundColor: optionHoverVar,
    },
    "&[data-disabled]": {
      color: colors.text.disabled,
      cursor: "not-allowed",
    },
  },
});

export const selectSeparator = style({
  height: 1,
  backgroundColor: colors.border.subtle,
  margin: `${spacing[1]}px 0`,
});

