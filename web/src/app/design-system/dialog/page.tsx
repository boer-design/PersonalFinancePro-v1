"use client";

import * as React from "react";
import { Dialog, Button, Select } from "../../components/ui";
import { tokens } from "../../components/ui/theme/tokens";

const { colors, radius, spacing, palette } = tokens;

const surfaceCardStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 16,
  background: "#1b181b",
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: colors.text.muted,
  marginBottom: 4,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: radius.lg,
  border: `1px solid ${colors.border.subtle}`,
  backgroundColor: colors.background.elevated,
  color: colors.text.primary,
  fontSize: 14,
};

const hintStyle: React.CSSProperties = {
  fontSize: 12,
  color: colors.text.subtle,
};

export default function DialogPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <header>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Dialog</h1>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>
          Layered modal shell with header, body, and footer slots. Body content stays flexible for forms, uploads, or confirmations.
        </p>
      </header>

      <div style={surfaceCardStyle}>
        <Dialog open={open} onOpenChange={setOpen}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "#cbd5e1" }}>Import flow</div>
              <div style={{ fontSize: 13, color: colors.text.subtle }}>
                Matches the anatomy shown in the reference.
              </div>
            </div>
            <Dialog.Trigger asChild>
              <Button appearance="primary" tone="purple">
                Open dialog
              </Button>
            </Dialog.Trigger>
          </div>

          <Dialog.Content
            tone="purple"
            title="Import trades from CSV"
            description="Pull trades from your broker file into the selected account. Upload a CSV and submit to ingest."
          >
            <Dialog.Body>
              <div style={{ display: "grid", gap: 8 }}>
                <label style={fieldLabelStyle}>Import trades from CSV</label>
                <input
                  type="text"
                  placeholder="Import trades from CSV"
                  style={inputStyle}
                />
                <div style={{ ...hintStyle, display: "flex", gap: 8 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "2px 8px",
                      borderRadius: radius.full,
                      border: `1px solid ${colors.border.subtle}`,
                      backgroundColor: colors.background.subtle,
                    }}
                  >
                    Trade.csv
                  </span>
                  <span>Preview basic metadata before ingest.</span>
                </div>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <label style={fieldLabelStyle}>Select Account</label>
                <Select
                  placeholder="Select account"
                  options={[
                    { label: "LYNX - Brokerage", value: "lynx" },
                    { label: "DEGIRO - Brokerage", value: "degiro" },
                    { label: "IBKR - Margin", value: "ibkr" },
                  ]}
                />
                <div style={hintStyle}>Trades will be reconciled into this account.</div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing[3],
                  padding: spacing[3],
                  borderRadius: radius.lg,
                  border: `1px dashed ${colors.border.subtle}`,
                  backgroundColor: colors.background.subtle,
                }}
              >
                <Button appearance="secondary" tone="blue">
                  Upload CSV
                </Button>
                <div style={{ display: "grid", gap: 4 }}>
                  <div style={{ fontSize: 13, color: colors.text.primary }}>upload.csv</div>
                  <div style={hintStyle}>Max 5MB • UTF-8 • Comma separated</div>
                </div>
              </div>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                appearance="secondary"
                tone="neutral"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button appearance="secondary" tone="purple">
                Upload CSV
              </Button>
              <Button appearance="primary" tone="purple">
                Submit
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>
    </div>
  );
}
