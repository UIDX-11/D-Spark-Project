import { Fragment } from 'react';
import { cn } from '../../../utils/cn';
import type { ListItemProps, ListProps } from './types';

function resolveKey<T>(
  rowKey: ListProps<T>['rowKey'],
  item: T,
  index: number
): string | number {
  if (typeof rowKey === 'function') return rowKey(item, index);
  if (rowKey && typeof item === 'object' && item !== null) {
    const v = (item as Record<string, unknown>)[rowKey as string];
    if (typeof v === 'string' || typeof v === 'number') return v;
  }
  return index;
}

const SIZE_PAD: Record<NonNullable<ListProps['size']>, string> = {
  small:
    '[&>li]:px-[length:var(--ds-space-2)] [&>li]:py-[length:var(--ds-space-2)]',
  medium:
    '[&>li]:px-[length:var(--ds-space-3)] [&>li]:py-[length:var(--ds-space-3)]',
};

export function ListItem({ prefix, extra, children, className, ...rest }: ListItemProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-[length:var(--ds-space-3)] border-b border-[var(--边框-border/无组件绑定/描边_常规)] last:border-b-0',
        className
      )}
      {...rest}
    >
      {prefix ? <div className="shrink-0">{prefix}</div> : null}
      <div className="min-w-0 flex-1">{children}</div>
      {extra ? <div className="shrink-0">{extra}</div> : null}
    </li>
  );
}

function List<T>({
  data,
  renderItem,
  rowKey,
  bordered,
  size = 'medium',
  className,
  ...rest
}: ListProps<T>) {
  return (
    <ul
      className={cn(
        'flex w-full flex-col',
        SIZE_PAD[size],
        bordered &&
          'rounded-[length:var(--ds-radius-surface)] border border-[var(--边框-border/无组件绑定/描边_常规)]',
        className
      )}
      {...rest}
    >
      {data.map((item, index) => (
        <Fragment key={resolveKey(rowKey, item, index)}>{renderItem(item, index)}</Fragment>
      ))}
    </ul>
  );
}

export default List;
export type { ListProps, ListItemProps } from './types';
