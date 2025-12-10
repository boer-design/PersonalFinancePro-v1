"use client";

import { Select } from "../../components/ui";

const surfaceCardStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 16,
  background: "#1b181b",
} as const;

export default function SelectPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <header>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Select</h1>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>
          Radix-powered select with branded trigger and portal menu.
        </p>
      </header>

      <div style={{ ...surfaceCardStyle, maxWidth: 360 }}>
        <div
          style={{
            fontSize: 12,
            color: "#cbd5e1",
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Purple</span>
          <span>Solid</span>
        </div>
        <Select
          placeholder="Select Account"
          options={[
            { label: "Select Account", value: "placeholder" },
            { label: "LYNX - Brokerage", value: "lynx" },
            { label: "DEGIRO - Brokerage", value: "degiro" },
            { label: "LYNX", value: "lynx2" },
            { label: "DEGIRO", value: "degiro2" },
          ]}
        />
      </div>
    </div>
  );
}
