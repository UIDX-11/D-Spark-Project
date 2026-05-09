import { HTMLAttributes, ReactNode } from 'react';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  image?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}
