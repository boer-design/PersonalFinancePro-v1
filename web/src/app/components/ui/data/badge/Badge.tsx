"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes, ReactNode } from "react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import {
  badgeAppearanceSoft,
  badgeBase,
  badgeDot,
  badgeIcon,
  badgeLabel,
  badgeSize,
  badgeTone,
} from "./badge.css";
import { classNames } from "../../utils/classNames";

export type BadgeSize = "sm" | "md";
export type BadgeTone = "neutral" | "purple" | "blue" | "red";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Controls the size (height + padding).
   */
  size?: BadgeSize;
  /**
   * Visual tone of the badge (soft appearance only).
   */
  tone?: BadgeTone;
  /**
   * Show a small tone-colored dot before the label.
   */
  dot?: boolean;
  /**
   * Render as a child component (e.g. Next.js Link) while keeping badge styles.
   */
  asChild?: boolean;
  /**
   * Optional icon displayed before the label.
   */
  leftIcon?: ReactNode;
  /**
   * Optional icon displayed after the label.
   */
  rightIcon?: ReactNode;
  /**
   * Named leading icon (solid set).
   */
  leadingIconName?: "check" | "info" | "alert" | "close";
  /**
   * Named trailing icon (solid set).
   */
  trailingIconName?: "check" | "info" | "alert" | "close";
}

const iconMap = {
  check: CheckIcon,
  info: InformationCircleIcon,
  alert: ExclamationTriangleIcon,
  close: XMarkIcon,
} as const;

/**
 * Design-system Badge. Soft appearance only; supports tone, size, and optional icons.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      size = "md",
      tone = "purple",
      dot = false,
      asChild,
      leftIcon,
      rightIcon,
      leadingIconName,
      trailingIconName,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : "span";

    const Leading = leadingIconName ? iconMap[leadingIconName] : null;
    const Trailing = trailingIconName ? iconMap[trailingIconName] : null;
    const iconProps = { width: 14, height: 14, "aria-hidden": true, focusable: false };

    const classes = classNames(
      badgeBase,
      badgeTone[tone],
      badgeAppearanceSoft,
      badgeSize[size],
      className
    );

    return (
      <Comp className={classes} ref={ref} {...rest}>
        {dot ? <span aria-hidden="true" className={badgeDot} /> : null}
        {Leading ? (
          <Leading {...iconProps} className={badgeIcon} />
        ) : leftIcon ? (
          <span aria-hidden="true" className={badgeIcon}>
            {leftIcon}
          </span>
        ) : null}
        {children ? <span className={badgeLabel}>{children}</span> : null}
        {Trailing ? (
          <Trailing {...iconProps} className={badgeIcon} />
        ) : rightIcon ? (
          <span aria-hidden="true" className={badgeIcon}>
            {rightIcon}
          </span>
        ) : null}
      </Comp>
    );
  }
);

Badge.displayName = "Badge";
