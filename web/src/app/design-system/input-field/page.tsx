"use client";

import { InputField } from "../../components/ui";

const surfaceCardStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 16,
  background: "#1b181b",
} as const;

export default function InputFieldPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <header>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Input Field</h1>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>
          Labeled text input with success/error states, adornments, and helper text.
        </p>
      </header>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 18 }}>Core states</h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          <div style={surfaceCardStyle}>
            <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 8 }}>
              Default
            </div>
            <InputField
              label="Account name"
              placeholder="Enter account"
              supportingText="Used to identify your account"
            />
          </div>

          <div style={surfaceCardStyle}>
            <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 8 }}>
              Success
            </div>
            <InputField
              label="Amount"
              labelMeta="Required"
              placeholder="0.00"
              startAdornment="$"
              status="success"
              supportingText="Looks good"
            />
          </div>

          <div style={surfaceCardStyle}>
            <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 8 }}>
              Error
            </div>
            <InputField
              label="Email"
              placeholder="name@email.com"
              status="error"
              supportingText="Enter a valid email address"
            />
          </div>

          <div style={surfaceCardStyle}>
            <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 8 }}>
              Disabled
            </div>
            <InputField
              label="API key"
              value="••••-••••-••••"
              disabled
              supportingText="Read only"
            />
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 18 }}>Adornments & meta</h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          <div style={surfaceCardStyle}>
            <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 8 }}>
              Start + end adornment
            </div>
            <InputField
              label="Search"
              placeholder="Find an instrument"
              startAdornment="⌕"
              endAdornment="⌘K"
              supportingText="Type to search"
            />
          </div>

          <div style={surfaceCardStyle}>
            <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 8 }}>
              Hint + counter
            </div>
            <InputField
              label="Note"
              placeholder="Add a note"
              labelMeta="Optional"
              supportingText="Share context with your team"
              hint="12 / 120"
              fullWidth
            />
          </div>
        </div>
      </section>
    </div>
  );
}
