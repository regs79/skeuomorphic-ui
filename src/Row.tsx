import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import { readableOn } from './color.js';
import { cx } from './cx.js';
import { PencilIcon } from './icons.js';
import styles from './Row.module.css';

type RowProps = ComponentProps<'div'> & {
  /** Being dragged: lifted off the list with a shadow. */
  lifted?: boolean | undefined;
  /** Holds an inline edit form; text becomes selectable again. */
  editing?: boolean | undefined;
  /** A colour bar down the left edge. */
  accent?: string | undefined;
  muted?: boolean | undefined;
};

/**
 * A surface with a main tap target and, optionally, a narrow action at its
 * end. Compose it: `<Row><Row.Main/><Row.Edit/></Row>`. The wrapper is a div
 * rather than a button so the action can be a button too.
 */
function RowRoot({ lifted, editing, accent, muted, className, style, ...rest }: RowProps) {
  const vars = accent ? ({ ...style, '--accent': accent } as CSSProperties) : style;
  return (
    <div
      {...rest}
      style={vars}
      className={cx(styles.row, className)}
      data-lifted={lifted ? '' : undefined}
      data-editing={editing ? '' : undefined}
      data-accent={accent ? '' : undefined}
      data-muted={muted ? '' : undefined}
    />
  );
}

/** The row's main tap target. Spread a drag handle's listeners onto it. */
function Main({ className, type = 'button', ...rest }: ComponentProps<'button'>) {
  return <button {...rest} type={type} className={cx(styles.main, className)} />;
}

/** The same layout as Main, for a row that is not tappable. */
function Content({ className, ...rest }: ComponentProps<'div'>) {
  return <div {...rest} className={cx(styles.content, className)} />;
}

type ActionProps = Omit<ComponentProps<'button'>, 'aria-label'> & { label: string };

/** A narrow icon button at the end of the row. */
function Action({ label, className, type = 'button', ...rest }: ActionProps) {
  return <button {...rest} type={type} className={cx(styles.action, className)} aria-label={label} />;
}

/** The pencil. */
function Edit(props: Omit<ActionProps, 'children'>) {
  return (
    <Action {...props}>
      <PencilIcon />
    </Action>
  );
}

/** Stacks a name over its meta line. */
function Text({ className, ...rest }: ComponentProps<'span'>) {
  return <span {...rest} className={cx(styles.text, className)} />;
}

function Name({ className, ...rest }: ComponentProps<'span'>) {
  return <span {...rest} className={cx(styles.name, className)} />;
}

/** Secondary text: a note, a category, a count of things. */
function Meta({ className, ...rest }: ComponentProps<'span'>) {
  return <span {...rest} className={cx(styles.meta, className)} />;
}

/** The drag affordance. Decorative: the whole Main is the handle. */
function Grip({ className, ...rest }: ComponentProps<'span'>) {
  return (
    <span {...rest} className={cx(styles.grip, className)} aria-hidden>
      ≡
    </span>
  );
}

/** "This goes somewhere." */
function Chevron({ className, ...rest }: ComponentProps<'span'>) {
  return (
    <span {...rest} className={cx(styles.chevron, className)} aria-hidden>
      ›
    </span>
  );
}

/** The row opened into a small form. Pair with `editing` on the Row. */
function Body({ className, ...rest }: ComponentProps<'div'>) {
  return <div {...rest} className={cx(styles.body, className)} />;
}

/** The form's buttons. Put the destructive one first: it sits apart on the left. */
function Actions({ className, ...rest }: ComponentProps<'div'>) {
  return <div {...rest} className={cx(styles.actions, className)} />;
}

type RowButtonProps = ComponentProps<'button'> & Pick<RowProps, 'accent' | 'muted'>;

/** A row that is one button: a link to a detail screen. */
function RowButton({ accent, muted, className, style, type = 'button', ...rest }: RowButtonProps) {
  const vars = accent ? ({ ...style, '--accent': accent } as CSSProperties) : style;
  return (
    <button
      {...rest}
      type={type}
      style={vars}
      className={cx(styles.row, styles.button, className)}
      data-accent={accent ? '' : undefined}
      data-muted={muted ? '' : undefined}
    />
  );
}

export const Row = Object.assign(RowRoot, {
  Main,
  Content,
  Action,
  Edit,
  Text,
  Name,
  Meta,
  Grip,
  Chevron,
  Body,
  Actions,
  Button: RowButton,
});

type CheckRowProps = Omit<ComponentProps<'button'>, 'onChange' | 'role' | 'aria-checked'> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Inside an edit body, which is already a surface: sit on the page colour instead, and do not strike the name. */
  inset?: boolean | undefined;
};

/** A whole-row checkbox. Unticked strikes the name through unless `inset`. */
export function CheckRow({ checked, onChange, inset, className, children, ...rest }: CheckRowProps) {
  return (
    <button
      {...rest}
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={cx(styles.row, styles.button, className)}
      data-inset={inset ? '' : undefined}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.box} aria-hidden>
        {checked ? '✓' : ''}
      </span>
      {children}
    </button>
  );
}

type BadgeProps = ComponentProps<'span'> & { tone?: 'priority' | undefined };

/** A count or a short tag at the end of a row. */
export function Badge({ tone, className, ...rest }: BadgeProps) {
  return <span {...rest} className={cx(styles.badge, className)} data-tone={tone} />;
}

type MonogramProps = Omit<ComponentProps<'span'>, 'color'> & {
  /** Raw hex. The text colour is derived from its luminance here, never stored. */
  color: string;
  children: ReactNode;
};

/** A coloured tile with a letter or two in it. */
export function Monogram({ color, className, style, ...rest }: MonogramProps) {
  return (
    <span
      {...rest}
      className={cx(styles.monogram, className)}
      style={{ ...style, background: color, color: readableOn(color) }}
      aria-hidden
    />
  );
}
