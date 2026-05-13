import type { HTMLAttributes, InputHTMLAttributes } from 'react';

export type RadioProps = InputHTMLAttributes<HTMLInputElement>;

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}
