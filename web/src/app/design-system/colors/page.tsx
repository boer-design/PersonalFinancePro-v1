"use client";

import { classNames } from "../../components/ui/utils/classNames";
import { palette } from "../../components/ui/theme/colors";
import * as foundation from "../foundationCommon.css";
import * as styles from "./colors.css";

export default function ColorsPage() {
  const swatches = Object.entries(palette);

  return (
    <div className={foundation.page}>
      <header className={foundation.header}>
        <h1 className={foundation.title}>Colors</h1>
        <p className={foundation.subtitle}>Palette tokens available today.</p>
      </header>

      <section className={foundation.section}>
        <h2 className={foundation.sectionTitle}>Palette</h2>
        <div className={foundation.gridResponsive}>
          {swatches.map(([name]) => (
            <div key={name} className={classNames(foundation.surface, styles.card)}>
              <div
                className={classNames(styles.swatch, styles.swatchVariant[name])}
              />
              <div className={styles.tokenName}>{name}</div>
              <div className={styles.tokenValue}>{palette[name]}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
