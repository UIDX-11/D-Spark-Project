import { cn } from '../../../utils/cn';
import type { ProgressProps, ProgressSize, ProgressTheme } from './types';

const TRACK_HEIGHT: Record<ProgressSize, string> = {
  small: 'h-[length:var(--ds-space-1)]',
  medium: 'h-[length:var(--ds-space-1-5)]',
  large: 'h-[length:var(--ds-space-2)]',
};

const FILL_BG: Record<ProgressTheme, string> = {
  primary: 'bg-[var(--accent)]',
  success: 'bg-[var(--success)]',
  warning: 'bg-[var(--warning)]',
  danger: 'bg-[var(--destructive)]',
  neutral: 'bg-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]',
};

function clamp(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

export default function Progress({
  percentage,
  theme = 'primary',
  size = 'medium',
  showText = false,
  className,
  ...rest
}: ProgressProps) {
  const value = clamp(percentage);

  return (
    <div
      className={cn('flex w-full items-center gap-[length:var(--ds-space-2)]', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-[length:var(--ds-radius-pill)] bg-[var(--中性色-neutral/global-light/30-f7)]',
          TRACK_HEIGHT[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-[length:var(--ds-radius-pill)] transition-[width] duration-300',
            FILL_BG[theme]
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      {showText ? (
        <span className="shrink-0 text-[length:var(--ds-font-caption)] tabular-nums text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
          {Math.round(value)}%
        </span>
      ) : null}
    </div>
  );
}

export type { ProgressProps, ProgressTheme, ProgressSize } from './types';
