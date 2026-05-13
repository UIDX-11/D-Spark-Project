import { cn } from '../../../utils/cn';
import Icon from '../Icon';
import type { StatisticProps, StatisticTrendDirection } from './types';

const TREND_COLOR: Record<StatisticTrendDirection, string> = {
  up: 'text-[var(--success)]',
  down: 'text-[var(--destructive)]',
  flat: 'text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]',
};

const TREND_ICON = {
  up: 'trend-up',
  down: 'trend-down',
  flat: 'trend-flat',
} as const;

function formatValue(value: unknown, groupSeparator?: boolean): string {
  if (typeof value === 'number' && groupSeparator) {
    return value.toLocaleString('en-US');
  }
  return String(value);
}

export default function Statistic({
  title,
  value,
  prefix,
  suffix,
  unit,
  trend,
  trendPlacement = 'bottom',
  groupSeparator,
  className,
  ...rest
}: StatisticProps) {
  const suffixDisplay = suffix ?? unit;
  const displayValue =
    typeof value === 'number' ? formatValue(value, groupSeparator) : value;

  const trendNode = trend ? (
    <span className={cn('inline-flex items-center gap-[length:var(--ds-space-1)]', TREND_COLOR[trend.direction])}>
      <Icon name={TREND_ICON[trend.direction]} size="xs" />
      <span className="text-[length:var(--ds-font-caption)] font-medium leading-none">
        {typeof trend.value === 'number' ? `${trend.value}%` : trend.value}
      </span>
      {trend.description ? (
        <span className="text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
          {trend.description}
        </span>
      ) : null}
    </span>
  ) : null;

  return (
    <div
      className={cn('flex flex-col gap-[length:var(--ds-space-2)]', className)}
      {...rest}
    >
      <div className="flex items-center gap-[length:var(--ds-space-2)]">
        {prefix ? (
          <span className="inline-flex h-[length:var(--ds-icon-md)] w-[length:var(--ds-icon-md)] items-center justify-center text-[var(--accent)]">
            {prefix}
          </span>
        ) : null}
        <span className="text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
          {title}
        </span>
      </div>

      <div className="flex items-baseline gap-[length:var(--ds-space-2)]">
        <span className="text-[length:var(--text-xl)] font-semibold leading-[1.25] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
          {displayValue}
        </span>
        {suffixDisplay ? (
          <span className="text-[length:var(--ds-font-body)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
            {suffixDisplay}
          </span>
        ) : null}
        {trend && trendPlacement === 'inline' ? trendNode : null}
      </div>

      {trend && trendPlacement === 'bottom' ? <div>{trendNode}</div> : null}
    </div>
  );
}

export type { StatisticProps, StatisticTrend, StatisticTrendDirection } from './types';
