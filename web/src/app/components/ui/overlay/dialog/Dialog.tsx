// web/src/components/ui/overlay/dialog/Dialog.tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Slot } from "@radix-ui/react-slot";
import { XMarkIcon as XMarkSolid } from "@heroicons/react/20/solid";

import {
  dialogBody,
  dialogClose,
  dialogContent,
  dialogDescription,
  dialogFooter,
  dialogHeader,
  dialogHeaderText,
  dialogIcon,
  dialogOverlay,
  dialogTitle,
  dialogTone,
} from "./dialog.css";
import { classNames } from "../../utils/classNames";

export type DialogTone = "purple" | "blue" | "neutral";

type DialogContentProps = DialogPrimitive.DialogContentProps & {
  tone?: DialogTone;
  icon?: React.ReactNode | null;
  title?: React.ReactNode;
  description?: React.ReactNode;
  showClose?: boolean;
};

const DialogRoot = DialogPrimitive.Root;

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitive.DialogTriggerProps & { asChild?: boolean }
>(({ children, asChild = false, ...rest }, ref) => {
  if (asChild) {
    return (
      <DialogPrimitive.Trigger asChild {...rest}>
        <Slot ref={ref as any}>{children}</Slot>
      </DialogPrimitive.Trigger>
    );
  }

  return (
    <DialogPrimitive.Trigger ref={ref} {...rest}>
      {children}
    </DialogPrimitive.Trigger>
  );
});
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      tone = "purple",
      icon = null,
      title,
      description,
      showClose = true,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const hasIcon = icon !== null && icon !== undefined;
    const hasHeader = Boolean(title || description || hasIcon);

    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={dialogOverlay} />
        <DialogPrimitive.Content
          ref={ref}
          className={classNames(dialogContent, dialogTone[tone], className)}
          {...rest}
        >
          {hasHeader && (
            <div className={dialogHeader}>
              {hasIcon ? <span className={dialogIcon} aria-hidden="true">{icon}</span> : null}
              <div className={dialogHeaderText}>
                {title ? (
                  <DialogPrimitive.Title className={dialogTitle}>
                    {title}
                  </DialogPrimitive.Title>
                ) : null}
                {description ? (
                  <DialogPrimitive.Description className={dialogDescription}>
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
              </div>
              {showClose ? (
                <DialogPrimitive.Close
                  className={dialogClose}
                  aria-label="Close dialog"
                >
                  <XMarkSolid width={18} height={18} aria-hidden="true" />
                </DialogPrimitive.Close>
              ) : null}
            </div>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);
DialogContent.displayName = "DialogContent";

type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={classNames(dialogBody, className)} {...rest}>
      {children}
    </div>
  )
);
DialogBody.displayName = "DialogBody";

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={classNames(dialogFooter, className)} {...rest}>
      {children}
    </div>
  )
);
DialogFooter.displayName = "DialogFooter";

const DialogClose = DialogPrimitive.Close;

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});
