import type { CSSProperties } from 'react';
import { cn } from '../../../utils/cn';
import { ICON_REGISTRY } from './registry';
import type { IconProps, IconSize } from './types';

const SIZE_TOKEN: Record<Exclude<IconSize, number>, string> = {
  xs: 'var(--ds-icon-2xs)',
  sm: 'var(--ds-icon-xs)',
  md: 'var(--ds-icon-sm)',
  lg: 'var(--ds-icon-md)',
  xl: '32px',
};

function resolveSize(size: IconSize): { width: string; height: string } {
  if (typeof size === 'number') {
    const px = `${size}px`;
    return { width: px, height: px };
  }
  const v = SIZE_TOKEN[size];
  return { width: v, height: v };
}

export default function Icon({
  name,
  size = 'md',
  color,
  label,
  className,
  style,
  ...rest
}: IconProps) {
  const svg = ICON_REGISTRY[name];
  const { width, height } = resolveSize(size);

  const finalStyle: CSSProperties = {
    width,
    height,
    color,
    ...style,
  };

  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        'inline-flex shrink-0 items-center justify-center align-middle [&_svg]:h-full [&_svg]:w-full',
        className
      )}
      style={finalStyle}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...rest}
    />
  );
}

export type { IconName, IconProps, IconSize } from './types';
