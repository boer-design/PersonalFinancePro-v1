import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";
import { bodyStyles, headingStyles } from "../../theme/typography";

const { colors, palette, radius, spacing, motion } = tokens;

const accentVar = createVar();
const accentSoftVar = createVar();
const overlayVar = createVar();
const surfaceVar = createVar();
const borderVar = createVar();
const textVar = createVar();
const mutedVar = createVar();
const closeBgVar = createVar();
const closeBorderVar = createVar();
const closeTextVar = createVar();
const closeBgHoverVar = createVar();
const closeBorderHoverVar = createVar();
const shadowVar = createVar();

export const dialogTone = styleVariants({
  purple: {
    vars: {
      [accentVar]: palette.purple500,
      [accentSoftVar]: palette.purple900,
    },
  },
  blue: {
    vars: {
      [accentVar]: palette.blue500,
      [accentSoftVar]: palette.blue900,
    },
  },
  neutral: {
    vars: {
      [accentVar]: palette.neutral300,
      [accentSoftVar]: palette.neutral900,
    },
  },
});

export const dialogOverlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: overlayVar,
  backdropFilter: "blur(10px)",
  zIndex: 100,
  vars: {
    [overlayVar]: "rgba(12, 9, 14, 0.6)",
  },
});

export const dialogContent = style({
  position: "fixed",
  zIndex: 101,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(560px, calc(100vw - 32px))",
  maxHeight: "calc(100vh - 48px)",
  overflow: "auto",
  backgroundColor: surfaceVar,
  border: `1px solid ${borderVar}`,
  borderRadius: radius.xl,
  boxShadow: shadowVar,
  padding: `${spacing[6]}px`,
  color: textVar,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing[5]}px`,
  outline: "none",
  vars: {
    [surfaceVar]: colors.background.surface,
    [borderVar]: colors.border.subtle,
    [textVar]: colors.text.primary,
    [mutedVar]: colors.text.primary,
    [accentVar]: palette.purple500,
    [accentSoftVar]: palette.purple900,
    [closeBgVar]: palette.neutral0,
    [closeBorderVar]: palette.neutral200,
    [closeTextVar]: palette.neutral1000,
    [closeBgHoverVar]: palette.neutral100,
    [closeBorderHoverVar]: palette.neutral400,
    [shadowVar]: "0 30px 90px rgba(0,0,0,0.45)",
  },
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: 2,
    },
  },
});

export const dialogHeader = style({
  display: "flex",
  alignItems: "flex-start",
  gap: `${spacing[3]}px`,
});

export const dialogHeaderText = style({
  display: "grid",
  gap: `${spacing[1]}px`,
  flex: 1,
  minWidth: 0,
});

export const dialogIcon = style({
  width: 32,
  height: 32,
  borderRadius: radius.full,
  backgroundColor: accentSoftVar,
  color: accentVar,
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
});

export const dialogTitle = style({
  fontSize: `${headingStyles.xxs.fontSize}px`,
  lineHeight: `${headingStyles.xxs.lineHeight}px`,
  fontWeight: headingStyles.xxs.fontWeight,
  letterSpacing: `${headingStyles.xxs.letterSpacing}px`,
  color: textVar,
});

export const dialogDescription = style({
  fontSize: `${bodyStyles.xxs.fontSize}px`,
  lineHeight: `${bodyStyles.xxs.lineHeight}px`,
  color: mutedVar,
});

export const dialogBody = style({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing[4]}px`,
  color: textVar,
});

export const dialogFooter = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: `${spacing[3]}px`,
  paddingTop: `${spacing[6]}px`,
});

export const dialogClose = style({
  appearance: "none",
  background: closeBgVar,
  border: `1px solid ${closeBorderVar}`,
  borderRadius: radius.sm,
  color: closeTextVar,
  padding: `${spacing[1]}px`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  transition: [
    `background-color ${motion.duration.fast} ${motion.easing.standard}`,
    `color ${motion.duration.fast} ${motion.easing.standard}`,
    `border-color ${motion.duration.fast} ${motion.easing.standard}`,
  ].join(", "),
  selectors: {
    "&:hover": {
      backgroundColor: closeBgHoverVar,
      color: closeTextVar,
      borderColor: closeBorderHoverVar,
    },
    "&:focus-visible": {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: 2,
    },
  },
});
