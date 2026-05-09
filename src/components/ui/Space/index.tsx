import React, { forwardRef, Children, Fragment } from 'react';
import { cn } from '../../../utils/cn';
import { SpaceProps, SpaceSize } from './types';

const sizeMap: Record<string, string> = {
  small: '8px',
  medium: '16px',
  large: '24px',
};

const getSize = (size: SpaceSize): string => {
  if (typeof size === 'number') {
    return `${size}px`;
  }
  return sizeMap[size] || sizeMap.medium;
};

export const Space = forwardRef<HTMLDivElement, SpaceProps>(
  (
    {
      className,
      direction = 'horizontal',
      size = 'medium',
      align,
      wrap = false,
      split,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const gap = Array.isArray(size)
      ? `${getSize(size[1])} ${getSize(size[0])}`
      : getSize(size);

    const childNodes = Children.toArray(children).filter(child => child !== null && child !== undefined);

    const alignMap = {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex',
          direction === 'horizontal' ? 'flex-row' : 'flex-col',
          align && alignMap[align],
          wrap && 'flex-wrap',
          className
        )}
        style={{ gap, ...style }}
        {...props}
      >
        {childNodes.map((child, index) => (
          <Fragment key={index}>
            {child}
            {split && index < childNodes.length - 1 && (
              <div className="flex-shrink-0">{split}</div>
            )}
          </Fragment>
        ))}
      </div>
    );
  }
);

Space.displayName = 'Space';

export default Space;
export type { SpaceProps };
