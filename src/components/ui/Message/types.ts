import { ReactNode } from 'react';

export type MessageType = 'success' | 'warning' | 'error' | 'info';

export interface MessageConfig {
  type?: MessageType;
  content: ReactNode;
  duration?: number;
  onClose?: () => void;
}
