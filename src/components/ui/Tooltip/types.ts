import { ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  title: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
  className?: string;
}
