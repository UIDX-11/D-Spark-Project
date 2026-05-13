import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { cn } from '../../../utils/cn';
import {
  CHART_FONT,
  CHART_LABEL_COLOR,
  CHART_PALETTE,
  CHART_TEXT_PRIMARY,
  CHART_TOOLTIP_BG,
  CHART_TOOLTIP_BORDER,
} from './theme';
import type { PieChartProps } from './types';

export default function PieChart({
  data,
  donut = true,
  centerLabel,
  centerValue,
  height = 320,
  colors,
  className,
  ...rest
}: PieChartProps) {
  const option = useMemo(() => {
    const palette = colors ?? CHART_PALETTE;
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    return {
      color: palette,
      tooltip: {
        trigger: 'item' as const,
        backgroundColor: CHART_TOOLTIP_BG,
        borderColor: CHART_TOOLTIP_BORDER,
        textStyle: { color: CHART_TEXT_PRIMARY, fontFamily: CHART_FONT, fontSize: 12 },
        formatter: (params: { name: string; value: number; percent: number; color: string }) =>
          `<div style="display:flex;align-items:center;gap:8px;">
             <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${params.color};"></span>
             <span>${params.name}</span>
             <span style="color:${CHART_LABEL_COLOR};">${params.percent.toFixed(1)}%</span>
             <span style="font-weight:600;">${params.value.toLocaleString('en-US')}</span>
           </div>`,
      },
      legend: {
        bottom: 0,
        left: 'center',
        icon: 'roundRect',
        textStyle: { color: CHART_LABEL_COLOR, fontFamily: CHART_FONT },
      },
      title: centerValue
        ? {
            text: centerValue,
            subtext: centerLabel,
            left: 'center',
            top: '38%',
            textStyle: {
              color: CHART_TEXT_PRIMARY,
              fontFamily: CHART_FONT,
              fontSize: 22,
              fontWeight: 600,
            },
            subtextStyle: {
              color: CHART_LABEL_COLOR,
              fontFamily: CHART_FONT,
              fontSize: 12,
            },
          }
        : undefined,
      series: [
        {
          name: centerLabel ?? '占比',
          type: 'pie' as const,
          radius: donut ? ['52%', '72%'] : ['0%', '70%'],
          center: ['50%', '46%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderColor: CHART_TOOLTIP_BG,
            borderWidth: 2,
          },
          label: { show: false },
          labelLine: { show: false },
          data: sortedData,
        },
      ],
    };
  }, [data, donut, centerLabel, centerValue, colors]);

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
