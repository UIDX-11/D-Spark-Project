export interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  showSizeChanger?: boolean;
  onChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}
