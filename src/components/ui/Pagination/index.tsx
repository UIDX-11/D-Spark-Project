import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { PaginationProps } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      current,
      total,
      pageSize = 10,
      size = 'medium',
      showSizeChanger = false,
      pageSizeOptions = [10, 20, 50, 100],
      onChange,
      onPageSizeChange,
      ...props
    },
    ref
  ) => {
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== current) {
        onChange?.(page, pageSize);
      }
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = Number(e.target.value);
      onPageSizeChange?.(newSize);
      onChange?.(1, newSize);
    };

    const sizeClasses = {
      small: 'h-6 min-w-[24px] text-[12px]',
      medium: 'h-8 min-w-[32px] text-[13px]',
    };

    const PageButton = ({ page, children }: { page?: number; children: React.ReactNode }) => {
      const isActive = page === current;
      const isDisabled = page === undefined;

      return (
        <button
          type="button"
          onClick={() => page && handlePageChange(page)}
          disabled={isDisabled}
          className={cn(
            'px-2 border rounded transition-colors',
            sizeClasses[size],
            isActive
              ? 'bg-[var(--主色-primary/global-light/50-22)] text-white border-[var(--主色-primary/global-light/50-22)]'
              : 'bg-white text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] border-[var(--边框-border/无组件绑定/描边_常规)] hover:border-[var(--主色-primary/global-light/50-22)]',
            isDisabled && 'opacity-40 cursor-not-allowed hover:border-[var(--边框-border/无组件绑定/描边_常规)]'
          )}
        >
          {children}
        </button>
      );
    };

    const renderPageNumbers = () => {
      const pages = [];
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(<PageButton key={i} page={i}>{i}</PageButton>);
        }
      } else {
        pages.push(<PageButton key={1} page={1}>1</PageButton>);

        if (current > 3) {
          pages.push(<span key="ellipsis1" className="px-1">...</span>);
        }

        const start = Math.max(2, current - 1);
        const end = Math.min(totalPages - 1, current + 1);

        for (let i = start; i <= end; i++) {
          pages.push(<PageButton key={i} page={i}>{i}</PageButton>);
        }

        if (current < totalPages - 2) {
          pages.push(<span key="ellipsis2" className="px-1">...</span>);
        }

        if (totalPages > 1) {
          pages.push(<PageButton key={totalPages} page={totalPages}>{totalPages}</PageButton>);
        }
      }

      return pages;
    };

    return (
      <nav
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        <PageButton page={current > 1 ? current - 1 : undefined}>
          <ChevronLeft className="w-4 h-4" />
        </PageButton>

        {renderPageNumbers()}

        <PageButton page={current < totalPages ? current + 1 : undefined}>
          <ChevronRight className="w-4 h-4" />
        </PageButton>

        {showSizeChanger && (
          <select
            value={pageSize}
            onChange={handleSizeChange}
            className={cn(
              'px-2 border border-[var(--边框-border/无组件绑定/描边_常规)] rounded bg-white',
              'text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]',
              'hover:border-[var(--主色-primary/global-light/50-22)]',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              sizeClasses[size]
            )}
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        )}

        <span className="text-[13px] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] ml-2">
          Total {total}
        </span>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
export type { PaginationProps };
