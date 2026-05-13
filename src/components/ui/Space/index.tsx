import { cn } from '../../../utils/cn';
import type { SpaceProps } from './types';

const gap: Record<NonNullable<SpaceProps['size']>, string> = {
  mini: 'gap-[length:var(--ds-space-1)]',
  small: 'gap-[length:var(--ds-space-2)]',
  medium: 'gap-[length:var(--ds-space-4)]',
  large: 'gap-[length:var(--ds-space-6)]',
};

const alignMap: Record<NonNullable<SpaceProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
};

export default function Space({ className, align, size = 'medium', wrap, children, ...props }: SpaceProps) {
  return (
    <div
      className={cn('flex flex-row', gap[size], align && alignMap[align], wrap && 'flex-wrap', className)}
      {...props}
    >
      {children}
    </div>
  );
}
