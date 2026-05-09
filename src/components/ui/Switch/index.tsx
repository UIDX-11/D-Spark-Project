import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { SwitchProps } from './types';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked,
      disabled = false,
      size = 'medium',
      onChange,
      label,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    const sizeClasses = {
      small: {
        track: 'w-8 h-4',
        thumb: 'w-3 h-3',
        translate: 'translate-x-4',
      },
      medium: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5',
      },
    };

    const currentSize = sizeClasses[size];

    return (
      <label className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'cursor-not-allowed opacity-60', className)}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={controlledChecked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              currentSize.track,
              'rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1',
              'peer-checked:bg-[var(--主色-primary/global-light/50-22)]',
              'peer-checked:peer-disabled:bg-[var(--主色-primary/global-light/30-a7)]',
              !controlledChecked && !defaultChecked && 'bg-[var(--中性色-neutral/global-light/100-99)]',
              disabled && !controlledChecked && 'bg-[var(--中性色-neutral/global-light/70-cc)]'
            )}
          >
            <div
              className={cn(
                currentSize.thumb,
                'bg-white rounded-full transition-transform',
                'absolute top-0.5 left-0.5',
                'peer-checked:' + currentSize.translate
              )}
            />
          </div>
        </div>
        {label && (
          <span className={cn(
            'text-[13px]',
            disabled
              ? 'text-[var(--文字&图标-text&icon/无组件绑定/禁用-disabled)]'
              : 'text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]'
          )}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
export type { SwitchProps };
