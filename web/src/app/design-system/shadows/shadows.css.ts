import { style, styleVariants } from "@vanilla-extract/css";
import { shadows } from "../../components/ui/theme/shadows";
import { spacing } from "../../components/ui/theme/spacing";
import { palette } from "../../components/ui/theme/colors";

export const card = style({
  display: "grid",
  gap: spacing[2],
});

export const block = style({
  height: 90,
  background: "#1f1c1f",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  display: "grid",
  placeItems: "center",
  color: palette.neutral300,
  fontSize: 13,
});

export const blockVariant = styleVariants(shadows, (value) => ({
  boxShadow: value,
}));

export const tokenName = style({
  fontWeight: 700,
});
