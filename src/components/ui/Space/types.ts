import { HTMLAttributes, ReactNode } from 'react';

export type SpaceSize = number | 'small' | 'medium' | 'large';
export type SpaceDirection = 'horizontal' | 'vertical';
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  direction?: SpaceDirection;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  align?: SpaceAlign;
  wrap?: boolean;
  split?: ReactNode;
  children: ReactNode;
  className?: string;
}
