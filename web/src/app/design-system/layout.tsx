"use client";

import * as React from "react";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowTrendingUpIcon,
  BeakerIcon,
  BookOpenIcon,
  ChartPieIcon,
  CursorArrowRippleIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { SideMenu } from "../components/ui";
import type { SideMenuSection } from "../components/ui/navigation/side-menu/SideMenu";

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
            id: "tokens",
            label: "Tokens (coming soon)",
            description: "Colors, spacing, motion",
            icon: <ChartPieIcon width={20} height={20} />,
            disabled: true,
          },
          {
            id: "patterns",
            label: "Patterns (coming soon)",
            description: "Form + nav patterns",
            icon: <ArrowTrendingUpIcon width={20} height={20} />,
            disabled: true,
          },
        ],
      },
    ],
    [pathname, router]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#131113",
        color: "#fff",
        fontFamily:
          '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          margin: 0,
          padding: "32px 24px",
          display: "grid",
          gap: 24,
          gridTemplateColumns: "minmax(280px, 320px) 1fr",
        }}
      >
        <div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>Design System</div>
            <div
              style={{
                color: "#cbd5e1",
                marginTop: 4,
                fontSize: 14,
                letterSpacing: 0.2,
              }}
            >
              Components, tokens, and examples.
            </div>
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

        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 20,
            minHeight: "70vh",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
