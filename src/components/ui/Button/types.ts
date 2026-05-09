import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'main' | 'secondary' | 'text' | 'facial' | 'virtual';
export type ButtonType = 'default' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonType?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}
