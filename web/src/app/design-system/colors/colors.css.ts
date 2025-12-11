import { style, styleVariants } from "@vanilla-extract/css";
import { palette } from "../../components/ui/theme/colors";
import { radius } from "../../components/ui/theme/radius";
import { spacing } from "../../components/ui/theme/spacing";
import { palette as paletteTokens } from "../../components/ui/theme/colors";

export const card = style({
  display: "grid",
  gap: spacing[2],
});

export const swatch = style({
  height: 80,
  borderRadius: radius.lg,
  border: "1px solid rgba(255,255,255,0.08)",
});

export const swatchVariant = styleVariants(
  paletteTokens,
  (value) => ({
    background: value,
  })
);

export const tokenName = style({
  fontWeight: 700,
});

export const tokenValue = style({
  color: palette.neutral300,
  fontSize: 13,
});
