import { cn } from '../../../utils/cn';
import type { DividerProps } from './types';

export default function Divider({ className, ...props }: DividerProps) {
  return <hr className={cn('m-0 border-0 border-t border-[var(--边框-border/无组件绑定/描边_常规)]', className)} {...props} />;
}
