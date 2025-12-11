import { style } from "@vanilla-extract/css";
import { palette } from "../components/ui/theme/colors";
import { radius } from "../components/ui/theme/radius";
import { spacing } from "../components/ui/theme/spacing";
import { typography } from "../components/ui/theme/typography";

export const root = style({
  minHeight: "100vh",
  background: palette.neutral1000,
  color: palette.neutral0,
  fontFamily: typography.fontFamily.ui,
});

export const shell = style({
  width: "100%",
  margin: 0,
  padding: `${spacing[8]}px ${spacing[6]}px`,
  display: "grid",
  gap: spacing[6],
  gridTemplateColumns: "minmax(280px, 320px) 1fr",
});

export const titleBlock = style({
  marginBottom: spacing[3],
});

export const brandRow = style({
  display: "flex",
  alignItems: "center",
  gap: spacing[3],
  marginBottom: spacing[3],
});

export const brandLogo = style({
  width: 40,
  height: 40,
  borderRadius: radius.md,
  overflow: "hidden",
  border: `1px solid rgba(255,255,255,0.08)`,
  background: palette.neutral900,
});

export const brandText = style({
  display: "grid",
  gap: 2,
});

export const brandName = style({
  fontSize: typography.heading.h4.fontSize,
  lineHeight: `${typography.heading.h4.lineHeight}px`,
  fontWeight: typography.heading.h4.fontWeight,
  letterSpacing: `${typography.heading.h4.letterSpacing}px`,
});

export const brandTagline = style({
  color: palette.neutral300,
  fontSize: typography.body.sm.fontSize,
});

export const title = style({
  fontSize: 28,
  fontWeight: 800,
});

export const subtitle = style({
  color: palette.neutral300,
  marginTop: spacing[1],
  fontSize: 14,
  letterSpacing: 0.2,
});

export const sideCard = style({
  border: `1px solid rgba(255,255,255,0.05)`,
  background: "rgba(255,255,255,0.02)",
  borderRadius: radius.xl,
  padding: spacing[5],
});

export const contentCard = style({
  background: "rgba(255,255,255,0.02)",
  border: `1px solid rgba(255,255,255,0.05)`,
  borderRadius: radius.xl,
  padding: spacing[5],
  minHeight: "70vh",
});
