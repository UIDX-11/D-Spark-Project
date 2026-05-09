import { HTMLAttributes } from 'react';

export type PaginationSize = 'small' | 'medium';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  current: number;
  total: number;
  pageSize?: number;
  size?: PaginationSize;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  onChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}
