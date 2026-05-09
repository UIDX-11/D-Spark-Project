import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import { cn } from '@/utils/cn';

const variantStyles = {
  primary: 'bg-[var(--蓝色-blue/light/50)] text-white hover:bg-[var(--蓝色-blue/light/60)] active:bg-[var(--蓝色-blue/light/60)] disabled:bg-[var(--灰色-dust/light/60)] disabled:text-[var(--灰色-dust/light/90)]',
  secondary: 'bg-[var(--灰色-dust/light/40)] text-[var(--灰色-dust/light/120)] hover:bg-[var(--灰色-dust/light/50)] active:bg-[var(--灰色-dust/light/60)] disabled:opacity-50',
  outline: 'border border-[var(--灰色-dust/light/60)] text-[var(--灰色-dust/light/120)] hover:bg-[var(--灰色-dust/light/20)] active:bg-[var(--灰色-dust/light/30)] disabled:opacity-50',
  ghost: 'text-[var(--灰色-dust/light/120)] hover:bg-[var(--灰色-dust/light/20)] active:bg-[var(--灰色-dust/light/30)] disabled:opacity-50',
  danger: 'bg-[var(--红色-red/light/50)] text-white hover:bg-[var(--红色-red/light/60)] active:bg-[var(--红色-red/light/60)] disabled:opacity-50',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center',
          'rounded-lg',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--蓝色-blue/light/50)] focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
