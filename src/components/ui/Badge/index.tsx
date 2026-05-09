import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { BadgeProps } from './types';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      dot = false,
      count,
      showZero = false,
      overflowCount = 99,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-[var(--填充-fill/组件绑定/徽标-badge/默认)] text-white',
      success: 'bg-[var(--成功色success/global-light/50)] text-white',
      warning: 'bg-[var(--告警色warning/global-light/50)] text-white',
      danger: 'bg-[var(--危险色danger/global-light/50)] text-white',
      info: 'bg-[var(--接入中&提示commissioning&prompt/global-light/50)] text-white',
    };

    const displayCount = count !== undefined && count > overflowCount
      ? `${overflowCount}+`
      : count;

    const shouldShowBadge = dot || (count !== undefined && (showZero || count > 0));

    if (!children) {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center',
            'px-2 h-5 rounded-full text-[12px]',
            variantStyles[variant],
            className
          )}
          {...props}
        >
          {dot ? null : displayCount}
        </span>
      );
    }

    return (
      <span className="relative inline-block">
        {children}
        {shouldShowBadge && (
          <span
            ref={ref}
            className={cn(
              'absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
              dot ? 'w-2 h-2 rounded-full' : 'min-w-[18px] h-[18px] px-1.5 rounded-full',
              'flex items-center justify-center text-[12px]',
              variantStyles[variant],
              className
            )}
            {...props}
          >
            {dot ? null : displayCount}
          </span>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
export type { BadgeProps };
