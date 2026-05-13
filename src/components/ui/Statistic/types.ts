import type { HTMLAttributes, ReactNode } from 'react';

export type StatisticTrendDirection = 'up' | 'down' | 'flat';

export interface StatisticTrend {
  direction: StatisticTrendDirection;
  value: number | string;
  /** 默认 "vs 上周" 类描述；不传则不展示 */
  description?: string;
}

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix' | 'title'> {
  title: ReactNode;
  value: ReactNode;
  /** 通常为图标，置于标题或数值左侧；page 仅传 props，不写原生标签 */
  prefix?: ReactNode;
  /** 单位/后缀文本 */
  suffix?: ReactNode;
  /** 与 suffix 等价别名（便于配置项使用 unit 字段） */
  unit?: ReactNode;
  trend?: StatisticTrend;
  trendPlacement?: 'bottom' | 'inline';
  /** 自动千分位格式化 numeric value；为 true 时 value 必须是 number */
  groupSeparator?: boolean;
}
