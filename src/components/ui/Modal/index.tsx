import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../utils/cn';
import type { ModalProps } from './types';

export default function Modal({ open, onClose, title, footer, children, className, ...props }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-[length:var(--ds-space-5)]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'flex max-h-[var(--ds-modal-max-h)] w-full max-w-lg flex-col overflow-hidden rounded-[length:var(--ds-radius-surface)] border border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--card)] shadow-[var(--ds-shadow-overlay)]',
          className
        )}
        {...props}
      >
        <div className="border-b border-[var(--边框-border/无组件绑定/描边_常规)] px-[length:var(--ds-space-5)] py-[length:var(--ds-space-4)]">
          <h2 className="text-[length:var(--ds-font-title)] font-semibold text-[var(--foreground)]">{title}</h2>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-[length:var(--ds-space-5)] py-[length:var(--ds-space-4)]">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-[length:var(--ds-space-3)] border-t border-[var(--边框-border/无组件绑定/描边_常规)] px-[length:var(--ds-space-5)] py-[length:var(--ds-space-4)]">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
