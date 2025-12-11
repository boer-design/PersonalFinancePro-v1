"use client";

import { classNames } from "../../components/ui/utils/classNames";
import { typography } from "../../components/ui/theme/typography";
import * as foundation from "../foundationCommon.css";
import * as styles from "./typography.css";

export default function TypographyPage() {
  const headingEntries = Object.entries(typography.heading);
  const bodyEntries = Object.entries(typography.body);

  return (
    <div className={foundation.page}>
      <header className={foundation.header}>
        <h1 className={foundation.title}>Typography</h1>
        <p className={foundation.subtitle}>
          Defined heading and body styles with token names.
        </p>
      </header>

      <section className={foundation.section}>
        <h2 className={foundation.sectionTitle}>Headings</h2>
        <div className={foundation.gridResponsive}>
          {headingEntries.map(([name]) => (
            <div key={name} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenName}>heading.{name}</div>
              <div className={classNames(styles.headingVariant[name])}>
                The quick brown fox
              </div>
              <div className={styles.tokenMeta}>
                {typography.heading[name].fontSize}px / {typography.heading[name].lineHeight}
                px · weight {typography.heading[name].fontWeight} ·{" "}
                {typography.heading[name].letterSpacing}px letter-spacing
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={foundation.section}>
        <h2 className={foundation.sectionTitle}>Body</h2>
        <div className={foundation.gridResponsive}>
          {bodyEntries.map(([name]) => (
            <div key={name} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenName}>body.{name}</div>
              <div className={classNames(styles.bodyVariant[name])}>
                Financial clarity with calm data.
              </div>
              <div className={styles.tokenMeta}>
                {typography.body[name].fontSize}px / {typography.body[name].lineHeight}px ·
                weight {typography.body[name].fontWeight} ·{" "}
                {typography.body[name].letterSpacing}px letter-spacing
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
