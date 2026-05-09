import { HTMLAttributes, ReactNode } from 'react';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  title?: ReactNode;
  message: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  showIcon?: boolean;
  className?: string;
}
