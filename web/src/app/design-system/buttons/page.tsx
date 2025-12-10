"use client";

import { Button } from "../../components/ui";
import type {
  ButtonAppearance,
  ButtonTone,
  ButtonSize,
} from "../../components/ui/form/button/Button";

const surfaceCardStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 16,
  background: "#1b181b",
} as const;

export default function ButtonsPage() {
  const tones: ButtonTone[] = ["purple", "blue", "red", "neutral"];
  const appearances: ButtonAppearance[] = ["primary", "secondary", "tertiary"];
  const sizes: ButtonSize[] = ["sm", "md", "lg"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <header>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Buttons</h1>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>
          Signal-aware buttons with tone, appearance, and size variants.
        </p>
      </header>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 style={{ fontSize: 18 }}>Signals & appearances</h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {tones.map((tone) =>
            appearances.map((appearance) => (
              <div
                key={`${tone}-${appearance}`}
                style={{ ...surfaceCardStyle, padding: 14 }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#cbd5e1",
                    marginBottom: 10,
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

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 18 }}>Sizes (tone: purple, primary)</h2>
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
    </div>
  );
}
