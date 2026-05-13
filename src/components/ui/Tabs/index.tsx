import { cn } from '../../../utils/cn';
import type { TabsProps } from './types';

export default function Tabs({ activeKey, onChange, variant = 'line', items, className }: TabsProps) {
  const active = items.find((i) => i.key === activeKey) ?? items[0];

  return (
    <div className={cn('flex flex-col gap-[length:var(--ds-space-4)]', className)}>
      <div
        role="tablist"
        className={cn(
          'flex gap-[length:var(--ds-space-4)] border-b border-[var(--边框-border/无组件绑定/描边_常规)]',
          variant === 'card' && 'rounded-[length:var(--ds-radius-control)] bg-[var(--muted)] p-1'
        )}
      >
        {items.map((it) => {
          const selected = it.key === activeKey;
          return (
            <button
              key={it.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(it.key)}
              className={cn(
                '-mb-px border-b-2 border-transparent px-[length:var(--ds-space-3)] py-[length:var(--ds-space-2)] text-[length:var(--ds-font-tab)] font-medium text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]',
                selected && 'border-[var(--primary)] text-[var(--foreground)]'
              )}
            >
              {it.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="min-h-0">
        {active?.children}
      </div>
    </div>
  );
}
