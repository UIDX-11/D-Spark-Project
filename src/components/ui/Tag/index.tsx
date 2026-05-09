import React, { forwardRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { TagProps } from './types';
import { X } from 'lucide-react';

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant = 'default',
      closable = false,
      onClose,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setVisible(false);
      onClose?.();
    };

    const variantStyles = {
      default: {
        bg: 'bg-[var(--中性色-neutral/global-light/30-f7)]',
        text: 'text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]',
        border: 'border-[var(--边框-border/无组件绑定/描边_常规)]',
      },
      success: {
        bg: 'bg-[var(--成功色success/global-light/10)]',
        text: 'text-[var(--成功色success/global-light/50)]',
        border: 'border-[var(--成功色success/global-light/30)]',
      },
      warning: {
        bg: 'bg-[var(--告警色warning/global-light/10)]',
        text: 'text-[var(--告警色warning/global-light/50)]',
        border: 'border-[var(--告警色warning/global-light/30)]',
      },
      danger: {
        bg: 'bg-[var(--危险色danger/global-light/10)]',
        text: 'text-[var(--危险色danger/global-light/50)]',
        border: 'border-[var(--危险色danger/global-light/30)]',
      },
      info: {
        bg: 'bg-[var(--接入中&提示commissioning&prompt/global-light/10)]',
        text: 'text-[var(--接入中&提示commissioning&prompt/global-light/50)]',
        border: 'border-[var(--接入中&提示commissioning&prompt/global-light/30)]',
      },
    };

    const currentStyle = variantStyles[variant];

    if (!visible) return null;

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 px-2 h-6 rounded border text-[12px]',
          currentStyle.bg,
          currentStyle.text,
          currentStyle.border,
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className="flex-shrink-0 hover:opacity-70 cursor-pointer ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
export type { TagProps };
