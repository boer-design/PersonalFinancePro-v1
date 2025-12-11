"use client";

const surfaceStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 18,
  background: "#1b181b",
} as const;

export default function StyleGuidePage() {
  const principles = [
    { title: "Calm", detail: "No noise, just clean information." },
    { title: "Analytical", detail: "Structured data presented intelligently." },
    {
      title: "Trustworthy",
      detail: "Dependable, stable, and respectful of financial context.",
    },
    {
      title: "Holistic",
      detail: "Complete overview of finances, not just investments.",
    },
  ];

  const themes = [
    "Broader than investments.",
    "Includes income, expenses, budgeting, and cash flow.",
    "Includes accounts, holdings, and net worth.",
    "Analytical, calm, and professional.",
    "Emphasizes clarity and control.",
  ];

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <header>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Style Guide</h1>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>
          Brand story and experience principles to guide the system.
        </p>
      </header>

      <section style={surfaceStyle}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Brand Story</h2>
        <p style={{ color: "#e2e8f0", lineHeight: 1.6 }}>
          PersonalFinancePro is a modern personal finance platform built to give
          people complete control and clarity over their financial lives. From
          day-to-day income and expenses to long-term investments and net-worth
          tracking, the product brings everything together into one coherent,
          trustworthy system.
        </p>
        <p style={{ color: "#e2e8f0", marginTop: 12, lineHeight: 1.6 }}>
          Our mission is to help users move from guessing to knowing — with
          tools that make financial awareness effortless, accurate, and
          empowering.
        </p>
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 18 }}>Experience Principles</h2>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {principles.map((principle) => (
            <div key={principle.title} style={surfaceStyle}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {principle.title}
              </div>
              <div style={{ color: "#cbd5e1", fontSize: 14 }}>
                {principle.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={surfaceStyle}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Key Themes</h2>
        <ul style={{ color: "#cbd5e1", lineHeight: 1.6, paddingLeft: 18 }}>
          {themes.map((theme) => (
            <li key={theme} style={{ marginBottom: 6 }}>
              {theme}
            </li>
          ))}
        </ul>
        <p style={{ color: "#e2e8f0", marginTop: 6 }}>
          PersonalFinancePro supports users in building confidence, understanding
          patterns, and making better decisions — whether they are tracking
          spending habits, organizing accounts, or managing investment
          performance.
        </p>
      </section>
    </div>
  );
}
