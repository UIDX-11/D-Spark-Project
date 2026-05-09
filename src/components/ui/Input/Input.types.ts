import { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label for the input
   */
  label?: string;

  /**
   * Size of the input
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Whether the input has an error
   * @default false
   */
  error?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display below input
   */
  helperText?: string;

  /**
   * Prefix element (icon or text)
   */
  prefix?: ReactNode;

  /**
   * Suffix element (icon or text)
   */
  suffix?: ReactNode;

  /**
   * Additional className for the wrapper
   */
  wrapperClassName?: string;
}
