// web/src/components/ui/theme/tokens.ts

import { palette, semanticColors } from "./colors";
import { radius } from "./radius";
import { spacing, controlHeights } from "./spacing";
import { motion } from "./motion";
import { typography } from "./typography";

export const tokens = {
  palette,
  colors: semanticColors,
  radius,
  spacing,
  controlHeights,
  motion,
  typography,
} as const;

export type Tokens = typeof tokens;
