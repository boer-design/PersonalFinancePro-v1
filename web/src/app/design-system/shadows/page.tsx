"use client";

import { classNames } from "../../components/ui/utils/classNames";
import { shadows } from "../../components/ui/theme/shadows";
import * as foundation from "../foundationCommon.css";
import * as styles from "./shadows.css";

export default function ShadowsPage() {
  const entries = Object.entries(shadows);

  return (
    <div className={foundation.page}>
      <header className={foundation.header}>
        <h1 className={foundation.title}>Shadows</h1>
        <p className={foundation.subtitle}>
          Elevation shadows defined for components.
        </p>
      </header>

      <section className={foundation.section}>
        <div className={foundation.gridResponsive}>
          {entries.map(([name]) => (
            <div key={name} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenName}>shadows.{name}</div>
              <div className={classNames(styles.block, styles.blockVariant[name])}>
                {shadows[name]}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
