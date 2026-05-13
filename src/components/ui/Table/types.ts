import type { HTMLAttributes, ReactNode } from 'react';

export interface TableColumn {
  key: string;
  title: ReactNode;
  width?: string | number;
  dataIndex?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, record: Record<string, unknown>, index: number) => ReactNode;
}

export interface TableRowSelection {
  selectedRowKeys: string[];
  onChange: (keys: string[]) => void;
  getCheckboxProps?: (record: Record<string, unknown>) => { disabled?: boolean };
}

export interface TableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  columns: TableColumn[];
  dataSource: Record<string, unknown>[];
  rowKey: string | ((record: Record<string, unknown>) => string);
  rowSelection?: TableRowSelection;
}
