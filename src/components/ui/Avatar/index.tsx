import { cn } from '../../../utils/cn';
import type { AvatarProps } from './types';

const sizes = {
  small: 'h-[length:var(--ds-avatar-sm)] w-[length:var(--ds-avatar-sm)] text-[length:var(--ds-font-caption)]',
  medium: 'h-[length:var(--ds-avatar-md)] w-[length:var(--ds-avatar-md)] text-[length:var(--ds-font-body)]',
  large: 'h-[length:var(--ds-avatar-lg)] w-[length:var(--ds-avatar-lg)] text-[length:var(--ds-font-subtitle)]',
};

export default function Avatar({ className, size = 'medium', children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'inline-flex select-none items-center justify-center rounded-full bg-[var(--muted)] font-semibold text-[var(--foreground)]',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
