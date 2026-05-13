import { cn } from '../../../utils/cn';
import type { SelectProps } from './types';

export default function Select({ id, options, value, onChange, className, disabled }: SelectProps) {
  return (
    <select
      id={id}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        'h-[length:var(--ds-control-height-md)] w-full min-w-[var(--ds-select-min-width)] rounded-[length:var(--ds-radius-control)] border border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--input-background)] px-[length:var(--ds-control-padding-x-sm)] text-[length:var(--ds-font-body)] text-[var(--foreground)]',
        className
      )}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
