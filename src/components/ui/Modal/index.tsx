import React, { forwardRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { ModalProps } from './types';
import { X } from 'lucide-react';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open,
      onClose,
      title,
      footer,
      width = 520,
      centered = true,
      maskClosable = true,
      children,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    if (!open) return null;

    const handleMaskClick = (e: React.MouseEvent) => {
      if (maskClosable && e.target === e.currentTarget) {
        onClose?.();
      }
    };

    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex',
          centered ? 'items-center justify-center' : 'items-start justify-center pt-20'
        )}
        onClick={handleMaskClick}
      >
        <div className="absolute inset-0 bg-[var(--蒙层-mask/10)]" />

        <div
          ref={ref}
          className={cn(
            'relative bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)]',
            'rounded-lg shadow-xl max-h-[90vh] flex flex-col',
            className
          )}
          style={{ width: typeof width === 'number' ? `${width}px` : width }}
          {...props}
        >
          {title && (
            <div className="px-6 py-4 border-b border-[var(--边框-border/无组件绑定/描边_常规)] flex items-center justify-between">
              <h3 className="text-[16px] font-medium text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] hover:text-[var(--文字&图标-text&icon/无组件绑定/次要-secondary)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="px-6 py-4 flex-1 overflow-y-auto">
            {children}
          </div>

          {footer && (
            <div className="px-6 py-4 border-t border-[var(--边框-border/无组件绑定/描边_常规)] flex justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
export type { ModalProps };
