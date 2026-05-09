import { HTMLAttributes, ReactNode } from 'react';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  width?: number | string;
  centered?: boolean;
  maskClosable?: boolean;
  children: ReactNode;
  className?: string;
}
