import type { HTMLAttributes, ReactNode } from 'react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean;
  placement?: DrawerPlacement;
  title?: ReactNode;
  children?: ReactNode;
}
