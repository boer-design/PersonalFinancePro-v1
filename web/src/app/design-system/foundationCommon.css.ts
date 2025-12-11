import { style } from "@vanilla-extract/css";
import { palette } from "../components/ui/theme/colors";
import { radius } from "../components/ui/theme/radius";
import { spacing } from "../components/ui/theme/spacing";
import { typography } from "../components/ui/theme/typography";

export const page = style({
  display: "grid",
  gap: spacing[6],
});

export const header = style({
  display: "grid",
  gap: spacing[1],
});

export const title = style({
  fontSize: typography.heading.h2.fontSize,
  lineHeight: `${typography.heading.h2.lineHeight}px`,
  fontWeight: typography.heading.h2.fontWeight,
  letterSpacing: `${typography.heading.h2.letterSpacing}px`,
});

export const subtitle = style({
  color: palette.neutral300,
  fontSize: typography.body.sm.fontSize,
});

export const section = style({
  display: "grid",
  gap: spacing[3],
});

export const sectionTitle = style({
  fontSize: typography.heading.h4.fontSize,
  lineHeight: `${typography.heading.h4.lineHeight}px`,
  fontWeight: typography.heading.h4.fontWeight,
  letterSpacing: `${typography.heading.h4.letterSpacing}px`,
});

export const surface = style({
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: radius.xl,
  padding: spacing[4],
  background: "#1b181b",
});

export const gridResponsive = style({
  display: "grid",
  gap: spacing[3],
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
});

export const textMuted = style({
  color: palette.neutral300,
});

export const list = style({
  color: palette.neutral300,
  lineHeight: 1.6,
  paddingLeft: spacing[5],
});

export const listItem = style({
  marginBottom: spacing[2],
});
