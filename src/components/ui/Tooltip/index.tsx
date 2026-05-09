import React, { useState, useRef, forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { TooltipProps } from './types';

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ title, placement = 'top', children, className }, ref) => {
    const [visible, setVisible] = useState(false);

    const placementStyles = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
        {visible && title && (
          <div
            className={cn(
              'absolute z-50 px-2 py-1 text-[12px] rounded whitespace-nowrap',
              'bg-[var(--主色-primary/global-light/50-22)] text-white shadow-lg',
              'pointer-events-none',
              placementStyles[placement],
              className
            )}
          >
            {title}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
export type { TooltipProps };
