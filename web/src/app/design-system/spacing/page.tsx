"use client";

import { classNames } from "../../components/ui/utils/classNames";
import { spacing, controlHeights } from "../../components/ui/theme/spacing";
import * as foundation from "../foundationCommon.css";
import * as styles from "./spacing.css";

export default function SpacingPage() {
  const spacingEntries = Object.entries(spacing);
  const controlEntries = Object.entries(controlHeights);

  return (
    <div className={foundation.page}>
      <header className={foundation.header}>
        <h1 className={foundation.title}>Spacing</h1>
        <p className={foundation.subtitle}>
          Base spacing scale and control heights defined today.
        </p>
      </header>

      <section className={foundation.section}>
        <h2 className={foundation.sectionTitle}>Base scale (4px)</h2>
        <div className={foundation.gridResponsive}>
          {spacingEntries.map(([key]) => (
            <div key={key} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenMeta}>spacing.{key}</div>
              <div className={classNames(styles.bar, styles.barVariant[key])} />
              <div className={styles.tokenMeta}>{spacing[key]}px</div>
            </div>
          ))}
        </div>
      </section>

      <section className={foundation.section}>
        <h2 className={foundation.sectionTitle}>Control heights</h2>
        <div className={foundation.gridResponsive}>
          {controlEntries.map(([name]) => (
            <div key={name} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenMeta}>controlHeights.{name}</div>
              <div className={classNames(styles.control, styles.controlVariant[name])} />
              <div className={styles.tokenMeta}>{controlHeights[name]}px</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
