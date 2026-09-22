import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import { cx } from './cx.js';
import styles from './Screen.module.css';

type ScreenProps =
  | ({ as?: 'div' } & ComponentProps<'div'>)
  | ({ as: 'form' } & ComponentProps<'form'>);

/** A full-height column: header, body, and an optional bar pinned at the bottom. */
export function Screen(props: ScreenProps) {
  if (props.as === 'form') {
    const { as: _as, className, ...rest } = props;
    return <form {...rest} className={cx(styles.screen, className)} />;
  }
  const { as: _as, className, ...rest } = props;
  return <div {...rest} className={cx(styles.screen, className)} />;
}

type HeaderProps = {
  title: ReactNode;
  /** Renders a back chevron before the title. */
  onBack?: (() => void) | undefined;
  backLabel?: string | undefined;
  /** Replaces the back button: a Cancel link, say. */
  leading?: ReactNode | undefined;
  trailing?: ReactNode | undefined;
  /** A colour rule under the header, for a screen that belongs to one thing. */
  accent?: string | undefined;
  size?: 'default' | 'large' | undefined;
  className?: string | undefined;
};

/**
 * The sticky header. It owns the status-bar inset, so nothing scrolls under
 * the Dynamic Island with a transparent background behind it.
 */
export function ScreenHeader({ title, onBack, backLabel = 'Back', leading, trailing, accent, size, className }: HeaderProps) {
  const style = accent ? ({ '--accent': accent } as CSSProperties) : undefined;
  return (
    <header
      className={cx(styles.header, className)}
      style={style}
      data-accent={accent ? '' : undefined}
      data-size={size === 'large' ? 'large' : undefined}
    >
      {onBack && (
        <button type="button" className={styles.back} onClick={onBack} aria-label={backLabel}>
          ‹
        </button>
      )}
      {leading}
      <h1 className={styles.title}>{title}</h1>
      {trailing && <div className={styles.trailing}>{trailing}</div>}
    </header>
  );
}

type BodyProps = ComponentProps<'main'> & {
  /** Stack children with air between them, for a form. */
  stack?: boolean | undefined;
};

export function ScreenBody({ stack, className, ...rest }: BodyProps) {
  return <main {...rest} className={cx(styles.body, className)} data-stack={stack ? '' : undefined} />;
}

type BarProps = ComponentProps<'div'> & {
  /** Children stack vertically instead of sitting in a row. */
  stack?: boolean | undefined;
};

/** Sticky at the bottom, above the home indicator. */
export function BottomBar({ stack, className, ...rest }: BarProps) {
  return <div {...rest} className={cx(styles.bottomBar, className)} data-stack={stack ? '' : undefined} />;
}

type EmptyProps = ComponentProps<'div'> & {
  /** Take the whole screen and centre, for a first-run state with a button in it. */
  fill?: boolean | undefined;
};

/** "Nothing here yet." Muted, centred, never an error. */
export function Empty({ fill, className, ...rest }: EmptyProps) {
  return <div {...rest} className={cx(styles.empty, className)} data-fill={fill ? '' : undefined} />;
}
