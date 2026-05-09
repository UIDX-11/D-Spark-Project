import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './types';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)]',
          'border border-[var(--边框-border/无组件绑定/描边_常规)]',
          'rounded-lg overflow-hidden',
          hoverable && 'transition-shadow hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, extra, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-4',
          'border-b border-[var(--边框-border/无组件绑定/描边_常规)]',
          'flex items-center justify-between',
          className
        )}
        {...props}
      >
        {title && (
          <h3 className="text-[16px] font-medium text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
            {title}
          </h3>
        )}
        {children}
        {extra && <div>{extra}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 py-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-4',
          'border-t border-[var(--边框-border/无组件绑定/描边_常规)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
export { CardHeader, CardBody, CardFooter };
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps };
