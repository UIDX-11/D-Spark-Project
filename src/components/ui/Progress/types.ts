import type { HTMLAttributes } from 'react';

export type ProgressTheme = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export type ProgressSize = 'small' | 'medium' | 'large';

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 0-100 之间的数值，超出会被夹到端点 */
  percentage: number;
  theme?: ProgressTheme;
  size?: ProgressSize;
  /** 是否在右侧显示百分比文案 */
  showText?: boolean;
}
