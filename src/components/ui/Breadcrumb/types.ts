import type { HTMLAttributes, ReactNode } from 'react';

export type BreadcrumbItemType = { title: ReactNode; href?: string };

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}
