import type { ComponentProps, ReactNode } from 'react';
import { cx } from './cx.js';
import styles from './Sheet.module.css';

type SheetProps = {
  /** Accessible name of the dialog. */
  label: string;
  title?: ReactNode | undefined;
  /** An action on the left of the title: Remove, Cancel. */
  leading?: ReactNode | undefined;
  /** An action on the right: Done. */
  trailing?: ReactNode | undefined;
  /** Tapping the backdrop. */
  onDismiss: () => void;
  className?: string | undefined;
  children: ReactNode;
};

/**
 * A bottom sheet. Slides up over the screen and scrolls if it must; the
 * screen behind stays where it was so dismissing lands back on it.
 */
export function Sheet({ label, title, leading, trailing, onDismiss, className, children }: SheetProps) {
  return (
    <div className={styles.backdrop} onClick={onDismiss}>
      <div
        className={cx(styles.sheet, className)}
        role="dialog"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || leading || trailing) && (
          <header className={styles.header}>
            {leading ?? <span />}
            {title && <h2 className={styles.title}>{title}</h2>}
            {trailing ?? <span />}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}

/** A caption with a small control beside it: "Until [date]". */
export function InlineField({ className, ...rest }: ComponentProps<'label'>) {
  return <label {...rest} className={cx(styles.inlineField, className)} />;
}
