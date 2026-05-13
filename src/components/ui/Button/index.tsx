import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', buttonType, disabled, size, type = 'button', ...props }, ref) => {
    const base =
      'inline-flex h-[length:calc(var(--component-button-layout-live-height-md)*1px)] items-center justify-center gap-[length:var(--ds-space-2)] rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-control-padding-x-md)] text-[length:var(--ds-font-body)] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] disabled:pointer-events-none disabled:opacity-50';

    const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
      main:
        'bg-[var(--component-button-primary-bg-default)] text-[var(--component-button-primary-text-default)] hover:bg-[var(--component-button-primary-bg-hover)] hover:text-[var(--component-button-primary-text-hover)] active:bg-[var(--component-button-primary-bg-active)] active:text-[var(--component-button-primary-text-active)] disabled:bg-[var(--component-button-primary-bg-disabled)] disabled:text-[var(--component-button-primary-text-disabled)] disabled:opacity-100',
      secondary: 'border border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--muted)]',
      text: 'border border-transparent bg-transparent text-[var(--accent)] hover:bg-[var(--muted)]',
      virtual: 'border border-[var(--边框-border/无组件绑定/描边_常规)] bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]',
    };

    const dangerExtra =
      buttonType === 'danger' && variant === 'main'
        ? '!bg-[var(--destructive)] !text-[var(--destructive-foreground)] hover:!opacity-90'
        : buttonType === 'danger' && variant === 'text'
          ? '!text-[var(--destructive)] hover:!bg-[var(--muted)]'
          : '';

    const sizeLg =
      size === 'large' &&
      'h-[length:calc(var(--component-button-layout-live-height-lg)*1px)] px-[length:calc(var(--component-button-layout-live-padding-xlarge)*1px)] text-[length:calc(var(--component-button-layout-live-font-size-lg)*1px)] leading-[length:calc(var(--component-button-layout-live-line-lg)*1px)]';

    const sizeSm =
      size === 'small' &&
      'h-[length:calc(var(--component-button-layout-live-height-sm)*1px)] px-[length:calc(var(--component-button-layout-live-padding-xsmall)*1px)] text-[length:calc(var(--component-button-layout-live-font-size-sm)*1px)] leading-[length:calc(var(--component-button-layout-live-line-sm)*1px)]';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(base, styles[variant], dangerExtra, sizeLg, sizeSm, className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
