// web/src/components/ui/form/select/Select.tsx
"use client";

import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import {
  selectAppearance,
  selectTone,
  selectRoot,
  selectLabel,
  selectTrigger,
  selectValue,
  selectIcon,
  selectContent,
  selectViewport,
  selectItem,
  selectSeparator,
} from "./select.css";
import { classNames } from "../../utils/classNames";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  placeholder = "Select",
  value,
  defaultValue,
  onValueChange,
  options,
  disabled,
  // tone/appearance removed; defaults to purple solid
  className,
}: SelectProps) {
  const hasValue = value !== undefined ? value !== "" : undefined;

  return (
    <div className={classNames(selectRoot, selectTone.purple)}>
      {label ? <label className={selectLabel}>{label}</label> : null}
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          className={classNames(selectTrigger, selectAppearance.solid, className)}
          data-placeholder={hasValue === false}
          data-disabled={disabled}
        >
          <RadixSelect.Value placeholder={placeholder} className={selectValue} />
          <RadixSelect.Icon className={selectIcon} aria-hidden="true">
            <ChevronUpDownIcon width={18} height={18} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={selectContent} position="popper" sideOffset={6}>
            <RadixSelect.ScrollUpButton className={selectSeparator} />
            <RadixSelect.Viewport className={selectViewport}>
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={selectItem}
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator aria-hidden="true">
                    <CheckIcon width={14} height={14} />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className={selectSeparator} />
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}

