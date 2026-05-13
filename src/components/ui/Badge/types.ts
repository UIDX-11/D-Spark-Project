import type { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count?: number;
  dot?: boolean;
  showZero?: boolean;
  variant?: 'default' | 'success';
  children?: ReactNode;
}
