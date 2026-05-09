import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { LoadingProps } from './types';
import { Loader2 } from 'lucide-react';

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      className,
      size = 'medium',
      tip,
      fullscreen = false,
      ...props
    },
    ref
  ) => {
    const sizeMap = {
      small: 'w-4 h-4',
      medium: 'w-8 h-8',
      large: 'w-12 h-12',
    };

    const spinner = (
      <Loader2
        className={cn(
          sizeMap[size],
          'animate-spin text-[var(--主色-primary/global-light/50-22)]'
        )}
      />
    );

    const content = (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center gap-2',
          !fullscreen && 'py-8',
          className
        )}
        {...props}
      >
        {spinner}
        {tip && (
          <div className="text-[13px] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] mt-2">
            {tip}
          </div>
        )}
      </div>
    );

    if (fullscreen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--蒙层-mask/loading-遮罩)]">
          {content}
        </div>
      );
    }

    return content;
  }
);

Loading.displayName = 'Loading';

export default Loading;
export type { LoadingProps };
