import type { HTMLAttributes, ReactNode } from 'react';

export type TagTheme = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export type TagSize = 'small' | 'medium';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  theme?: TagTheme;
  size?: TagSize;
  /** 边框透明、背景填充更浅的弱化样式 */
  subtle?: boolean;
  children?: ReactNode;
}
