import { style } from "@vanilla-extract/css";
import { spacing } from "../../components/ui/theme/spacing";
import { palette } from "../../components/ui/theme/colors";

export const principleGrid = style({
  display: "grid",
  gap: spacing[3],
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
});

export const card = style({
  display: "grid",
  gap: spacing[2],
});

export const tokenName = style({
  fontWeight: 700,
});

export const tokenMeta = style({
  color: palette.neutral300,
  fontSize: 14,
});

export const list = style({
  color: palette.neutral300,
  lineHeight: 1.6,
  paddingLeft: spacing[5],
});

export const listItem = style({
  marginBottom: spacing[2],
});

export const logoRow = style({
  display: "flex",
  alignItems: "center",
  gap: spacing[3],
});

export const logoBox = style({
  width: 56,
  height: 56,
  borderRadius: spacing[2],
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  background: palette.neutral900,
});

export const logoLabel = style({
  fontWeight: 700,
});

export const logoMeta = style({
  color: palette.neutral300,
  fontSize: 14,
});
