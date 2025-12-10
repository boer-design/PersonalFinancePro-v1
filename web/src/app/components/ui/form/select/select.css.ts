import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";
import { bodyStyles, headingStyles } from "../../theme/typography";

const { colors, palette, radius, spacing, controlHeights, motion, typography } = tokens;

export const selectVars = {
  root: {
    gap: createVar(),
    minWidth: createVar(),
    labelColor: createVar(),
  },
  trigger: {
    height: createVar(),
    paddingX: createVar(),
    paddingY: createVar(),
    bg: createVar(),
    text: createVar(),
    border: createVar(),
    hoverBg: createVar(),
    hoverBorder: createVar(),
    focusRing: createVar(),
    placeholder: createVar(),
    icon: createVar(),
    openBg: createVar(),
    openBorder: createVar(),
  },
  menu: {
    bg: createVar(),
    border: createVar(),
    shadow: createVar(),
    padding: createVar(),
  },
  option: {
    bg: createVar(),
    hoverBg: createVar(),
    activeBg: createVar(),
    selectedBg: createVar(),
    selectedText: createVar(),
    text: createVar(),
    disabledOpacity: createVar(),
    divider: createVar(),
    indicator: createVar(),
  },
} as const;

export const selectTone = styleVariants({
  purple: {
    vars: {
      [selectVars.trigger.bg]: colors.background.surface,
      [selectVars.trigger.text]: colors.text.primary,
      [selectVars.trigger.border]: colors.border.subtle,
      [selectVars.trigger.hoverBg]: colors.background.subtle,
      [selectVars.trigger.hoverBorder]: colors.border.subtle,
      [selectVars.trigger.focusRing]: colors.border.focus,
      [selectVars.trigger.placeholder]: colors.text.subtle,
      [selectVars.trigger.icon]: colors.text.subtle,
      [selectVars.option.hoverBg]: colors.background.subtle,
      [selectVars.option.activeBg]: colors.background.elevated,
      [selectVars.option.selectedBg]: palette.purple1000,
      [selectVars.option.selectedText]: palette.neutral0,
      [selectVars.option.text]: colors.text.primary,
      [selectVars.option.bg]: colors.background.surface,
      [selectVars.option.divider]: colors.border.subtle,
      [selectVars.option.indicator]: palette.neutral0,
      [selectVars.menu.bg]: palette.purple900,
      [selectVars.menu.border]: colors.border.subtle,
    },
  },
});

export const selectRoot = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  gap: selectVars.root.gap,
  minWidth: selectVars.root.minWidth,
  vars: {
    [selectVars.root.gap]: `${spacing[1]}px`,
    [selectVars.root.minWidth]: "280px",
    [selectVars.root.labelColor]: colors.text.primary,
    [selectVars.trigger.height]: `${controlHeights.lg + spacing[2]}px`,
    [selectVars.trigger.paddingX]: `${spacing[4]}px`,
    [selectVars.trigger.paddingY]: `${spacing[3]}px`,
    [selectVars.trigger.bg]: colors.background.surface,
    [selectVars.trigger.text]: colors.text.primary,
    [selectVars.trigger.border]: colors.border.subtle,
    [selectVars.trigger.hoverBg]: colors.background.subtle,
    [selectVars.trigger.hoverBorder]: colors.border.subtle,
    [selectVars.trigger.focusRing]: colors.border.focus,
    [selectVars.trigger.placeholder]: colors.text.subtle,
    [selectVars.trigger.icon]: colors.text.subtle,
    [selectVars.trigger.openBg]: colors.background.subtle,
    [selectVars.trigger.openBorder]: colors.border.subtle,
    [selectVars.menu.bg]: colors.background.surface,
    [selectVars.menu.border]: colors.border.subtle,
    [selectVars.menu.shadow]: "0 20px 50px rgba(0,0,0,0.4)",
    [selectVars.menu.padding]: "0px",
    [selectVars.option.bg]: colors.background.surface,
    [selectVars.option.hoverBg]: colors.background.subtle,
    [selectVars.option.activeBg]: colors.background.elevated,
    [selectVars.option.selectedBg]: palette.purple1000,
    [selectVars.option.selectedText]: palette.neutral0,
    [selectVars.option.text]: colors.text.primary,
    [selectVars.option.disabledOpacity]: "0.6",
    [selectVars.option.divider]: colors.border.subtle,
    [selectVars.option.indicator]: palette.neutral0,
  },
});

