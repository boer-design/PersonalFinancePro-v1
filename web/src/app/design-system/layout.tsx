"use client";

import * as React from "react";
import { useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowTrendingUpIcon,
  BeakerIcon,
  BookOpenIcon,
  CursorArrowRippleIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { SideMenu } from "../components/ui";
import type { SideMenuSection } from "../components/ui/navigation/side-menu/SideMenu";
import * as styles from "./layout.css";

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const sections: SideMenuSection[] = useMemo(
    () => [
      {
        id: "foundations",
        label: "Foundations",
        items: [
          {
            id: "style-guide",
            label: "Style Guide",
            description: "Brand story + principles",
            icon: <BookOpenIcon width={20} height={20} />,
            active: pathname === "/design-system/style-guide",
            onClick: () => router.push("/design-system/style-guide"),
          },
          {
            id: "colors",
            label: "Colors",
            description: "Palette + semantic",
            icon: <span aria-hidden="true">🎨</span>,
            active: pathname === "/design-system/colors",
            onClick: () => router.push("/design-system/colors"),
          },
          {
            id: "typography",
            label: "Typography",
            description: "Headings + body scale",
            icon: <span aria-hidden="true">🔤</span>,
            active: pathname === "/design-system/typography",
            onClick: () => router.push("/design-system/typography"),
          },
          {
            id: "radii",
            label: "Radii",
            description: "Corner rounding scale",
            icon: <span aria-hidden="true">⬒</span>,
            active: pathname === "/design-system/radii",
            onClick: () => router.push("/design-system/radii"),
          },
          {
            id: "borders",
            label: "Borders",
            description: "To be defined",
            icon: <ArrowTrendingUpIcon width={20} height={20} />,
            active: pathname === "/design-system/borders",
            onClick: () => router.push("/design-system/borders"),
          },
          {
            id: "shadows",
            label: "Shadows",
            description: "Elevation set",
            icon: <span aria-hidden="true">🌘</span>,
            active: pathname === "/design-system/shadows",
            onClick: () => router.push("/design-system/shadows"),
          },
          {
            id: "spacing",
            label: "Spacing",
            description: "Base spacing + controls",
            icon: <span aria-hidden="true">↔️</span>,
            active: pathname === "/design-system/spacing",
            onClick: () => router.push("/design-system/spacing"),
          },
          {
            id: "motion",
            label: "Motion",
            description: "Duration + easing",
            icon: <span aria-hidden="true">⏱️</span>,
            active: pathname === "/design-system/motion",
            onClick: () => router.push("/design-system/motion"),
          },
          {
            id: "iconography",
            label: "Iconography",
            description: "To be defined",
            icon: <span aria-hidden="true">🔲</span>,
            active: pathname === "/design-system/iconography",
            onClick: () => router.push("/design-system/iconography"),
          },
        ],
      },
      {
        id: "components",
        label: "Components",
        items: [
          {
            id: "buttons",
            label: "Buttons",
            description: "Tones, sizes, states",
            icon: <CursorArrowRippleIcon width={20} height={20} />,
            active: pathname === "/design-system/buttons",
            onClick: () => router.push("/design-system/buttons"),
          },
          {
            id: "badges",
            label: "Badges",
            description: "Status + counts",
            icon: <BeakerIcon width={20} height={20} />,
            active: pathname === "/design-system/badges",
            onClick: () => router.push("/design-system/badges"),
          },
          {
            id: "table",
            label: "Table",
            description: "Sortable data grids",
            icon: <TableCellsIcon width={20} height={20} />,
            active: pathname === "/design-system/table",
            onClick: () => router.push("/design-system/table"),
          },
          {
            id: "select",
            label: "Select",
            description: "Radix base select",
            icon: <Squares2X2Icon width={20} height={20} />,
            active: pathname === "/design-system/select",
            onClick: () => router.push("/design-system/select"),
          },
          {
            id: "input-field",
            label: "Input Field",
            description: "Text entry + states",
            icon: <PencilSquareIcon width={20} height={20} />,
            active: pathname === "/design-system/input-field",
            onClick: () => router.push("/design-system/input-field"),
          },
          {
            id: "dialog",
            label: "Dialog",
            description: "Modal shell + body",
            icon: <ChatBubbleLeftRightIcon width={20} height={20} />,
            active: pathname === "/design-system/dialog",
            onClick: () => router.push("/design-system/dialog"),
          },
          {
            id: "side-menu",
            label: "Side Menu",
            description: "Navigation blocks",
            icon: <RectangleStackIcon width={20} height={20} />,
            badgeLabel: "New",
            active: pathname === "/design-system/side-menu",
            onClick: () => router.push("/design-system/side-menu"),
          },
        ],
      },
    ],
    [pathname, router]
  );

  return (
    <div className={styles.root}>
      <div className={styles.shell}>
        <div>
          <div className={styles.titleBlock}>
            <div className={styles.brandRow}>
              <div className={styles.brandLogo}>
                <Image src="/navaro-logo.svg" alt="Navaro logo" width={40} height={40} />
              </div>
              <div className={styles.brandText}>
                <div className={styles.brandName}>Navaro</div>
                <div className={styles.brandTagline}>Personal finance platform</div>
              </div>
            </div>
            <div className={styles.title}>Design System</div>
            <div className={styles.subtitle}>Components, tokens, and examples.</div>
          </div>
          <SideMenu
            title="Components"
            subtitle="Navigate demos"
            sections={sections}
            footerSlot={
              <>
                <span aria-hidden="true">⚡</span>
                <span>Radix + Vanilla Extract</span>
              </>
            }
          />
        </div>

        <div className={styles.contentCard}>{children}</div>
      </div>
    </div>
  );
}
