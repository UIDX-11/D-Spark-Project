import { HTMLAttributes, ReactNode } from 'react';

export type AvatarSize = number | 'small' | 'medium' | 'large';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}
