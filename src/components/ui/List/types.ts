import type { HTMLAttributes, ReactNode } from 'react';

export interface ListProps<T = unknown> extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** 提取 key 的字段或函数；未提供时使用 index */
  rowKey?: keyof T | ((item: T, index: number) => string | number);
  bordered?: boolean;
  size?: 'small' | 'medium';
}

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'prefix'> {
  /** 左侧主插槽（一般为序号/头像/图标） */
  prefix?: ReactNode;
  /** 右侧操作或状态 */
  extra?: ReactNode;
  children?: ReactNode;
}
