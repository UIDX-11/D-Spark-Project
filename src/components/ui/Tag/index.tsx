import { cn } from '../../../utils/cn';
import type { TagProps, TagSize, TagTheme } from './types';

const THEME_SOLID: Record<TagTheme, string> = {
  primary: 'bg-[var(--accent)] text-[var(--accent-foreground)]',
  success: 'bg-[var(--success)] text-[var(--success-foreground)]',
  warning: 'bg-[var(--warning)] text-[var(--primary-foreground)]',
  danger: 'bg-[var(--destructive)] text-[var(--destructive-foreground)]',
  neutral: 'bg-[var(--中性色-neutral/global-light/30-f7)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]',
};

const THEME_SUBTLE: Record<TagTheme, string> = {
  primary: 'bg-[var(--info-background)] text-[var(--accent)]',
  success: 'bg-[var(--success-background)] text-[var(--success)]',
  warning: 'bg-[var(--warning-background)] text-[var(--warning)]',
  danger: 'bg-[var(--warning-background)] text-[var(--destructive)]',
  neutral:
    'bg-[var(--中性色-neutral/global-light/30-f7)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]',
};

const SIZE_CLASS: Record<TagSize, string> = {
  small:
    'h-[length:var(--ds-badge-height)] px-[length:var(--ds-space-2)] text-[length:var(--ds-font-caption)]',
  medium:
    'h-[length:var(--ds-tag-height)] px-[length:var(--ds-space-3)] text-[length:var(--ds-font-body)]',
};

export default function Tag({
  theme = 'neutral',
  size = 'medium',
  subtle = false,
  className,
  children,
  ...rest
}: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-[length:var(--ds-radius-pill)] font-medium leading-none',
        subtle ? THEME_SUBTLE[theme] : THEME_SOLID[theme],
        SIZE_CLASS[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export type { TagProps, TagTheme, TagSize } from './types';
