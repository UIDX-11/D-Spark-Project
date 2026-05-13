import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'main' | 'secondary' | 'text' | 'virtual';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonType?: 'danger';
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
}
