import { forwardRef, useMemo, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import Checkbox from '../Checkbox';
import type { TableProps } from './types';

function getRecordKey(record: Record<string, unknown>, rowKey: TableProps['rowKey']): string {
  if (typeof rowKey === 'function') return rowKey(record);
  const v = record[rowKey];
  return v === undefined || v === null ? '' : String(v);
}

function getCellValue(record: Record<string, unknown>, dataIndex?: string): unknown {
  if (!dataIndex) return undefined;
  return record[dataIndex];
}

export const Table = forwardRef<HTMLDivElement, TableProps>(
  ({ className, columns, dataSource, rowKey, rowSelection, ...props }, ref) => {
    const keysOnPage = useMemo(
      () => dataSource.map((r) => getRecordKey(r, rowKey)).filter(Boolean),
      [dataSource, rowKey]
    );

    const allPageSelected =
      keysOnPage.length > 0 && keysOnPage.every((k) => rowSelection?.selectedRowKeys.includes(k));
    const somePageSelected = keysOnPage.some((k) => rowSelection?.selectedRowKeys.includes(k));

    const toggleAllPage = () => {
      if (!rowSelection) return;
      const { selectedRowKeys, onChange } = rowSelection;
      if (allPageSelected) {
        onChange(selectedRowKeys.filter((k) => !keysOnPage.includes(k)));
      } else {
        onChange(Array.from(new Set([...selectedRowKeys, ...keysOnPage])));
      }
    };

    const toggleRow = (key: string, disabled?: boolean) => {
      if (!rowSelection || disabled) return;
      const { selectedRowKeys, onChange } = rowSelection;
      if (selectedRowKeys.includes(key)) {
        onChange(selectedRowKeys.filter((k) => k !== key));
      } else {
        onChange([...selectedRowKeys, key]);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full overflow-x-auto rounded-[length:var(--ds-radius-surface)] border border-[var(--边框-border/无组件绑定/描边_常规)]',
          className
        )}
        {...props}
      >
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-[var(--中性色-neutral/global-light/30-f7)]">
              {rowSelection && (
                <th className="w-10 border-b border-[var(--边框-border/无组件绑定/描边_常规)] px-[length:var(--ds-space-3)] py-[length:var(--ds-space-3)] align-middle">
                  <Checkbox
                    aria-label="Select all on page"
                    checked={allPageSelected}
                    indeterminate={!allPageSelected && somePageSelected}
                    onChange={toggleAllPage}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width !== undefined ? { width: col.width } : undefined}
                  className={cn(
                    'border-b border-[var(--边框-border/无组件绑定/描边_常规)] px-[length:var(--ds-space-4)] py-[length:var(--ds-space-3)] text-[length:var(--ds-font-caption)] font-medium text-[var(--文字&图标-text&icon/无组件绑定/次要-secondary)]',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right'
                  )}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((record, rowIndex) => {
              const key = getRecordKey(record, rowKey);
              const checkboxProps = rowSelection?.getCheckboxProps?.(record) ?? {};
              const disabled = Boolean(checkboxProps.disabled);

              return (
                <tr
                  key={key || String(rowIndex)}
                  className="bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)] hover:bg-[var(--中性色-neutral/global-light/30-f7)]"
                >
                  {rowSelection && (
                    <td className="border-b border-[var(--边框-border/无组件绑定/描边_常规)] px-[length:var(--ds-space-3)] py-[length:var(--ds-space-3)] align-middle">
                      <Checkbox
                        aria-label={`Select row ${key}`}
                        checked={rowSelection.selectedRowKeys.includes(key)}
                        disabled={disabled}
                        onChange={() => toggleRow(key, disabled)}
                      />
                    </td>
                  )}
                  {columns.map((col) => {
                    const raw = getCellValue(record, col.dataIndex);
                    const content: ReactNode = col.render ? col.render(raw, record, rowIndex) : (raw as ReactNode);
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          'border-b border-[var(--边框-border/无组件绑定/描边_常规)] px-[length:var(--ds-space-4)] py-[length:var(--ds-space-3)] text-[length:var(--ds-font-body)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]',
                          col.align === 'center' && 'text-center',
                          col.align === 'right' && 'text-right'
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

export default Table;
