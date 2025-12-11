"use client";

import { classNames } from "../../components/ui/utils/classNames";
import { radius } from "../../components/ui/theme/radius";
import * as foundation from "../foundationCommon.css";
import * as styles from "./radii.css";

export default function RadiiPage() {
  const entries = Object.entries(radius);

  return (
    <div className={foundation.page}>
      <header className={foundation.header}>
        <h1 className={foundation.title}>Radii</h1>
        <p className={foundation.subtitle}>
          Corner rounding scale currently defined.
        </p>
      </header>

      <section className={foundation.section}>
        <div className={foundation.gridResponsive}>
          {entries.map(([name]) => (
            <div key={name} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenMeta}>radius.{name}</div>
              <div className={classNames(styles.block, styles.blockVariant[name])} />
              <div className={styles.tokenMeta}>{radius[name]}px</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
