import React, { forwardRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { TabsProps } from './types';

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      items,
      activeKey: controlledActiveKey,
      defaultActiveKey,
      variant = 'line',
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalActiveKey, setInternalActiveKey] = useState(
      defaultActiveKey || items[0]?.key
    );
    const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;

    const handleTabClick = (key: string, disabled?: boolean) => {
      if (disabled) return;
      if (controlledActiveKey === undefined) {
        setInternalActiveKey(key);
      }
      onChange?.(key);
    };

    const activeItem = items.find(item => item.key === activeKey);

    const variantStyles = {
      line: {
        container: 'border-b border-[var(--边框-border/无组件绑定/描边_常规)]',
        tab: 'px-4 py-2 border-b-2 border-transparent',
        activeTab: 'border-b-2 border-[var(--主色-primary/global-light/50-22)] text-[var(--主色-primary/global-light/50-22)]',
        inactiveTab: 'text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] hover:text-[var(--文字&图标-text&icon/无组件绑定/次要-secondary)]',
      },
      card: {
        container: 'border-b border-[var(--边框-border/无组件绑定/描边_常规)]',
        tab: 'px-4 py-2 border border-b-0 rounded-t',
        activeTab: 'bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)] border-[var(--边框-border/无组件绑定/描边_常规)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]',
        inactiveTab: 'bg-[var(--中性色-neutral/global-light/30-f7)] border-transparent text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] hover:text-[var(--文字&图标-text&icon/无组件绑定/次要-secondary)]',
      },
      capsule: {
        container: 'bg-[var(--中性色-neutral/global-light/30-f7)] p-1 rounded inline-flex',
        tab: 'px-4 py-1.5 rounded',
        activeTab: 'bg-[var(--填充-fill/组件绑定/tabs-标签页/胶囊选项卡/选中)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]',
        inactiveTab: 'text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)] hover:bg-[var(--填充-fill/组件绑定/tabs-标签页/胶囊选项卡/悬停)]',
      },
    };

    const styles = variantStyles[variant];

    return (
      <div ref={ref} className={cn('', className)} {...props}>
        <div className={cn('flex gap-1', styles.container)}>
          {items.map(item => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleTabClick(item.key, item.disabled)}
              disabled={item.disabled}
              className={cn(
                'text-[14px] transition-colors cursor-pointer',
                styles.tab,
                item.key === activeKey ? styles.activeTab : styles.inactiveTab,
                item.disabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="py-4">
          {activeItem?.children}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;
export type { TabsProps, TabItem };