export const selectLabel = style({
  fontSize: `${headingStyles.xxs.fontSize}px`,
  lineHeight: `${headingStyles.xxs.lineHeight}px`,
  fontWeight: headingStyles.xxs.fontWeight,
  letterSpacing: `${headingStyles.xxs.letterSpacing}px`,
  color: selectVars.root.labelColor,
});

export const selectLabelRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing[2],
});

export const selectLabelMeta = style({
  color: colors.text.subtle,
  fontSize: `${bodyStyles.xxxs.fontSize}px`,
  lineHeight: `${bodyStyles.xxxs.lineHeight}px`,
});

export const selectTrigger = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: selectVars.trigger.height,
  paddingInline: selectVars.trigger.paddingX,
  paddingBlock: selectVars.trigger.paddingY,
  backgroundColor: selectVars.trigger.bg,
  color: selectVars.trigger.text,
  borderRadius: radius.lg,
  border: `2px solid ${selectVars.trigger.border}`,
  fontFamily: typography.fontFamily.ui,
  fontSize: `${bodyStyles.xxs.fontSize}px`,
  lineHeight: `${bodyStyles.xxs.lineHeight}px`,
  transition: `border-color ${motion.duration.fast} ${motion.easing.standard}, box-shadow ${motion.duration.fast} ${motion.easing.standard}, background-color ${motion.duration.fast} ${motion.easing.standard}`,
  selectors: {
    "&:hover": {
      borderColor: selectVars.trigger.hoverBorder,
      backgroundColor: selectVars.trigger.hoverBg,
    },
    "&:focus-visible": {
      outline: "none",
      borderColor: selectVars.trigger.focusRing,
      boxShadow: `0 0 0 2px ${selectVars.trigger.focusRing}`,
    },
    "&[data-state='open']": {
      borderColor: selectVars.trigger.openBorder,
      backgroundColor: selectVars.trigger.openBg,
      boxShadow: `0 0 0 2px ${selectVars.trigger.focusRing}`,
    },
    "&[data-placeholder]": {
      color: selectVars.trigger.placeholder,
    },
    "&[data-disabled]": {
      cursor: "not-allowed",
      opacity: selectVars.option.disabledOpacity,
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
  color: selectVars.trigger.icon,
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
});

export const selectAppearance = styleVariants({
  solid: {},
});

export const selectContent = style({
  backgroundColor: selectVars.menu.bg,
  border: "none",
  borderRadius: 0,
  boxShadow: selectVars.menu.shadow,
  overflow: "visible",
  minWidth: "var(--radix-select-trigger-width, 280px)",
  zIndex: 200,
  selectors: {
    "&[data-state='open']": {
      backgroundColor: selectVars.menu.bg,
      boxShadow: selectVars.menu.shadow,
    },
  },
});

export const selectViewport = style({
  padding: selectVars.menu.padding,
  backgroundColor: selectVars.option.bg,
  border: `2px solid ${selectVars.menu.border}`,
  borderRadius: radius.lg,
  overflow: "hidden",
});

export const selectItem = style({
  display: "flex",
  alignItems: "center",
  gap: spacing[2],
  minHeight: `${controlHeights.lg}px`,
  padding: `${spacing[2]}px ${spacing[4]}px`,
  fontSize: `${bodyStyles.xxs.fontSize}px`,
  color: selectVars.option.text,
  backgroundColor: selectVars.option.bg,
  borderBottom: `1px solid ${selectVars.option.divider}`,
  cursor: "pointer",
  transition: `background-color ${motion.duration.fast} ${motion.easing.standard}`,
  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
    "&[data-disabled]": {
      opacity: selectVars.option.disabledOpacity,
      cursor: "not-allowed",
    },
    "&:hover:not([data-disabled])": {
      backgroundColor: selectVars.option.hoverBg,
    },
    "&[data-highlighted]": {
      backgroundColor: selectVars.option.hoverBg,
    },
    "&:active:not([data-disabled])": {
      backgroundColor: selectVars.option.activeBg,
    },
    "&[data-state='checked']": {
      backgroundColor: selectVars.option.selectedBg,
      color: selectVars.option.selectedText,
      fontWeight: typography.weight.bold,
    },
    "&:focus": {
      outline: "none",
      backgroundColor: selectVars.option.hoverBg,
    },
  },
});

export const selectSeparator = style({
  height: spacing[1],
});

export const selectItemIndicator = style({
  marginLeft: "auto",
  color: selectVars.option.indicator,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});
