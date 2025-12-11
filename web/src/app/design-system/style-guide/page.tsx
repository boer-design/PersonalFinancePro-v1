"use client";

import Image from "next/image";
import { classNames } from "../../components/ui/utils/classNames";
import * as foundation from "../foundationCommon.css";
import * as styles from "./styleGuide.css";

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
    <div className={foundation.page}>
      <header className={foundation.header}>
        <h1 className={foundation.title}>Style Guide</h1>
        <p className={foundation.subtitle}>
          Brand story and experience principles to guide the system.
        </p>
      </header>

      <section className={foundation.surface}>
        <h2 className={foundation.sectionTitle}>Brand Story</h2>
        <p className={foundation.textMuted}>
          Navaro is a modern personal finance platform built to give people
          complete control and clarity over their financial lives. From
          day-to-day income and expenses to long-term investments and net-worth
          tracking, the product brings everything together into one coherent,
          trustworthy system.
        </p>
        <p className={foundation.textMuted}>
          Our mission is to help users move from guessing to knowing — with
          tools that make financial awareness effortless, accurate, and
          empowering.
        </p>
      </section>

      <section className={foundation.surface}>
        <h2 className={foundation.sectionTitle}>Logo</h2>
        <div className={styles.logoRow}>
          <div className={styles.logoBox}>
            <Image src="/navaro-logo.svg" alt="Navaro logo" width={56} height={56} />
          </div>
          <div>
            <div className={styles.logoLabel}>Navaro logo (SVG)</div>
            <div className={styles.logoMeta}>Path: /public/navaro-logo.svg</div>
          </div>
        </div>
        <p className={foundation.textMuted}>
          Use the provided SVG for brand placement in navigation and system pages.
        </p>
      </section>

      <section className={foundation.section}>
        <h2 className={foundation.sectionTitle}>Experience Principles</h2>
        <div className={styles.principleGrid}>
          {principles.map((principle) => (
            <div key={principle.title} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenName}>{principle.title}</div>
              <div className={styles.tokenMeta}>{principle.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={foundation.surface}>
        <h2 className={foundation.sectionTitle}>Key Themes</h2>
        <ul className={styles.list}>
          {themes.map((theme) => (
            <li key={theme} className={styles.listItem}>
              {theme}
            </li>
          ))}
        </ul>
        <p className={foundation.textMuted}>
          PersonalFinancePro supports users in building confidence, understanding
          patterns, and making better decisions — whether they are tracking
          spending habits, organizing accounts, or managing investment
          performance.
        </p>
      </section>
    </div>
  );
}
