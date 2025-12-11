"use client";

import { classNames } from "../../components/ui/utils/classNames";
import { motion } from "../../components/ui/theme/motion";
import * as foundation from "../foundationCommon.css";
import * as styles from "./motion.css";

export default function MotionPage() {
  const durationEntries = Object.entries(motion.duration);
  const easingEntries = Object.entries(motion.easing);

  return (
    <div className={foundation.page}>
      <header className={foundation.header}>
        <h1 className={foundation.title}>Motion</h1>
        <p className={foundation.subtitle}>
          Timing and easing curves currently defined.
        </p>
      </header>

      <section className={foundation.section}>
        <h2 className={foundation.sectionTitle}>Duration</h2>
        <div className={foundation.gridResponsive}>
          {durationEntries.map(([name, value]) => (
            <div key={name} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenName}>duration.{name}</div>
              <div className={styles.tokenMeta}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={foundation.section}>
        <h2 className={foundation.sectionTitle}>Easing</h2>
        <div className={foundation.gridResponsive}>
          {easingEntries.map(([name, value]) => (
            <div key={name} className={classNames(foundation.surface, styles.card)}>
              <div className={styles.tokenName}>easing.{name}</div>
              <div className={styles.tokenMeta}>{value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
