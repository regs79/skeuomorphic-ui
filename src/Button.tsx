import type { ComponentProps, ReactNode } from 'react';
import { cx } from './cx.js';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'danger' | 'quiet';

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant | undefined;
  /** Full width. Text variants also grow to a tappable height. */
  block?: boolean | undefined;
};

export function Button({ variant = 'primary', block, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cx(styles.button, className)}
      data-variant={variant}
      data-block={block ? '' : undefined}
    />
  );
}

/** A wrapping row of chips. */
export function Chips({ className, ...rest }: ComponentProps<'div'>) {
  return <div {...rest} className={cx(styles.chips, className)} />;
}

type ChipProps = Omit<ComponentProps<'button'>, 'aria-pressed'> & {
  /** Omit for a chip that is an action rather than a toggle. */
  pressed?: boolean | undefined;
  /** Drawn as an outline: a thing that could be created by tapping it. */
  suggested?: boolean | undefined;
};

/** A pill toggle. Pressed shows a tick as well as a fill. */
export function Chip({ pressed, suggested, className, type = 'button', ...rest }: ChipProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cx(styles.chip, className)}
      aria-pressed={pressed}
      data-suggested={suggested ? '' : undefined}
    />
  );
}

export type SegmentedOption<T> = { value: T; label: ReactNode };

type SegmentedProps<T> = {
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  /** Accessible name for the group. Omit when a visible Field label already names it. */
  label?: string | undefined;
  className?: string | undefined;
};

/** One of a few, with radio semantics. Values are compared with ===. */
export function Segmented<T extends string | number | boolean>({ value, options, onChange, label, className }: SegmentedProps<T>) {
  return (
    <div className={cx(styles.segmented, className)} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          className={styles.segment}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
