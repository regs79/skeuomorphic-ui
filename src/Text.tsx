import type { ComponentProps } from 'react';
import { cx } from './cx.js';
import styles from './Text.module.css';

/** A line of muted explanation under a control or at the top of a screen. */
export function Hint({ className, ...rest }: ComponentProps<'p'>) {
  return <p {...rest} className={cx(styles.hint, className)} />;
}

/** A small uppercase heading over a group of rows. */
export function SectionTitle({ className, ...rest }: ComponentProps<'h2'>) {
  return <h2 {...rest} className={cx(styles.sectionTitle, className)} />;
}

/** Text for screen readers only: the meaning of an icon or a colour. */
export function VisuallyHidden({ className, ...rest }: ComponentProps<'span'>) {
  return <span {...rest} className={cx(styles.srOnly, className)} />;
}
