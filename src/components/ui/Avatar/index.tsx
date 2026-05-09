import React, { forwardRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { AvatarProps, AvatarSize } from './types';
import { User } from 'lucide-react';

const sizeMap: Record<string, number> = {
  small: 24,
  medium: 32,
  large: 40,
};

const getSize = (size: AvatarSize): number => {
  if (typeof size === 'number') {
    return size;
  }
  return sizeMap[size] || sizeMap.medium;
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      size = 'medium',
      shape = 'circle',
      icon,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false);
    const pixelSize = getSize(size);
    const fontSize = pixelSize * 0.45;

    const handleImageError = () => {
      setImgError(true);
    };

    const hasImage = src && !imgError;
    const hasIcon = icon && !hasImage && !children;
    const hasText = children && !hasImage;

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center flex-shrink-0 overflow-hidden',
          'bg-[var(--中性色-neutral/global-light/50-e6)]',
          'text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]',
          shape === 'circle' ? 'rounded-full' : 'rounded',
          className
        )}
        style={{
          width: pixelSize,
          height: pixelSize,
          fontSize: `${fontSize}px`,
          ...style,
        }}
        {...props}
      >
        {hasImage && (
          <img
            src={src}
            alt={alt || 'avatar'}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        )}
        {hasIcon && <div className="flex items-center justify-center">{icon}</div>}
        {hasText && <span className="font-medium">{children}</span>}
        {!hasImage && !hasIcon && !hasText && (
          <User className="w-1/2 h-1/2" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
export type { AvatarProps };
