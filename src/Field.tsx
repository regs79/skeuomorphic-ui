import { useState } from 'react';
import type { ComponentProps, FormEvent, ReactNode } from 'react';
import { Button } from './Button.js';
import { cx } from './cx.js';
import { Hint } from './Text.js';
import styles from './Field.module.css';

type FieldProps = {
  label: ReactNode;
  hint?: ReactNode | undefined;
  /**
   * A `label` wraps one control, so tapping the caption focuses it. Use `div`
   * when the field holds buttons (chips, a segmented control): a label would
   * forward the tap to the first of them.
   */
  as?: 'label' | 'div' | undefined;
  className?: string | undefined;
  children: ReactNode;
};

/** A captioned control with an optional hint underneath. */
export function Field({ label, hint, as = 'label', className, children }: FieldProps) {
  const Tag = as;
  return (
    <Tag className={cx(styles.field, className)}>
      <span className={styles.label}>{label}</span>
      {children}
      {hint && <Hint>{hint}</Hint>}
    </Tag>
  );
}

export type InputSize = 'sm' | 'md' | 'lg';

type InputProps = Omit<ComponentProps<'input'>, 'size'> & { size?: InputSize | undefined };

export function Input({ size, className, ...rest }: InputProps) {
  return <input {...rest} className={cx(styles.input, className)} data-size={size === 'md' ? undefined : size} />;
}

type SelectProps = Omit<ComponentProps<'select'>, 'size'> & { size?: InputSize | undefined };

export function Select({ size, className, ...rest }: SelectProps) {
  return <select {...rest} className={cx(styles.input, className)} data-size={size === 'md' ? undefined : size} />;
}

type InlineFormProps = ComponentProps<'form'> & { size?: InputSize | undefined };

/** Controls in one line: the inputs grow, the buttons keep their width. */
export function InlineForm({ size, className, ...rest }: InlineFormProps) {
  return <form {...rest} className={cx(styles.inline, className)} data-size={size === 'md' ? undefined : size} />;
}

type AddFormProps = {
  /** Called with the trimmed text; the field clears first so the new row does not lag it. */
  onAdd: (text: string) => unknown;
  placeholder: string;
  /** The input's accessible name. Defaults to the placeholder. */
  label?: string | undefined;
  action?: string | undefined;
  size?: InputSize | undefined;
  autoCapitalize?: ComponentProps<'input'>['autoCapitalize'] | undefined;
  className?: string | undefined;
};

/** A text field with an Add button: the bottom of every "list of things" screen. */
export function AddForm({ onAdd, placeholder, label = placeholder, action = 'Add', size = 'lg', autoCapitalize = 'words', className }: AddFormProps) {
  const [text, setText] = useState('');

  function submit(e: FormEvent) {
    e.preventDefault();
    const next = text.trim();
    if (!next) return;
    setText('');
    void onAdd(next);
  }

  return (
    <InlineForm size={size} className={className} onSubmit={submit}>
      <Input
        size={size}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoCapitalize={autoCapitalize}
        enterKeyHint="done"
      />
      <Button type="submit" className={styles.action} disabled={!text.trim()}>
        {action}
      </Button>
    </InlineForm>
  );
}
