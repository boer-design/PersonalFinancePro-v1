"use client";

import { SideMenu } from "../../components/ui";
import type { SideMenuSection } from "../../components/ui/navigation/side-menu/SideMenu";
import {
  ArrowTrendingUpIcon,
  BellAlertIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const surfaceCardStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 16,
  background: "#1b181b",
} as const;

const primarySideMenu: SideMenuSection[] = [
  {
    id: "main",
    label: "Main",
    items: [
      {
        id: "overview",
        label: "Overview",
        description: "Portfolio pulse",
        icon: <Squares2X2Icon width={20} height={20} />,
        badgeLabel: "4",
        badgeTone: "purple",
        active: true,
      },
      {
        id: "performance",
        label: "Performance",
        description: "Holdings & moves",
        icon: <ChartPieIcon width={20} height={20} />,
      },
      {
        id: "cash",
        label: "Cash accounts",
        description: "Transfers & cards",
        icon: <CreditCardIcon width={20} height={20} />,
        badgeLabel: "New",
        badgeTone: "blue",
      },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      {
        id: "alerts",
        label: "Alerts",
        description: "Signals & guardrails",
        icon: <BellAlertIcon width={20} height={20} />,
        badgeLabel: "2",
        badgeTone: "red",
      },
      {
        id: "automation",
        label: "Automation",
        description: "Rules & triggers",
        icon: <ArrowTrendingUpIcon width={20} height={20} />,
      },
      {
        id: "settings",
        label: "Settings",
        description: "Access & billing",
        icon: <Cog6ToothIcon width={20} height={20} />,
      },
    ],
  },
];

const secondarySideMenu: SideMenuSection[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    items: [
      {
        id: "home",
        label: "Home",
        icon: <HomeIcon width={20} height={20} />,
      },
      {
        id: "positions",
        label: "Positions",
        description: "Across accounts",
        icon: <ChartPieIcon width={20} height={20} />,
        active: true,
      },
      {
        id: "statements",
        label: "Statements",
        icon: <DocumentDuplicateIcon width={20} height={20} />,
        badgeLabel: "PDF",
        badgeTone: "neutral",
      },
      {
        id: "audit",
        label: "Audit log",
        description: "Owner only",
        icon: <ShieldCheckIcon width={20} height={20} />,
        disabled: true,
      },
    ],
  },
  {
    id: "help",
    label: "Help",
    items: [
      {
        id: "support",
        label: "Support",
        description: "Chat & docs",
        icon: <LifebuoyIcon width={20} height={20} />,
        badgeLabel: "Live",
        badgeTone: "blue",
      },
    ],
  },
];

export default function SideMenuPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <header>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Side Menu</h1>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>
          Navigation rail with active, disabled, badge, and CTA states.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <div style={surfaceCardStyle}>
          <SideMenu
            title="Navigation"
            subtitle="All accounts"
            sections={primarySideMenu}
            cta={{
              title: "Upgrade workspace",
              description: "Unlock alerts & exports",
              buttonLabel: "Upgrade",
            }}
          />
        </div>
        <div style={surfaceCardStyle}>
          <SideMenu
            title="Operations"
            subtitle="Signal center"
            sections={secondarySideMenu}
            footerSlot={
              <>
                <ShieldCheckIcon width={18} height={18} aria-hidden="true" />
                <span>Secure by default</span>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
