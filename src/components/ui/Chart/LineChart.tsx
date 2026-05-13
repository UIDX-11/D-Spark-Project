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
import type { LineChartProps } from './types';

export default function LineChart({
  xAxis,
  series,
  dualY = false,
  yAxisName,
  yAxisNameRight,
  height = 320,
  colors,
  className,
  ...rest
}: LineChartProps) {
  const option = useMemo(() => {
    const palette = colors ?? CHART_PALETTE;

    const yAxisDef = dualY
      ? [
          {
            type: 'value' as const,
            name: yAxisName,
            position: 'left' as const,
            axisLine: { lineStyle: { color: CHART_AXIS_COLOR } },
            axisLabel: { color: CHART_LABEL_COLOR, fontFamily: CHART_FONT },
            splitLine: { lineStyle: { color: CHART_SPLIT_LINE, type: 'dashed' as const } },
          },
          {
            type: 'value' as const,
            name: yAxisNameRight,
            position: 'right' as const,
            axisLine: { lineStyle: { color: CHART_AXIS_COLOR } },
            axisLabel: { color: CHART_LABEL_COLOR, fontFamily: CHART_FONT },
            splitLine: { show: false },
          },
        ]
      : [
          {
            type: 'value' as const,
            name: yAxisName,
            axisLine: { lineStyle: { color: CHART_AXIS_COLOR } },
            axisLabel: { color: CHART_LABEL_COLOR, fontFamily: CHART_FONT },
            splitLine: { lineStyle: { color: CHART_SPLIT_LINE, type: 'dashed' as const } },
          },
        ];

    return {
      color: palette,
      tooltip: {
        trigger: 'axis' as const,
        backgroundColor: CHART_TOOLTIP_BG,
        borderColor: CHART_TOOLTIP_BORDER,
        textStyle: { color: CHART_TEXT_PRIMARY, fontFamily: CHART_FONT, fontSize: 12 },
        axisPointer: { type: 'line' as const, lineStyle: { color: CHART_SPLIT_LINE } },
      },
      legend: {
        top: 0,
        right: 0,
        icon: 'roundRect',
        textStyle: { color: CHART_LABEL_COLOR, fontFamily: CHART_FONT },
        data: series.map((s) => s.name),
      },
      grid: { left: 16, right: 16, top: 36, bottom: 8, containLabel: true },
      xAxis: {
        type: 'category' as const,
        boundaryGap: false,
        data: xAxis,
        axisLine: { lineStyle: { color: CHART_AXIS_COLOR } },
        axisLabel: { color: CHART_LABEL_COLOR, fontFamily: CHART_FONT },
      },
      yAxis: yAxisDef,
      series: series.map((s, i) => {
        const color = palette[i % palette.length];
        return {
          name: s.name,
          type: 'line' as const,
          smooth: s.smooth ?? true,
          showSymbol: false,
          yAxisIndex: dualY ? s.yAxisIndex ?? 0 : 0,
          data: s.data,
          lineStyle: { width: 2, color },
          itemStyle: { color },
          areaStyle: s.area
            ? {
                color: {
                  type: 'linear' as const,
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: color.replace(/,\s*1\)/, ', 0.24)') },
                    { offset: 1, color: color.replace(/,\s*1\)/, ', 0)') },
                  ],
                },
              }
            : undefined,
        };
      }),
    };
  }, [xAxis, series, dualY, yAxisName, yAxisNameRight, colors]);

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
