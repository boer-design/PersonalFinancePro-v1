// web/src/components/ui/form/input-field/InputField.tsx

"use client";

import * as React from "react";
import {
  inputAdornment,
  inputControl,
  inputElement,
  inputFullWidth,
  inputHint,
  inputLabel,
  inputLabelMeta,
  inputLabelRow,
  inputMessage,
  inputMessageRow,
  inputRoot,
  inputState,
  inputStatusIcon,
} from "./input-field.css";
import { classNames } from "../../utils/classNames";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export type InputFieldStatus = "default" | "success" | "error" | "disabled";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Optional label shown above the field.
   */
  label?: string;
  /**
   * Small helper text aligned to the right of the label (e.g. "Optional").
   */
  labelMeta?: string;
  /**
   * Supporting text below the field.
   */
  supportingText?: string;
  /**
   * Right-aligned hint next to supporting text (character count, etc).
   */
  hint?: string;
  /**
   * Visual status for the field.
   */
  status?: InputFieldStatus;
  /**
   * Adornment rendered on the left side inside the field.
   */
  startAdornment?: React.ReactNode;
  /**
   * Adornment rendered on the right side inside the field.
   */
  endAdornment?: React.ReactNode;
  /**
   * Stretch to the full width of the parent (min width removed).
   */
  fullWidth?: boolean;
  /**
   * Custom class applied to the input element (not the wrapper).
   */
  inputClassName?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      labelMeta,
      supportingText,
      hint,
      status = "default",
      startAdornment,
      endAdornment,
      fullWidth,
      className,
      inputClassName,
      id,
      disabled,
      ...inputProps
    },
    ref,
  ) {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const derivedStatus: InputFieldStatus = disabled ? "disabled" : status;

    const statusIcon =
      derivedStatus === "success" ? (
        <CheckIcon width={18} height={18} />
      ) : derivedStatus === "error" ? (
        <ExclamationTriangleIcon width={18} height={18} />
      ) : null;

    return (
      <div
        className={classNames(
          inputRoot,
          inputState[derivedStatus],
          fullWidth ? inputFullWidth : undefined,
          className,
        )}
      >
        {label || labelMeta ? (
          <div className={inputLabelRow}>
            {label ? (
              <label className={inputLabel} htmlFor={inputId}>
                {label}
              </label>
            ) : (
              <span />
            )}
            {labelMeta ? <span className={inputLabelMeta}>{labelMeta}</span> : null}
          </div>
        ) : null}

        <div className={inputControl} data-disabled={disabled ? "true" : undefined}>
          {startAdornment ? (
            <span className={inputAdornment}>{startAdornment}</span>
          ) : null}

          <input
            {...inputProps}
            id={inputId}
            ref={ref}
            className={classNames(inputElement, inputClassName)}
            disabled={disabled}
          />

          {endAdornment ? <span className={inputAdornment}>{endAdornment}</span> : null}

          {statusIcon ? (
            <span className={inputStatusIcon} aria-hidden="true">
              {statusIcon}
            </span>
          ) : null}
        </div>

        {supportingText || hint ? (
          <div className={inputMessageRow}>
            {supportingText ? <div className={inputMessage}>{supportingText}</div> : <span />}
            {hint ? <div className={inputHint}>{hint}</div> : null}
          </div>
        ) : null}
      </div>
    );
  },
);

InputField.displayName = "InputField";
