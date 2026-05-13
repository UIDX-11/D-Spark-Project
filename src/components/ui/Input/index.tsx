import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { InputProps } from './types';

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        // Focus ring: `input.md` — use explicit style + token width/color (avoid `outline` preset which forces 2px in Tailwind v4).
        'box-border h-[length:var(--ds-control-height-md)] w-full min-w-0 rounded-[length:var(--ds-radius-control)] border border-[var(--component-input-border-default)] bg-[var(--component-input-bg-default)] px-[length:var(--ds-control-padding-x-sm)] text-[length:var(--ds-font-body)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] placeholder:text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] hover:border-[var(--component-input-border-hover)] hover:bg-[var(--component-input-bg-hover)] focus-visible:bg-[var(--component-input-bg-focus)] focus-visible:outline-solid focus-visible:outline-[length:var(--component-input-ring-focus-width)] focus-visible:outline-[color:var(--component-input-ring-focus)] focus-visible:outline-offset-0 focus-visible:border-[var(--component-input-border-focus)] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export default Input;
