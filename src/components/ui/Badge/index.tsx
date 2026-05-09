import { forwardRef } from 'react';
import type { BadgeProps } from './Badge.types';
import { cn } from '@/utils/cn';

const variantStyles = {
  default: 'bg-[var(--灰色-dust/light/40)] text-[var(--灰色-dust/light/120)]',
  success: 'bg-[var(--绿色-green/light/10)] text-[var(--绿色-green/light/50)] border border-[var(--绿色-green/light/30)]',
  warning: 'bg-[var(--橘色-orange/light/10)] text-[var(--橘色-orange/light/50)] border border-[var(--橘色-orange/light/30)]',
  error: 'bg-[var(--红色-red/light/10)] text-[var(--红色-red/light/50)] border border-[var(--红色-red/light/30)]',
  info: 'bg-[var(--青色-cyan/light/10)] text-[var(--青色-cyan/light/50)] border border-[var(--青色-cyan/light/30)]',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

const dotStyles = {
  default: 'bg-[var(--灰色-dust/light/100)]',
  success: 'bg-[var(--绿色-green/light/50)]',
  warning: 'bg-[var(--橘色-orange/light/50)]',
  error: 'bg-[var(--红色-red/light/50)]',
  info: 'bg-[var(--青色-cyan/light/50)]',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full font-medium',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full', dotStyles[variant])}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
