// web/src/app/design-system/page.tsx
"use client";

import { Button } from "../components/ui";

export default function DesignSystemPage() {
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
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Button – Variants</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button leadingIconName="check">Primary</Button>
          <Button variant="secondary" leadingIconName="alert">
            Secondary
          </Button>
          <Button variant="subtle" trailingIconName="arrow">
            Subtle
          </Button>
          <Button variant="destructive" leadingIconName="close">
            Destructive
          </Button>
          <Button disabled leadingIconName="alert">
            Disabled
          </Button>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Button – Sizes</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button size="sm" leadingIconName="check">
            Small
          </Button>
          <Button size="md" trailingIconName="arrow">
            Medium
          </Button>
          <Button size="lg" leadingIconName="alert">
            Large
          </Button>
        </div>
      </section>
    </main>
  );
}
