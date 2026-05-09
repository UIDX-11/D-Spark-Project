import { InputHTMLAttributes, ReactNode } from 'react';

export type SwitchSize = 'small' | 'medium';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  className?: string;
}
