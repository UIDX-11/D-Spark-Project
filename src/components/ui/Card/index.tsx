import { cn } from '../../../utils/cn';
import type { CardBodyProps, CardFooterProps, CardHeaderProps, CardProps } from './types';

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[length:var(--ds-radius-surface)] border border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)]',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ title, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'border-b border-[var(--边框-border/无组件绑定/描边_常规)] px-[length:var(--ds-space-5)] py-[length:var(--ds-space-4)]',
        className
      )}
      {...props}
    >
      {title ? (
        <h3 className="text-[length:var(--ds-font-title)] font-semibold text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
          {title}
        </h3>
      ) : null}
    </div>
  );
}

export function CardBody({ className, ...props }: CardBodyProps) {
  return <div className={cn('px-[length:var(--ds-space-5)] py-[length:var(--ds-space-5)]', className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'border-t border-[var(--边框-border/无组件绑定/描边_常规)] px-[length:var(--ds-space-5)] py-[length:var(--ds-space-4)]',
        className
      )}
      {...props}
    />
  );
}

export default Card;
