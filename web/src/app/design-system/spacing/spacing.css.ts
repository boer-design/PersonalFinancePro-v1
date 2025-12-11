import { style, styleVariants } from "@vanilla-extract/css";
import { spacing, controlHeights } from "../../components/ui/theme/spacing";
import { palette } from "../../components/ui/theme/colors";
import { spacing as spacingTokens } from "../../components/ui/theme/spacing";

export const card = style({
  display: "grid",
  gap: spacing[2],
});

export const bar = style({
  height: 10,
  background: palette.purple400,
  borderRadius: 8,
});

export const barVariant = styleVariants(spacingTokens, (value) => ({
  width: value,
}));

export const control = style({
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "linear-gradient(90deg, rgba(117,86,220,0.6), rgba(20,217,235,0.6))",
  marginBottom: spacing[2],
});

export const controlVariant = styleVariants(controlHeights, (value) => ({
  height: value,
}));

export const tokenMeta = style({
  color: palette.neutral300,
  fontSize: 13,
});
