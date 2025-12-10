import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";
import { bodyStyles, headingStyles } from "../../theme/typography";

const { colors, palette, spacing, radius, motion, typography } = tokens;

// Semantic variable map for easier overrides and consistency
export const sideMenuVars = {
  container: {
    bg: createVar(),
    border: createVar(),
  },
  header: {
    titleColor: createVar(),
    subtitleColor: createVar(),
  },
  section: {
    labelColor: createVar(),
  },
  itemButton: {
    height: createVar(),
    paddingX: createVar(),
    paddingY: createVar(),
    radius: createVar(),
    bg: {
      base: createVar(),
      hover: createVar(),
      active: createVar(),
    },
    text: {
      base: createVar(),
      secondary: createVar(),
      active: createVar(),
      disabled: createVar(),
    },
    icon: {
      base: createVar(),
      active: createVar(),
    },
    indicator: {
      active: createVar(),
    },
  },
  badge: {
    bg: createVar(),
    text: createVar(),
    border: createVar(),
  },
  footer: {
    border: createVar(),
    text: createVar(),
  },
} as const;

const badgeBgVar = sideMenuVars.badge.bg;
const badgeTextVar = sideMenuVars.badge.text;
const badgeBorderVar = sideMenuVars.badge.border;

export const menuRoot = style({
  width: "100%",
  maxWidth: 320,
  backgroundColor: sideMenuVars.container.bg,
  border: `2px solid ${sideMenuVars.container.border}`,
  borderRadius: radius.xl,
  padding: `${spacing[4]}px`,
  color: colors.text.primary,
  display: "flex",
  flexDirection: "column",
  gap: spacing[4],
  vars: {
    [sideMenuVars.container.bg]: colors.background.surface,
    [sideMenuVars.container.border]: colors.border.subtle,
    [sideMenuVars.header.titleColor]: colors.text.primary,
    [sideMenuVars.header.subtitleColor]: colors.text.muted,
    [sideMenuVars.section.labelColor]: palette.neutral200,
    [sideMenuVars.itemButton.height]: `calc(${headingStyles.xs.lineHeight}px + ${spacing[2]}px)`,
    [sideMenuVars.itemButton.paddingX]: `${spacing[3]}px`,
    [sideMenuVars.itemButton.paddingY]: `${spacing[2]}px`,
    [sideMenuVars.itemButton.radius]: `${radius.lg}px`,
    [sideMenuVars.itemButton.bg.base]: "transparent",
    [sideMenuVars.itemButton.bg.hover]: colors.background.elevated,
    [sideMenuVars.itemButton.bg.active]: palette.purple600,
    [sideMenuVars.itemButton.text.base]: colors.text.primary,
    [sideMenuVars.itemButton.text.secondary]: colors.text.subtle,
    [sideMenuVars.itemButton.text.active]: palette.neutral0,
    [sideMenuVars.itemButton.text.disabled]: colors.text.disabled,
    [sideMenuVars.itemButton.icon.base]: colors.text.subtle,
    [sideMenuVars.itemButton.icon.active]: palette.neutral0,
    [sideMenuVars.itemButton.indicator.active]: palette.purple500,
    [badgeBgVar]: colors.background.elevated,
    [badgeTextVar]: colors.text.primary,
    [badgeBorderVar]: colors.border.subtle,
    [sideMenuVars.footer.border]: colors.border.subtle,
    [sideMenuVars.footer.text]: colors.text.subtle,
  },
});

export const menuHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[1],
});

export const menuTitle = style({
  fontFamily: typography.fontFamily.ui,
  fontSize: `${headingStyles.xs.fontSize}px`,
  fontWeight: headingStyles.xs.fontWeight,
  letterSpacing: `${headingStyles.xs.letterSpacing}px`,
  color: sideMenuVars.header.titleColor,
});

export const menuSubtitle = style({
  color: sideMenuVars.header.subtitleColor,
  fontSize: `${bodyStyles.xxxs.fontSize}px`,
  fontWeight: bodyStyles.xxxs.fontWeight,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[2],
});

export const sectionLabel = style({
  fontSize: `${headingStyles.xxxs.fontSize}px`,
  letterSpacing: 0.24,
  fontWeight: headingStyles.xxs.fontWeight,
  color: sideMenuVars.section.labelColor,
  textTransform: "uppercase",
});

export const itemList = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[1],
});

export const itemIcon = style({
  width: 20,
  height: 20,
  color: sideMenuVars.itemButton.icon.base,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const itemTexts = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "flex-start",
});

