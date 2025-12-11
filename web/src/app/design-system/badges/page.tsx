"use client";

import { Badge } from "../../components/ui";
import type { BadgeTone, BadgeSize } from "../../components/ui/data/badge/Badge";

const surfaceCardStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 16,
  background: "#1b181b",
} as const;

export default function BadgesPage() {
  const badgeTones: BadgeTone[] = ["purple", "blue", "red", "neutral"];
  const badgeSizes: BadgeSize[] = ["sm", "md"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <header>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Badges</h1>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>
          Soft badges with tone, icon, and dot options for inline status.
        </p>
      </header>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 style={{ fontSize: 18 }}>Tone & appearance</h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {badgeTones.map((tone) => (
            <div key={`${tone}-soft`} style={surfaceCardStyle}>
              <div
                style={{
                  fontSize: 12,
                  color: "#cbd5e1",
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Soft</span>
                <span style={{ textTransform: "capitalize" }}>{tone}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Badge tone={tone}>Default</Badge>
                <Badge tone={tone} dot>
                  With dot
                </Badge>
                <Badge tone={tone} leadingIconName="info">
                  Info
                </Badge>
                <Badge tone={tone} trailingIconName="close">
                  Dismiss
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 18 }}>Sizes (tone: purple)</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {badgeSizes.map((size) => (
            <Badge key={size} size={size} tone="purple" leadingIconName="check">
              {size.toUpperCase()}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}