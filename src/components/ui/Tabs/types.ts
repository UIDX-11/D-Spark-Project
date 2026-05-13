import type { ReactNode } from 'react';

export interface TabItem {
  key: string;
  label: ReactNode;
  children?: ReactNode;
}

export interface TabsProps {
  activeKey: string;
  onChange: (key: string) => void;
  variant?: 'line' | 'card';
  items: TabItem[];
  className?: string;
}
