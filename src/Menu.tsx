import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { MoreIcon } from './icons.js';
import styles from './Menu.module.css';

export type MenuItem = { label: string; onSelect: () => void };

type MenuProps = {
  items: MenuItem[];
  /** Below a rule, after the items: a version tag, say. */
  footer?: ReactNode;
  label?: string;
  icon?: ReactNode;
};

/** A top-right overflow menu: a trigger, a backdrop, and a short list. */
export function Menu({ items, footer, label = 'Menu', icon = <MoreIcon /> }: MenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const choose = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {icon}
      </button>

      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)}>
          <div className={styles.menu} role="menu" aria-label={label} onClick={(e) => e.stopPropagation()}>
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={styles.item}
                onClick={() => choose(item.onSelect)}
              >
                {item.label}
              </button>
            ))}
            {footer && (
              <>
                {items.length > 0 && <hr className={styles.rule} />}
                {footer}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/** A menu item, for a footer that carries an action as well as text. */
export function MenuAction({ onSelect, children }: { onSelect: () => void; children: ReactNode }) {
  return (
    <button type="button" role="menuitem" className={styles.item} onClick={onSelect}>
      {children}
    </button>
  );
}

/** Small muted text at the foot of the menu. */
export function MenuFooter({ children }: { children: ReactNode }) {
  return <span className={styles.footer}>{children}</span>;
}
