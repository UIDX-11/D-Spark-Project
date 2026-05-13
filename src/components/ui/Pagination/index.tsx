import { cn } from '../../../utils/cn';
import type { PaginationProps } from './types';

const PAGE_SIZES = [10, 20, 50];

export default function Pagination({
  current,
  total,
  pageSize,
  showSizeChanger,
  onChange,
  onPageSizeChange,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className={cn('flex flex-wrap items-center gap-[length:var(--ds-space-3)]', className)}>
      <button
        type="button"
        className="h-[length:var(--ds-pagination-height-md)] min-w-[length:var(--ds-pagination-cell-min-md)] rounded-[length:var(--ds-radius-control)] border border-[var(--边框-border/无组件绑定/描边_常规)] px-2 text-[length:var(--ds-font-caption)] disabled:opacity-40"
        disabled={current <= 1}
        onClick={() => onChange?.(current - 1)}
      >
        Prev
      </button>
      <span className="text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
        Page {current} / {totalPages}
      </span>
      <button
        type="button"
        className="h-[length:var(--ds-pagination-height-md)] min-w-[length:var(--ds-pagination-cell-min-md)] rounded-[length:var(--ds-radius-control)] border border-[var(--边框-border/无组件绑定/描边_常规)] px-2 text-[length:var(--ds-font-caption)] disabled:opacity-40"
        disabled={current >= totalPages}
        onClick={() => onChange?.(current + 1)}
      >
        Next
      </button>
      {showSizeChanger ? (
        <label className="flex items-center gap-2 text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
          Rows / page
          <select
            className="h-[length:var(--ds-pagination-height-sm)] rounded border border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--input-background)] px-2"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </div>
  );
}
