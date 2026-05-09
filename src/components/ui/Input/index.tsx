import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { InputProps } from './types';
import { X } from 'lucide-react';

const inputWrapperVariants = cva(
  'inline-flex items-center border transition-colors focus-within:ring-2 focus-within:ring-offset-1',
  {
    variants: {
      size: {
        small: 'h-[28px] text-[12px]',
        medium: 'h-[32px] text-[13px]',
        large: 'h-[40px] text-[14px]',
      },
      status: {
        default: 'border-[var(--边框-border/无组件绑定/描边_常规)] hover:border-[var(--边框-border/无组件绑定/描边_悬停)] focus-within:border-[var(--边框-border/无组件绑定/描边_强调)]',
        error: 'border-[var(--危险色danger/global-light/50)] focus-within:ring-[var(--危险色danger/global-light/50)]',
        warning: 'border-[var(--告警色warning/global-light/50)] focus-within:ring-[var(--告警色warning/global-light/50)]',
        success: 'border-[var(--成功色success/global-light/50)] focus-within:ring-[var(--成功色success/global-light/50)]',
      },
      disabled: {
        true: 'border-[var(--边框-border/无组件绑定/描边_禁用)] bg-[var(--填充-fill/无组件绑定/禁用-disabled)] cursor-not-allowed',
        false: 'bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)]',
      },
    },
    defaultVariants: {
      size: 'medium',
      status: 'default',
      disabled: false,
    },
  }
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'medium',
      status = 'default',
      prefix,
      suffix,
      allowClear = false,
      onClear,
      disabled = false,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value || '');
    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = currentValue && String(currentValue).length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onClear?.();
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    };

    return (
      <div className={cn(inputWrapperVariants({ size, status, disabled }), 'px-3 gap-2 rounded', className)}>
        {prefix && <span className="flex-shrink-0 text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">{prefix}</span>}
        <input
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'flex-1 outline-none bg-transparent',
            'text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]',
            'placeholder:text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]',
            disabled && 'cursor-not-allowed text-[var(--文字&图标-text&icon/无组件绑定/禁用-disabled)]'
          )}
          {...props}
        />
        {allowClear && hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] hover:text-[var(--文字&图标-text&icon/无组件绑定/次要-secondary)] cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        )}
        {suffix && <span className="flex-shrink-0 text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">{suffix}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
export type { InputProps };
