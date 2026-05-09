import { forwardRef } from 'react';
import type { AlertProps } from './Alert.types';
import { cn } from '@/utils/cn';

const variantStyles = {
  info: 'bg-[var(--青色-cyan/light/10)] border-[var(--青色-cyan/light/30)] text-[var(--青色-cyan/light/50)]',
  success: 'bg-[var(--绿色-green/light/10)] border-[var(--绿色-green/light/30)] text-[var(--绿色-green/light/50)]',
  warning: 'bg-[var(--橘色-orange/light/10)] border-[var(--橘色-orange/light/30)] text-[var(--橘色-orange/light/50)]',
  error: 'bg-[var(--红色-red/light/10)] border-[var(--红色-red/light/30)] text-[var(--红色-red/light/50)]',
};

const DefaultIcons = {
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      description,
      icon,
      closable = false,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const displayIcon = icon ?? DefaultIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex gap-3 p-4 rounded-lg border',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {displayIcon && <div className="flex-shrink-0">{displayIcon}</div>}

        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-[var(--灰色-dust/light/120)] mb-1">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-sm text-[var(--灰色-dust/light/110)]">
              {description}
            </p>
          )}
          {children && (
            <div className="text-sm text-[var(--灰色-dust/light/110)]">
              {children}
            </div>
          )}
        </div>

        {closable && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-[var(--灰色-dust/light/100)] hover:text-[var(--灰色-dust/light/120)] transition-colors"
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
