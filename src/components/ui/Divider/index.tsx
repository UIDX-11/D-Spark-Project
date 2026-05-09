import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { DividerProps } from './types';

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = 'horizontal',
      text,
      textAlign = 'center',
      ...props
    },
    ref
  ) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn(
            'inline-block w-[1px] h-full bg-[var(--边框-border/无组件绑定/描边_常规)]',
            className
          )}
          {...props}
        />
      );
    }

    if (text) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-4 my-4', className)}
          {...props}
        >
          {textAlign !== 'left' && (
            <div className={cn(
              'h-[1px] bg-[var(--边框-border/无组件绑定/描边_常规)]',
              textAlign === 'center' ? 'flex-1' : 'w-8'
            )} />
          )}
          <span className="text-[13px] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
            {text}
          </span>
          {textAlign !== 'right' && (
            <div className={cn(
              'h-[1px] bg-[var(--边框-border/无组件绑定/描边_常规)]',
              textAlign === 'center' ? 'flex-1' : 'w-8'
            )} />
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'h-[1px] w-full bg-[var(--边框-border/无组件绑定/描边_常规)] my-4',
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
export type { DividerProps };
