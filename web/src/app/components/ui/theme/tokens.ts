// web/src/components/ui/theme/tokens.ts

import { rawColors, semanticColors } from './colors';
import { typography } from './typography';
import { spacing, controlHeights } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { motion } from './motion';
import { zIndex } from './zIndex';

export const tokens = {
  colors: {
    raw: rawColors,
    semantic: semanticColors,
  },
  typography,
  spacing,
  controlHeights,
  radius,
  shadows,
  motion,
  zIndex,
} as const;

export type Tokens = typeof tokens;
