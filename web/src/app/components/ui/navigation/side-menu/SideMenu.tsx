// web/src/app/components/ui/navigation/side-menu/SideMenu.tsx

"use client";

import * as React from "react";
import { classNames } from "../../utils/classNames";
import {
  footer,
  itemBadge,
  itemBadgeTone,
  itemButton,
  itemIcon,
  itemLabel,
  itemList,
  itemSecondary,
  itemTexts,
  menuHeader,
  menuRoot,
  menuSubtitle,
  menuTitle,
  section,
  sectionLabel,
} from "./sideMenu.css";

export type SideMenuBadgeTone = "neutral" | "purple" | "blue" | "red";

export type SideMenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  badgeLabel?: string;
  badgeTone?: SideMenuBadgeTone;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export type SideMenuSection = {
  id: string;
  label?: string;
  items: SideMenuItem[];
};

export type SideMenuProps = {
  title?: string;
  subtitle?: string;
  sections: SideMenuSection[];
  footerSlot?: React.ReactNode;
};

export function SideMenu({
  title = "Navigation",
  subtitle,
  sections,
  footerSlot,
}: SideMenuProps) {
  return (
    <nav className={menuRoot} aria-label={title}>
      {(title || subtitle) && (
        <div className={menuHeader}>
          {title ? <div className={menuTitle}>{title}</div> : null}
          {subtitle ? <div className={menuSubtitle}>{subtitle}</div> : null}
        </div>
      )}

      {sections.map((block) => (
        <div key={block.id} className={section}>
          {block.label ? (
            <div className={sectionLabel}>{block.label}</div>
          ) : null}
          <div className={itemList} role="group" aria-label={block.label}>
            {block.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={itemButton}
                data-active={item.active ? "true" : undefined}
                data-disabled={item.disabled ? "true" : undefined}
                aria-current={item.active ? "page" : undefined}
                disabled={item.disabled}
                onClick={item.onClick}
              >
                {item.icon ? (
                  <span className={itemIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                ) : null}

                <span className={itemTexts}>
                  <span className={itemLabel}>{item.label}</span>
                  {item.description ? (
                    <span className={itemSecondary}>{item.description}</span>
                  ) : null}
                </span>

                {item.badgeLabel ? (
                  <span
                    className={classNames(
                      itemBadge,
                      item.badgeTone ? itemBadgeTone[item.badgeTone] : undefined
                    )}
                  >
                    {item.badgeLabel}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ))}

      {footerSlot ? <div className={footer}>{footerSlot}</div> : null}
    </nav>
  );
}
