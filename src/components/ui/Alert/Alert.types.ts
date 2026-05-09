import { HTMLAttributes, ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Alert title
   */
  title?: string;

  /**
   * Alert description/content
   */
  description?: ReactNode;

  /**
   * Custom icon
   */
  icon?: ReactNode;

  /**
   * Whether alert can be closed
   * @default false
   */
  closable?: boolean;

  /**
   * Close handler
   */
  onClose?: () => void;

  /**
   * Main content (alternative to description)
   */
  children?: ReactNode;
}
