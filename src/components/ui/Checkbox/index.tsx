import { forwardRef, useEffect, useRef, type MutableRefObject } from 'react';
import { cn } from '../../../utils/cn';
import type { CheckboxProps } from './types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const setRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = node;
    };

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = Boolean(indeterminate);
    }, [indeterminate]);

    return (
      <input
        ref={setRef}
        type="checkbox"
        className={cn(
          'h-[length:var(--ds-icon-xs)] w-[length:var(--ds-icon-xs)] rounded border border-[var(--边框-border/无组件绑定/描边_常规)] accent-[var(--primary)]',
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
