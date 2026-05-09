import { HTMLAttributes } from 'react';

export type LoadingSize = 'small' | 'medium' | 'large';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoadingSize;
  tip?: string;
  fullscreen?: boolean;
  className?: string;
}
