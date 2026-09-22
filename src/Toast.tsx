import type { ReactNode } from 'react';
import styles from './Toast.module.css';

type ToastProps = {
  /** The action's label: "Undo". The whole toast is the button. */
  action: ReactNode;
  onAction: () => void;
  children: ReactNode;
};

/** A brief notice with one action, out of the way at the top right. */
export function Toast({ action, onAction, children }: ToastProps) {
  return (
    <button type="button" className={styles.toast} onClick={onAction}>
      <span className={styles.label}>{children}</span>
      <span className={styles.action}>{action}</span>
    </button>
  );
}
