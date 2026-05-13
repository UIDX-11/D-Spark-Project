import { cn } from '../../../utils/cn';
import type { BadgeProps } from './types';

export default function Badge({ className, count, dot, showZero, variant = 'default', children, ...props }: BadgeProps) {
  const show = dot || (typeof count === 'number' && (showZero ? count >= 0 : count > 0));

  return (
    <span className={cn('relative inline-flex', className)} {...props}>
      {children}
      {show ? (
        <span
          className={cn(
            'absolute -right-1 -top-1 flex min-h-[length:var(--ds-badge-count-min)] min-w-[length:var(--ds-badge-count-min)] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none text-[var(--primary-foreground)]',
            dot ? 'h-[length:var(--ds-badge-dot)] w-[length:var(--ds-badge-dot)] min-h-0 min-w-0 p-0' : '',
            variant === 'success' ? 'bg-[var(--success)]' : 'bg-[var(--destructive)]'
          )}
          aria-hidden={dot}
        >
          {dot ? null : count}
        </span>
      ) : null}
    </span>
  );
}
