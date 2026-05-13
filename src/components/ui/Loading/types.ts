import type { HTMLAttributes } from 'react';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
}
