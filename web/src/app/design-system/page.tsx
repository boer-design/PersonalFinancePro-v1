// web/src/app/design-system/page.tsx
"use client";

import { Button } from "../components/ui";
import type {
  ButtonAppearance,
  ButtonTone,
  ButtonSize,
} from "../components/ui/form/button/Button";
import { Select } from "../components/ui";

export default function DesignSystemPage() {
  const tones: ButtonTone[] = ["purple", "blue", "red", "neutral"];
  const appearances: ButtonAppearance[] = ["primary", "secondary", "tertiary"];
  const sizes: ButtonSize[] = ["sm", "md", "lg"];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background: "#131113",
        color: "#fff",
        fontFamily:
          '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Design System</h1>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>
          Button – Signals & Appearances
        </h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {tones.map((tone) =>
            appearances.map((appearance) => (
              <div
                key={`${tone}-${appearance}`}
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: 12,
                  background: "#1b181b",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#cbd5e1",
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ textTransform: "capitalize" }}>{appearance}</span>
                  <span style={{ textTransform: "capitalize" }}>{tone}</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Button
                    tone={tone}
                    appearance={appearance}
                    leadingIconName="check"
                  >
                    Submit
                  </Button>
                  <Button
                    tone={tone}
                    appearance={appearance}
                    trailingIconName="arrow"
                  >
                    Next
                  </Button>
                  <Button tone={tone} appearance={appearance} disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            )),
          )}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Select</h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: 12,
              background: "#1b181b",
            }}
          >
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
      </section>

      <section>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>
          Button – Sizes (tone: purple, appearance: primary)
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {sizes.map((size) => (
            <Button
              key={size}
              size={size}
              tone="purple"
              appearance="primary"
              leadingIconName="check"
            >
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
}
