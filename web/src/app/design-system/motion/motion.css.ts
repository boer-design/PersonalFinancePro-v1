import { style } from "@vanilla-extract/css";
import { spacing } from "../../components/ui/theme/spacing";
import { palette } from "../../components/ui/theme/colors";

export const card = style({
  display: "grid",
  gap: spacing[2],
});

export const tokenName = style({
  fontWeight: 700,
});

export const tokenMeta = style({
  color: palette.neutral300,
  fontSize: 13,
});
