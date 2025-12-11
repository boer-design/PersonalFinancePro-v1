import { style, styleVariants } from "@vanilla-extract/css";
import { radius } from "../../components/ui/theme/radius";
import { spacing } from "../../components/ui/theme/spacing";
import { palette } from "../../components/ui/theme/colors";

export const card = style({
  display: "grid",
  gap: spacing[2],
});

export const block = style({
  height: 80,
  background: "#1f1c1f",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: spacing[2],
});

export const blockVariant = styleVariants(radius, (value) => ({
  borderRadius: value,
}));

export const tokenMeta = style({
  color: palette.neutral300,
  fontSize: 13,
});
