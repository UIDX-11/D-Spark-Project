import { HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItemType {
  title: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemType[];
  separator?: ReactNode;
  className?: string;
}
