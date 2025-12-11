import { style, styleVariants } from "@vanilla-extract/css";
import { spacing } from "../../components/ui/theme/spacing";
import {
  bodyStyles,
  headingStyles,
  typography,
} from "../../components/ui/theme/typography";
import { palette } from "../../components/ui/theme/colors";

export const card = style({
  display: "grid",
  gap: spacing[2],
});

export const headingVariant = styleVariants(headingStyles, (token) => ({
  fontSize: token.fontSize,
  lineHeight: `${token.lineHeight}px`,
  fontWeight: token.fontWeight,
  letterSpacing: `${token.letterSpacing}px`,
}));

export const bodyVariant = styleVariants(bodyStyles, (token) => ({
  fontSize: token.fontSize,
  lineHeight: `${token.lineHeight}px`,
  fontWeight: token.fontWeight,
  letterSpacing: `${token.letterSpacing}px`,
}));

export const tokenName = style({
  fontWeight: 700,
});

export const tokenMeta = style({
  color: palette.neutral300,
  fontSize: typography.body.sm.fontSize,
});
