import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { cn } from '../../../utils/cn';
import {
  CHART_AXIS_COLOR,
  CHART_FONT,
  CHART_LABEL_COLOR,
  CHART_PALETTE,
  CHART_SPLIT_LINE,
  CHART_TEXT_PRIMARY,
  CHART_TOOLTIP_BG,
  CHART_TOOLTIP_BORDER,
} from './theme';
import type { BarChartProps } from './types';

export default function BarChart({
  xAxis,
  series,
  horizontal = false,
  xAxisRotate = 0,
  height = 320,
  colors,
  className,
  ...rest
}: BarChartProps) {
  const option = useMemo(() => {
    const palette = colors ?? CHART_PALETTE;

    const categoryAxis = {
      type: 'category' as const,
      data: xAxis,
      axisLine: { lineStyle: { color: CHART_AXIS_COLOR } },
      axisLabel: {
        color: CHART_LABEL_COLOR,
        fontFamily: CHART_FONT,
        rotate: xAxisRotate,
        interval: 0,
      },
    };

    const valueAxis = {
      type: 'value' as const,
      axisLine: { show: false },
      axisLabel: { color: CHART_LABEL_COLOR, fontFamily: CHART_FONT },
      splitLine: { lineStyle: { color: CHART_SPLIT_LINE, type: 'dashed' as const } },
    };

    return {
      color: palette,
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        backgroundColor: CHART_TOOLTIP_BG,
        borderColor: CHART_TOOLTIP_BORDER,
        textStyle: { color: CHART_TEXT_PRIMARY, fontFamily: CHART_FONT, fontSize: 12 },
      },
      legend: {
        top: 0,
        right: 0,
        icon: 'roundRect',
        textStyle: { color: CHART_LABEL_COLOR, fontFamily: CHART_FONT },
        data: series.map((s) => s.name),
      },
      grid: { left: 16, right: 16, top: 36, bottom: 8, containLabel: true },
      xAxis: horizontal ? valueAxis : categoryAxis,
      yAxis: horizontal ? categoryAxis : valueAxis,
      series: series.map((s, i) => ({
        name: s.name,
        type: 'bar' as const,
        data: s.data,
        barMaxWidth: 32,
        itemStyle: {
          color: palette[i % palette.length],
          borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
        },
      })),
    };
  }, [xAxis, series, horizontal, xAxisRotate, colors]);

  return (
    <div className={cn('w-full', className)} {...rest}>
      <ReactECharts
        option={option}
        style={{ width: '100%', height: typeof height === 'number' ? `${height}px` : height }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
