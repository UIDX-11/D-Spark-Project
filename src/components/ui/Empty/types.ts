import type { HTMLAttributes, ReactNode } from 'react';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
