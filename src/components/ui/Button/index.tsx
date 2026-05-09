import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { ButtonProps } from './types';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        main: '',
        secondary: 'border',
        text: 'bg-transparent',
        facial: '',
        virtual: 'border',
      },
      buttonType: {
        default: '',
        danger: '',
      },
      size: {
        small: 'h-[28px] px-[12px] text-[12px]',
        medium: 'h-[32px] px-[16px] text-[13px]',
        large: 'h-[40px] px-[20px] text-[14px]',
      },
    },
    compoundVariants: [
      {
        variant: 'main',
        buttonType: 'default',
        className: 'bg-[var(--填充-fill/组件绑定/按钮-button/主按钮-main/默认)] text-[var(--文字&图标-text&icon/无组件绑定/反强调-primary-reverse)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/主按钮-main/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/主按钮-main/点击)] disabled:bg-[var(--填充-fill/组件绑定/按钮-button/主按钮-main/禁用)]',
      },
      {
        variant: 'main',
        buttonType: 'danger',
        className: 'bg-[var(--填充-fill/组件绑定/按钮-button/危险_主按钮-main/默认)] text-[var(--文字&图标-text&icon/无组件绑定/反强调-primary-reverse)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/危险_主按钮-main/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/危险_主按钮-main/激活)] disabled:bg-[var(--填充-fill/组件绑定/按钮-button/危险_主按钮-main/禁用)]',
      },
      {
        variant: 'secondary',
        buttonType: 'default',
        className: 'border-[var(--边框-border/组件绑定/按钮-button/辅助按钮-secondary/常规)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/辅助按钮-secondary/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/辅助按钮-secondary/激活)] disabled:border-[var(--边框-border/组件绑定/按钮-button/辅助按钮-secondary/禁用)]',
      },
      {
        variant: 'secondary',
        buttonType: 'danger',
        className: 'border-[var(--边框-border/组件绑定/按钮-button/危险_辅助按钮-secondary/默认)] text-[var(--危险色danger/global-light/50)] hover:border-[var(--边框-border/组件绑定/按钮-button/危险_辅助按钮-secondary/悬停)] active:border-[var(--边框-border/组件绑定/按钮-button/危险_辅助按钮-secondary/激活)] disabled:border-[var(--边框-border/组件绑定/按钮-button/危险_辅助按钮-secondary/禁用)]',
      },
      {
        variant: 'text',
        buttonType: 'default',
        className: 'text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/文字&图形按钮-text/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/文字&图形按钮-text/激活)]',
      },
      {
        variant: 'text',
        buttonType: 'danger',
        className: 'text-[var(--危险色danger/global-light/50)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/危险_文字按钮-text/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/危险_文字按钮-text/激活)]',
      },
      {
        variant: 'facial',
        buttonType: 'default',
        className: 'bg-[var(--填充-fill/组件绑定/按钮-button/面性按钮-facial/默认)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/面性按钮-facial/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/面性按钮-facial/激活)] disabled:bg-[var(--填充-fill/组件绑定/按钮-button/面性按钮-facial/禁用)]',
      },
      {
        variant: 'facial',
        buttonType: 'danger',
        className: 'bg-[var(--填充-fill/组件绑定/按钮-button/危险_面性按钮-facial/默认)] text-[var(--危险色danger/global-light/50)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/危险_面性按钮-facial/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/危险_面性按钮-facial/激活)] disabled:bg-[var(--填充-fill/组件绑定/按钮-button/危险_面性按钮-facial/禁用)]',
      },
      {
        variant: 'virtual',
        buttonType: 'default',
        className: 'bg-[var(--填充-fill/组件绑定/按钮-button/虚框按钮-virtual/默认)] border-[var(--边框-border/组件绑定/按钮-button/虚框按钮-virtual/常规)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/虚框按钮-virtual/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/虚框按钮-virtual/激活)] disabled:bg-[var(--填充-fill/组件绑定/按钮-button/虚框按钮-virtual/禁用)] disabled:border-[var(--边框-border/组件绑定/按钮-button/虚框按钮-virtual/禁用)]',
      },
      {
        variant: 'virtual',
        buttonType: 'danger',
        className: 'bg-[var(--填充-fill/组件绑定/按钮-button/危险_虚框按钮-virtual/默认)] border-[var(--边框-border/组件绑定/按钮-button/危险_虚框按钮-virtual/默认)] text-[var(--危险色danger/global-light/50)] hover:bg-[var(--填充-fill/组件绑定/按钮-button/危险_虚框按钮-virtual/悬停)] hover:border-[var(--边框-border/组件绑定/按钮-button/危险_虚框按钮-virtual/悬停)] active:bg-[var(--填充-fill/组件绑定/按钮-button/危险_虚框按钮-virtual/激活)] active:border-[var(--边框-border/组件绑定/按钮-button/危险_虚框按钮-virtual/激活)] disabled:bg-[var(--填充-fill/组件绑定/按钮-button/危险_虚框按钮-virtual/禁用)] disabled:border-[var(--边框-border/组件绑定/按钮-button/危险_虚框按钮-virtual/禁用)]',
      },
    ],
    defaultVariants: {
      variant: 'main',
      buttonType: 'default',
      size: 'medium',
    },
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'main',
      buttonType = 'default',
      size = 'medium',
      loading = false,
      disabled = false,
      children,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, buttonType, size, className }))}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps };
