import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";

const { colors, palette, radius, spacing, typography, motion } = tokens;

export const tableContainer = style({
  border: `2px solid ${colors.border.subtle}`,
  borderRadius: radius.md,
  backgroundColor: colors.background.surface,
  overflow: "hidden",
});

export const tableBase = style({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily.ui,
  fontSize: `${typography.size.sm}px`,
  lineHeight: typography.lineHeight.normal,
});

export const header = style({
  backgroundColor: colors.background.subtle,
});

export const body = style({});

export const headerRow = style({});

globalStyle(`${headerRow} th:first-child`, {
  borderTopLeftRadius: radius.md - 2,
});
globalStyle(`${headerRow} th:last-child`, {
  borderTopRightRadius: radius.md - 2,
});

export const bodyRow = style({
  transition: `background-color ${motion.duration.fast} ${motion.easing.standard}`,
});

globalStyle(`${bodyRow}:last-child td`, { borderBottom: "none" });
globalStyle(`${bodyRow}:last-child th`, { borderBottom: "none" });
globalStyle(`${bodyRow}:hover td`, { backgroundColor: colors.table.bgHover });
globalStyle(`${bodyRow}:hover th`, { backgroundColor: colors.table.bgHover});

export const cellBase = style({
  padding: `${spacing[3]}px ${spacing[3]}px`,
  borderBottom: `1px solid ${colors.border.subtle}`,
  color: colors.text.primary,
  fontSize: `${typography.size.sm}px`,
  lineHeight: typography.lineHeight.normal,
  verticalAlign: "middle",
});

export const headerCell = style({
  fontWeight: typography.weight.semibold,
  textAlign: "left",
});

export const cell = style({
  textAlign: "left",
});

export const align = styleVariants({
  left: { textAlign: "left" },
  center: { textAlign: "center" },
  right: {
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
  },
});

export const columnTitle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing[3],
  width: "100%",
  color: colors.text.primary,
});

export const columnTitleButton = style({
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing[3],
  width: "100%",
  cursor: "pointer",
  color: colors.text.primary,
  transition: `color ${motion.duration.fast} ${motion.easing.standard}`,
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: 2,
      borderRadius: radius.sm,
    },
    "&:hover": {
      color: colors.text.muted,
    },
  },
});

export const sortIcon = style({
  color: palette.neutral100,
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