export const itemLabel = style({
  fontSize: `${headingStyles.xxxs.fontSize}px`,
  fontWeight: headingStyles.xxxs.fontWeight,
  letterSpacing: `${headingStyles.xxxs.letterSpacing}px`,
  color: sideMenuVars.itemButton.text.base,
});

export const itemSecondary = style({
  fontSize: `${bodyStyles.xxxxs.fontSize}px`,
  color: sideMenuVars.itemButton.text.secondary,
  lineHeight: typography.lineHeight.normal,
});

export const itemBadge = style({
  marginLeft: "auto",
  padding: `2px ${spacing[2]}px`,
  borderRadius: radius.full,
  fontSize: `${bodyStyles.xxs.fontSize}px`,
  fontWeight: bodyStyles.xxs.fontWeight,
  lineHeight: 1,
  border: `1px solid ${badgeBorderVar}`,
  backgroundColor: badgeBgVar,
  color: badgeTextVar,
});

export const itemBadgeTone = styleVariants({
  neutral: {
    vars: {
      [badgeBgVar]: colors.background.elevated,
      [badgeTextVar]: colors.text.primary,
      [badgeBorderVar]: colors.border.subtle,
    },
  },
  purple: {
    vars: {
      [badgeBgVar]: palette.purple900,
      [badgeTextVar]: palette.purple50,
      [badgeBorderVar]: palette.purple600,
    },
  },
  blue: {
    vars: {
      [badgeBgVar]: palette.blue900,
      [badgeTextVar]: palette.blue50,
      [badgeBorderVar]: palette.blue700,
    },
  },
  red: {
    vars: {
      [badgeBgVar]: palette.red900,
      [badgeTextVar]: palette.red50,
      [badgeBorderVar]: palette.red600,
    },
  },
});

export const itemButton = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: spacing[3],
  width: "100%",
  minHeight: sideMenuVars.itemButton.height,
  paddingInline: sideMenuVars.itemButton.paddingX,
  paddingBlock: sideMenuVars.itemButton.paddingY,
  borderRadius: sideMenuVars.itemButton.radius,
  border: "none",
  background: sideMenuVars.itemButton.bg.base,
  color: sideMenuVars.itemButton.text.base,
  cursor: "pointer",
  fontFamily: typography.fontFamily.ui,
  fontSize: `${typography.size.md}px`,
  fontWeight: typography.weight.medium,
  lineHeight: typography.lineHeight.snug,
  transition: [
    `background-color ${motion.duration.fast} ${motion.easing.standard}`,
    `color ${motion.duration.fast} ${motion.easing.standard}`,
    `transform ${motion.duration.fast} ${motion.easing.standard}`,
    `box-shadow ${motion.duration.fast} ${motion.easing.standard}`,
  ].join(", "),
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      insetBlock: 6,
      left: 0,
      width: 3,
      borderRadius: radius.sm,
      backgroundColor: "transparent",
      transition: `background-color ${motion.duration.fast} ${motion.easing.standard}`,
    },
    "&:hover": {
      backgroundColor: sideMenuVars.itemButton.bg.hover,
    },
    "&:active": {
      backgroundColor: sideMenuVars.itemButton.bg.active,
      transform: "translateY(1px)",
    },
    "&[data-active='true']": {
      backgroundColor: sideMenuVars.itemButton.bg.active,
      color: sideMenuVars.itemButton.text.active,
      selectors: {
        "&::before": { backgroundColor: sideMenuVars.itemButton.indicator.active },
        [`${itemIcon}`]: { color: sideMenuVars.itemButton.icon.active },
        [`${itemSecondary}`]: { color: sideMenuVars.itemButton.text.active },
        [`${itemBadge}`]: { borderColor: sideMenuVars.itemButton.text.active },
      },
    },
    "&[data-disabled='true']": {
      opacity: 0.45,
      color: sideMenuVars.itemButton.text.disabled,
      backgroundColor: sideMenuVars.itemButton.bg.base,
      cursor: "not-allowed",
      pointerEvents: "none",
      selectors: {
        "&::before": { backgroundColor: "transparent" },
      },
    },
  },
});

export const footer = style({
  borderTop: `1px solid ${sideMenuVars.footer.border}`,
  paddingTop: spacing[2],
  color: sideMenuVars.footer.text,
  fontSize: `${typography.size.xs}px`,
  display: "flex",
  alignItems: "center",
  gap: spacing[2],
});
