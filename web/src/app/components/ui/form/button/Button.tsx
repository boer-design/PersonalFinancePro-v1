// web/src/components/ui/form/button/Button.tsx

"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import {
  buttonBase,
  buttonAppearance,
  buttonTone,
  buttonSize,
  fullWidth,
  iconOnly as iconOnlyStyle,
} from "./button.css";
import { classNames } from "../../utils/classNames";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonAppearance = "primary" | "secondary" | "tertiary";
export type ButtonTone = "purple" | "blue" | "red" | "neutral";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Control size.
   */
  size?: ButtonSize;
  /**
   * Visual appearance (filled, outline, ghost).
   */
  appearance?: ButtonAppearance;
  /**
   * Color signal tone.
   */
  tone?: ButtonTone;
  /**
   * Stretch to the full width of the parent.
   */
  fullWidth?: boolean;
  /**
   * Render as a child component (e.g. Next.js Link) while keeping button styles.
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
   * Icon-only button; when true, horizontal padding is reduced.
   */
  iconOnly?: boolean;
  /**
   * Named leading icon (outline set).
   */
  leadingIconName?: "check" | "alert" | "close" | "arrow";
  /**
   * Named trailing icon (outline set).
   */
  trailingIconName?: "check" | "alert" | "close" | "arrow";
}

const iconMap = {
  check: CheckIcon,
  alert: ExclamationTriangleIcon,
  close: XMarkIcon,
  arrow: ArrowRightIcon,
} as const;

/**
 * Design-system Button built on top of Radix Slot.
 * Accessible, theme-aware, and variant-driven.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      appearance = "primary",
      tone = "purple",
      size = "md",
      fullWidth: fullWidthProp = false,
      asChild,
      leftIcon,
      rightIcon,
      iconOnly,
      leadingIconName,
      trailingIconName,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : "button";

    const Leading = leadingIconName ? iconMap[leadingIconName] : null;
    const Trailing = trailingIconName ? iconMap[trailingIconName] : null;
    const iconProps = { width: 20, height: 20, 'aria-hidden': true, focusable: false };

    const classes = classNames(
      buttonBase,
      buttonAppearance[appearance],
      buttonTone[tone],
      buttonSize[size],
      fullWidthProp && fullWidth,
      iconOnly && iconOnlyStyle,
      className
    );

    return (
      <Comp className={classes} ref={ref} {...rest}>
        {Leading ? (
          <Leading {...iconProps} />
        ) : leftIcon ? (
          <span aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children && (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {children}
          </span>
        )}
        {Trailing ? (
          <Trailing {...iconProps} />
        ) : rightIcon ? (
          <span aria-hidden="true">{rightIcon}</span>
        ) : null}
      </Comp>
    );
  }
);

Button.displayName = "Button";
