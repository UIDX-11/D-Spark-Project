import { toast } from 'sonner';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import React from 'react';
import { MessageConfig } from './types';

const icons = {
  success: <CheckCircle className="w-4 h-4 text-[var(--成功色success/global-light/50)]" />,
  warning: <AlertTriangle className="w-4 h-4 text-[var(--告警色warning/global-light/50)]" />,
  error: <XCircle className="w-4 h-4 text-[var(--危险色danger/global-light/50)]" />,
  info: <Info className="w-4 h-4 text-[var(--接入中&提示commissioning&prompt/global-light/50)]" />,
};

export const message = {
  success: (content: string, duration?: number) => {
    return toast(content, {
      icon: icons.success,
      duration: duration || 3000,
    });
  },
  warning: (content: string, duration?: number) => {
    return toast(content, {
      icon: icons.warning,
      duration: duration || 3000,
    });
  },
  error: (content: string, duration?: number) => {
    return toast(content, {
      icon: icons.error,
      duration: duration || 3000,
    });
  },
  info: (content: string, duration?: number) => {
    return toast(content, {
      icon: icons.info,
      duration: duration || 3000,
    });
  },
};

export default message;
export type { MessageConfig };
