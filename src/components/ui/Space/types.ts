import type { HTMLAttributes, ReactNode } from 'react';

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end' | 'baseline';
  size?: 'mini' | 'small' | 'medium' | 'large';
  wrap?: boolean;
  children?: ReactNode;
}
