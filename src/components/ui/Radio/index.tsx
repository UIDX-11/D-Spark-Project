import React, { forwardRef, createContext, useContext, useState } from 'react';
import { cn } from '../../../utils/cn';
import { RadioProps, RadioGroupProps } from './types';

interface RadioContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      value,
      checked: controlledChecked,
      disabled: componentDisabled = false,
      label,
      onChange,
      ...props
    },
    ref
  ) => {
    const context = useContext(RadioContext);
    const disabled = componentDisabled || context?.disabled || false;
    const checked = context ? context.value === value : controlledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange?.(e);
        context?.onChange?.(value);
      }
    };

    return (
      <label className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'cursor-not-allowed opacity-60', className)}>
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            name={context?.name}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'w-4 h-4 border rounded-full flex items-center justify-center transition-all',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1',
              !checked && 'bg-[var(--填充-fill/组件绑定/单选框-radio/未选)] border-[var(--边框-border/组件绑定/单选框-radio/未选)]',
              !checked && !disabled && 'peer-hover:border-[var(--边框-border/组件绑定/单选框-radio/悬停)]',
              checked && !disabled && 'bg-[var(--填充-fill/组件绑定/单选框-radio/选中)] border-[var(--边框-border/组件绑定/单选框-radio/选中)]',
              checked && disabled && 'bg-[var(--填充-fill/组件绑定/单选框-radio/选中_禁用)] border-[var(--边框-border/组件绑定/单选框-radio/选中_禁用)]',
              disabled && 'bg-[var(--填充-fill/组件绑定/单选框-radio/禁用)] border-[var(--边框-border/组件绑定/单选框-radio/禁用)]'
            )}
          >
            {checked && (
              <div className={cn(
                'w-2 h-2 rounded-full',
                disabled
                  ? 'bg-[var(--边框-border/组件绑定/单选框-radio/选中_禁用)]'
                  : 'bg-[var(--边框-border/组件绑定/单选框-radio/选中)]'
              )} />
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

Radio.displayName = 'Radio';

export const RadioGroup = ({
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  children,
  className,
  direction = 'vertical',
}: RadioGroupProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <RadioContext.Provider value={{ name, value, onChange: handleChange, disabled }}>
      <div className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-6',
        className
      )}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default Radio;
export { RadioGroup };
export type { RadioProps, RadioGroupProps };
