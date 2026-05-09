import { HTMLAttributes, ReactNode } from 'react';

export type TabsVariant = 'line' | 'card' | 'capsule';

export interface TabItem {
  key: string;
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  variant?: TabsVariant;
  onChange?: (key: string) => void;
  className?: string;
}
