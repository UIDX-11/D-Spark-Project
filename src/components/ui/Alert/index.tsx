import React, { forwardRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { AlertProps } from './types';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      type = 'info',
      title,
      message,
      closable = false,
      onClose,
      icon,
      showIcon = true,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    const typeStyles = {
      success: {
        bg: 'bg-[var(--填充-fill/无组件绑定/成功背景-success)]',
        border: 'border-[var(--成功色success/global-light/50)]',
        text: 'text-[var(--成功色success/global-light/50)]',
        icon: <CheckCircle className="w-4 h-4" />,
      },
      warning: {
        bg: 'bg-[var(--填充-fill/无组件绑定/告警背景-warning)]',
        border: 'border-[var(--告警色warning/global-light/50)]',
        text: 'text-[var(--告警色warning/global-light/50)]',
        icon: <AlertTriangle className="w-4 h-4" />,
      },
      error: {
        bg: 'bg-[var(--填充-fill/无组件绑定/危险背景error)]',
        border: 'border-[var(--危险色danger/global-light/50)]',
        text: 'text-[var(--危险色danger/global-light/50)]',
        icon: <XCircle className="w-4 h-4" />,
      },
      info: {
        bg: 'bg-[var(--填充-fill/无组件绑定/接入背景-info)]',
        border: 'border-[var(--接入中&提示commissioning&prompt/global-light/50)]',
        text: 'text-[var(--接入中&提示commissioning&prompt/global-light/50)]',
        icon: <Info className="w-4 h-4" />,
      },
    };

    const currentStyle = typeStyles[type];

    if (!visible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'px-4 py-3 rounded border-l-4 flex gap-3',
          currentStyle.bg,
          currentStyle.border,
          className
        )}
        {...props}
      >
        {showIcon && (
          <div className={cn('flex-shrink-0 mt-0.5', currentStyle.text)}>
            {icon || currentStyle.icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <div className={cn('font-medium mb-1 text-[14px]', currentStyle.text)}>
              {title}
            </div>
          )}
          <div className="text-[13px] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
            {message}
          </div>
        </div>
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className="flex-shrink-0 text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] hover:text-[var(--文字&图标-text&icon/无组件绑定/次要-secondary)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
export type { AlertProps };
