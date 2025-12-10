import { createVar, globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { tokens } from "../../theme/tokens";
import { bodyStyles } from "../../theme/typography";

const { colors, palette, radius, spacing, typography, motion } = tokens;

export const tableVars = {
  container: {
    bg: createVar(),
    border: createVar(),
  },
  header: {
    bg: createVar(),
    text: createVar(),
  },
  body: {
    rowHoverBg: createVar(),
  },
  cell: {
    text: createVar(),
    border: createVar(),
    paddingY: createVar(),
    paddingX: createVar(),
  },
  typography: {
    fontFamily: createVar(),
    fontSize: createVar(),
    lineHeight: createVar(),
    headerWeight: createVar(),
    bodyWeight: createVar(),
  },
} as const;

export const tableContainer = style({
  border: `2px solid ${tableVars.container.border}`,
  borderRadius: radius.md,
  backgroundColor: tableVars.container.bg,
  overflow: "hidden",
  vars: {
    [tableVars.container.bg]: colors.background.surface,
    [tableVars.container.border]: colors.border.subtle,
    [tableVars.header.bg]: colors.background.subtle,
    [tableVars.header.text]: colors.text.primary,
    [tableVars.body.rowHoverBg]: colors.table.bgHover,
    [tableVars.cell.text]: colors.text.primary,
    [tableVars.cell.border]: colors.border.subtle,
    [tableVars.cell.paddingY]: `${spacing[3]}px`,
    [tableVars.cell.paddingX]: `${spacing[3]}px`,
    [tableVars.typography.fontFamily]: typography.fontFamily.ui,
    [tableVars.typography.fontSize]: `${bodyStyles.xxs.fontSize}px`,
    [tableVars.typography.lineHeight]: `${bodyStyles.xxs.lineHeight}px`,
    [tableVars.typography.headerWeight]: `${bodyStyles.xxs.fontWeight}`,
    [tableVars.typography.bodyWeight]: `${bodyStyles.xxs.fontWeight}`,
  },
});

export const tableBase = style({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  margin: 0,
  color: tableVars.cell.text,
  fontFamily: tableVars.typography.fontFamily,
  fontSize: tableVars.typography.fontSize,
  lineHeight: tableVars.typography.lineHeight,
});

export const header = style({
  backgroundColor: tableVars.header.bg,
  color: tableVars.header.text,
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
globalStyle(`${bodyRow}:hover td`, { backgroundColor: tableVars.body.rowHoverBg });
globalStyle(`${bodyRow}:hover th`, { backgroundColor: tableVars.body.rowHoverBg });

export const cellBase = style({
  padding: `${tableVars.cell.paddingY} ${tableVars.cell.paddingX}`,
  borderBottom: `1px solid ${tableVars.cell.border}`,
  color: tableVars.cell.text,
  fontSize: tableVars.typography.fontSize,
  lineHeight: tableVars.typography.lineHeight,
  verticalAlign: "middle",
});

export const headerCell = style({
  fontWeight: tableVars.typography.headerWeight,
  textAlign: "left",
});

export const cell = style({
  textAlign: "left",
  fontWeight: tableVars.typography.bodyWeight,
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
  justifyContent: "normal",
  gap: spacing[3],
  width: "100%",
});

export const columnTitleButton = style([
  columnTitle,
  {
    appearance: "none",
    background: "transparent",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    padding: 0,
    textAlign: "inherit",
    transition: `color ${motion.duration.fast} ${motion.easing.standard}`,
    selectors: {
      "&:focus-visible": {
        outline: `2px solid ${colors.border.focus}`,
        outlineOffset: 4,
      },
    },
  },
]);

export const sortIcon = style({
  color: palette.neutral400,
  flexShrink: 0,
  transition: `color ${motion.duration.fast} ${motion.easing.standard}`,
  selectors: {
    [`${columnTitle}:hover &`]: {
      color: palette.neutral0,
    },
    [`${columnTitleButton}:hover &`]: {
      color: palette.neutral0,
    },
    [`${columnTitleButton}:focus-visible &`]: {
      color: palette.neutral0,
    },
  },
});
