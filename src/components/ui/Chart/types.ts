import type { HTMLAttributes } from 'react';

export interface ChartSeries {
  name: string;
  data: number[];
  /** 双 Y 轴时映射到第几个 Y 轴（0 或 1） */
  yAxisIndex?: 0 | 1;
  /** 折线图：平滑曲线 */
  smooth?: boolean;
  /** 折线图：是否启用渐变区域 */
  area?: boolean;
}

export interface ChartCommonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'> {
  height?: number | string;
  /** 自定义颜色覆盖（按系列顺序）；不传则使用 token 默认色板 */
  colors?: string[];
  /** 顶部副标题 */
  description?: string;
}

export interface LineChartProps extends ChartCommonProps {
  xAxis: string[];
  series: ChartSeries[];
  /** 双 Y 轴：左右两侧分别对应一个 yAxis；series[].yAxisIndex 决定挂到哪边 */
  dualY?: boolean;
  /** 左 Y 轴名称 */
  yAxisName?: string;
  /** 右 Y 轴名称（dualY 时使用） */
  yAxisNameRight?: string;
}

export interface PieDatum {
  name: string;
  value: number;
}

export interface PieChartProps extends ChartCommonProps {
  data: PieDatum[];
  /** 是否展示为环形（默认 true） */
  donut?: boolean;
  /** 环形中心展示总量；总量字符串由调用方决定 */
  centerLabel?: string;
  centerValue?: string;
}

export interface BarChartProps extends ChartCommonProps {
  xAxis: string[];
  series: ChartSeries[];
  /** 水平柱状 */
  horizontal?: boolean;
  /** 旋转 X 轴标签角度 */
  xAxisRotate?: number;
}
