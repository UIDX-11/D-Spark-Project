import type { HTMLAttributes, ReactNode } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
}
