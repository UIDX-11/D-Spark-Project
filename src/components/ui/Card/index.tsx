import { forwardRef } from 'react';
import type { CardProps } from './Card.types';
import { cn } from '@/utils/cn';

const variantStyles = {
  default: 'bg-[var(--灰色-dust/light/10)] border border-[var(--灰色-dust/light/60)]',
  outlined: 'bg-transparent border border-[var(--灰色-dust/light/60)]',
  elevated: 'bg-[var(--灰色-dust/light/10)] shadow-md',
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      header,
      footer,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-200',
          variantStyles[variant],
          paddingStyles[padding],
          hoverable && 'hover:shadow-lg hover:scale-[1.02]',
          clickable && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {header && (
          <div className={cn('card-header', padding !== 'none' && 'mb-4')}>
            {header}
          </div>
        )}

        {children && <div className="card-body">{children}</div>}

        {footer && (
          <div className={cn('card-footer', padding !== 'none' && 'mt-4')}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
