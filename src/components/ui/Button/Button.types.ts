import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Icon to display in the button
   */
  icon?: ReactNode;

  /**
   * Position of the icon
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';

  /**
   * Whether button should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button content
   */
  children?: ReactNode;
}
