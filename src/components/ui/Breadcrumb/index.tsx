import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { BreadcrumbProps } from './types';
import { ChevronRight } from 'lucide-react';

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      items,
      separator = <ChevronRight className="w-3 h-3" />,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={cn('flex items-center gap-2 text-[13px]', className)}
        aria-label="Breadcrumb"
        {...props}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="flex items-center gap-2">
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={cn(
                      'hover:text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] transition-colors',
                      isLast
                        ? 'text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] cursor-default'
                        : 'text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] cursor-pointer'
                    )}
                  >
                    {item.title}
                  </a>
                ) : item.onClick ? (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={cn(
                      'hover:text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] transition-colors',
                      isLast
                        ? 'text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] cursor-default'
                        : 'text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] cursor-pointer'
                    )}
                  >
                    {item.title}
                  </button>
                ) : (
                  <span
                    className={cn(
                      isLast
                        ? 'text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]'
                        : 'text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]'
                    )}
                  >
                    {item.title}
                  </span>
                )}
              </div>
              {!isLast && (
                <span className="text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] flex items-center">
                  {separator}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
export type { BreadcrumbProps, BreadcrumbItemType };
