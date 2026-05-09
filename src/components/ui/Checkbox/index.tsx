import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { CheckboxProps } from './types';
import { Check, Minus } from 'lucide-react';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      onChange,
      label,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = (ref as any) || inputRef;

    useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    const isChecked = checked !== undefined ? checked : undefined;
    const showCheck = isChecked && !indeterminate;
    const showIndeterminate = indeterminate;

    return (
      <label className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'cursor-not-allowed opacity-60', className)}>
        <div className="relative">
          <input
            ref={combinedRef}
            type="checkbox"
            checked={isChecked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'w-4 h-4 border rounded flex items-center justify-center transition-all',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1',
              !isChecked && !indeterminate && 'bg-[var(--填充-fill/组件绑定/复选框-checkbox/未选)] border-[var(--边框-border/组件绑定/复选框-checkbox/未选)]',
              !isChecked && !indeterminate && !disabled && 'peer-hover:bg-[var(--填充-fill/组件绑定/复选框-checkbox/悬停)] peer-hover:border-[var(--边框-border/组件绑定/复选框-checkbox/悬停)]',
              isChecked && !indeterminate && !disabled && 'bg-[var(--填充-fill/组件绑定/复选框-checkbox/选中)] border-[var(--填充-fill/组件绑定/复选框-checkbox/选中)]',
              isChecked && !indeterminate && disabled && 'bg-[var(--填充-fill/组件绑定/复选框-checkbox/选中_禁用)] border-[var(--填充-fill/组件绑定/复选框-checkbox/选中_禁用)]',
              indeterminate && !disabled && 'bg-[var(--填充-fill/组件绑定/复选框-checkbox/半选)] border-[var(--边框-border/组件绑定/复选框-checkbox/半选)]',
              indeterminate && disabled && 'bg-[var(--填充-fill/组件绑定/复选框-checkbox/半选_禁用)] border-[var(--边框-border/组件绑定/复选框-checkbox/半选_禁用)]',
              disabled && 'bg-[var(--填充-fill/组件绑定/复选框-checkbox/禁用)] border-[var(--边框-border/组件绑定/复选框-checkbox/禁用)]'
            )}
          >
            {showCheck && (
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            )}
            {showIndeterminate && (
              <Minus className="w-3 h-3 text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]" strokeWidth={3} />
            )}
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
export type { CheckboxProps };
