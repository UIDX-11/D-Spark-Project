import { HTMLAttributes, ReactNode } from 'react';

export type TagVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  closable?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}
