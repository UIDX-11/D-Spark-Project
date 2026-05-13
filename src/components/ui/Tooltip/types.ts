import type { HTMLAttributes, ReactNode } from 'react';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  children?: ReactNode;
}
