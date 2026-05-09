import { forwardRef, useId } from 'react';
import type { InputProps } from './Input.types';
import { cn } from '@/utils/cn';

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      size = 'md',
      error = false,
      errorMessage,
      helperText,
      prefix,
      suffix,
      id: providedId,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium text-[var(--灰色-dust/light/120)]',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && <span className="text-[var(--红色-red/light/50)] ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {prefix && (
            <div className="absolute left-3 flex items-center text-[var(--灰色-dust/light/100)]">
              {prefix}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? errorId
                : helperText
                ? helperId
                : undefined
            }
            className={cn(
              'w-full rounded-lg border transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              'placeholder:text-[var(--灰色-dust/light/90)]',
              'disabled:cursor-not-allowed disabled:bg-[var(--灰色-dust/light/30)] disabled:opacity-50',
              error
                ? 'border-[var(--红色-red/light/50)] focus:ring-[var(--红色-red/light/50)] focus:border-[var(--红色-red/light/50)]'
                : 'border-[var(--灰色-dust/light/60)] focus:ring-[var(--蓝色-blue/light/50)] focus:border-[var(--蓝色-blue/light/50)]',
              sizeStyles[size],
              prefix && 'pl-10',
              suffix && 'pr-10',
              className
            )}
            {...props}
          />

          {suffix && (
            <div className="absolute right-3 flex items-center text-[var(--灰色-dust/light/100)]">
              {suffix}
            </div>
          )}
        </div>

        {error && errorMessage && (
          <p
            id={errorId}
            className="text-sm text-[var(--红色-red/light/50)]"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        {!error && helperText && (
          <p
            id={helperId}
            className="text-sm text-[var(--灰色-dust/light/100)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
