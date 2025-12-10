import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";
import { bodyStyles, headingStyles } from "../../theme/typography";

const { colors, palette, radius, spacing, controlHeights, motion, typography } = tokens;

export const inputVars = {
  root: {
    gap: createVar(),
    minWidth: createVar(),
    labelColor: createVar(),
    messageColor: createVar(),
  },
  field: {
    height: createVar(),
    paddingX: createVar(),
    paddingY: createVar(),
    bg: createVar(),
    text: createVar(),
    placeholder: createVar(),
    border: createVar(),
    hoverBorder: createVar(),
    focusBorder: createVar(),
    focusRing: createVar(),
    radius: createVar(),
    shadow: createVar(),
    disabledOpacity: createVar(),
    caret: createVar(),
  },
  adornment: {
    color: createVar(),
    bg: createVar(),
    border: createVar(),
  },
  status: {
    iconColor: createVar(),
  },
} as const;

export const inputRoot = style({
  display: "inline-flex",
  flexDirection: "column",
  gap: inputVars.root.gap,
  width: "100%",
  minWidth: inputVars.root.minWidth,
  vars: {
    [inputVars.root.gap]: `${spacing[1]}px`,
    [inputVars.root.minWidth]: "280px",
    [inputVars.root.labelColor]: colors.text.primary,
    [inputVars.root.messageColor]: colors.text.subtle,
    [inputVars.field.height]: `${controlHeights.lg + spacing[2]}px`,
    [inputVars.field.paddingX]: `${spacing[4]}px`,
    [inputVars.field.paddingY]: `${spacing[3]}px`,
    [inputVars.field.bg]: colors.background.surface,
    [inputVars.field.text]: colors.text.primary,
    [inputVars.field.placeholder]: colors.text.subtle,
    [inputVars.field.border]: colors.border.subtle,
    [inputVars.field.hoverBorder]: colors.border.subtle,
    [inputVars.field.focusBorder]: colors.border.focus,
    [inputVars.field.focusRing]: colors.border.focus,
    [inputVars.field.radius]: `${radius.lg}px`,
    [inputVars.field.shadow]: "none",
    [inputVars.field.disabledOpacity]: "0.55",
    [inputVars.field.caret]: palette.purple400,
    [inputVars.adornment.color]: colors.text.primary,
    [inputVars.adornment.bg]: colors.background.subtle,
    [inputVars.adornment.border]: colors.border.subtle,
    [inputVars.status.iconColor]: colors.text.subtle,
  },
});

export const inputFullWidth = style({
  width: "100%",
  minWidth: 0,
});

export const inputLabelRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing[2],
});

export const inputLabel = style({
  fontSize: `${headingStyles.xxs.fontSize}px`,
  lineHeight: `${headingStyles.xxs.lineHeight}px`,
  fontWeight: headingStyles.xxs.fontWeight,
  letterSpacing: `${headingStyles.xxs.letterSpacing}px`,
  color: inputVars.root.labelColor,
});

export const inputLabelMeta = style({
  color: colors.text.subtle,
  fontSize: `${bodyStyles.xxxs.fontSize}px`,
  lineHeight: `${bodyStyles.xxxs.lineHeight}px`,
});

export const inputControl = style({
  display: "inline-flex",
  alignItems: "center",
  gap: spacing[2],
  height: inputVars.field.height,
  paddingInline: inputVars.field.paddingX,
  paddingBlock: inputVars.field.paddingY,
  backgroundColor: inputVars.field.bg,
  color: inputVars.field.text,
  borderRadius: inputVars.field.radius,
  border: `2px solid ${inputVars.field.border}`,
  boxShadow: inputVars.field.shadow,
  transition: [
    `border-color ${motion.duration.fast} ${motion.easing.standard}`,
    `box-shadow ${motion.duration.fast} ${motion.easing.standard}`,
    `background-color ${motion.duration.fast} ${motion.easing.standard}`,
  ].join(", "),
  selectors: {
    "&:hover": {
      borderColor: inputVars.field.hoverBorder,
    },
    "&:focus-within": {
      borderColor: inputVars.field.focusBorder,
      boxShadow: `0 0 0 2px ${inputVars.field.focusRing}`,
    },
    "&[data-disabled='true']": {
      opacity: inputVars.field.disabledOpacity,
      cursor: "not-allowed",
      boxShadow: "none",
    },
  },
});

export const inputElement = style({
  flex: 1,
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  border: "none",
  color: inputVars.field.text,
  fontFamily: typography.fontFamily.ui,
  fontSize: `${bodyStyles.xxs.fontSize}px`,
  lineHeight: `${bodyStyles.xxs.lineHeight}px`,
  caretColor: inputVars.field.caret,
  selectors: {
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: inputVars.field.placeholder,
    },
    "&:disabled": {
      cursor: "not-allowed",
    },
  },
});

export const inputAdornment = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing[1],
  paddingInline: spacing[2],
  paddingBlock: spacing[1],
  borderRadius: radius.md,
  backgroundColor: inputVars.adornment.bg,
  color: inputVars.adornment.color,
  border: `1px solid ${inputVars.adornment.border}`,
  fontFamily: typography.fontFamily.ui,
  fontSize: `${bodyStyles.xxxs.fontSize}px`,
  lineHeight: `${bodyStyles.xxxs.lineHeight}px`,
  whiteSpace: "nowrap",
});

export const inputStatusIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: inputVars.status.iconColor,
});

export const inputMessageRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing[2],
});

export const inputMessage = style({
  display: "inline-flex",
  alignItems: "center",
  gap: spacing[1],
  color: inputVars.root.messageColor,
  fontSize: `${bodyStyles.xxxxs.fontSize}px`,
  lineHeight: `${bodyStyles.xxxxs.lineHeight}px`,
});

export const inputHint = style({
  color: colors.text.subtle,
  fontSize: `${bodyStyles.xxxxs.fontSize}px`,
  lineHeight: `${bodyStyles.xxxxs.lineHeight}px`,
});

export const inputState = styleVariants({
  default: {},
  success: {
    vars: {
      [inputVars.field.border]: palette.green500,
      [inputVars.field.hoverBorder]: palette.green400,
      [inputVars.field.focusBorder]: palette.green400,
      [inputVars.field.focusRing]: palette.green300,
      [inputVars.root.messageColor]: palette.green200,
      [inputVars.status.iconColor]: palette.green200,
    },
  },
  error: {
    vars: {
      [inputVars.field.border]: palette.red500,
      [inputVars.field.hoverBorder]: palette.red400,
      [inputVars.field.focusBorder]: palette.red400,
      [inputVars.field.focusRing]: palette.red300,
      [inputVars.root.messageColor]: palette.red200,
      [inputVars.status.iconColor]: palette.red200,
    },
  },
  disabled: {
    vars: {
      [inputVars.field.bg]: colors.background.subtle,
      [inputVars.field.text]: colors.text.disabled,
      [inputVars.field.placeholder]: colors.text.disabled,
      [inputVars.field.border]: colors.border.subtle,
      [inputVars.field.hoverBorder]: colors.border.subtle,
      [inputVars.field.focusBorder]: colors.border.subtle,
      [inputVars.field.focusRing]: "transparent",
      [inputVars.root.messageColor]: colors.text.disabled,
      [inputVars.adornment.color]: colors.text.disabled,
      [inputVars.adornment.bg]: colors.background.subtle,
      [inputVars.adornment.border]: colors.border.subtle,
      [inputVars.status.iconColor]: colors.text.disabled,
    },
  },
});
