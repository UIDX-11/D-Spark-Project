import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { EmptyProps } from './types';
import { Inbox } from 'lucide-react';

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      className,
      image,
      description = 'No Data',
      children,
      ...props
    },
    ref
  ) => {
    const defaultImage = (
      <div className="w-16 h-16 rounded-full bg-[var(--填充-fill/组件绑定/空状态empty-state/中性_200)] flex items-center justify-center">
        <Inbox className="w-8 h-8 text-[var(--填充-fill/组件绑定/空状态empty-state/中性_500)]" />
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center py-12 px-4',
          className
        )}
        {...props}
      >
        <div className="mb-4">
          {image !== undefined ? image : defaultImage}
        </div>
        {description && (
          <div className="text-[14px] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] mb-4">
            {description}
          </div>
        )}
        {children}
      </div>
    );
  }
);

Empty.displayName = 'Empty';

export default Empty;
export type { EmptyProps };
