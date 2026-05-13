import type { CSSProperties, HTMLAttributes } from 'react';

export type IconName =
  | 'money-circle'
  | 'user-circle'
  | 'cart'
  | 'ticket'
  | 'shield-check'
  | 'trend-up'
  | 'trend-down'
  | 'trend-flat'
  | 'chart-line'
  | 'chart-pie'
  | 'chart-bar'
  | 'medal'
  | 'table-rows';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  name: IconName;
  size?: IconSize;
  color?: CSSProperties['color'];
  /** 提供时作为 a11y 名称，并取消 aria-hidden；不提供时图标视为装饰元素 */
  label?: string;
}
