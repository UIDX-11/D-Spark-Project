import { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'outlined' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Padding size
   * @default 'md'
   */
  padding?: CardPadding;

  /**
   * Whether card should have hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Whether card is clickable (shows pointer cursor)
   * @default false
   */
  clickable?: boolean;

  /**
   * Header content
   */
  header?: ReactNode;

  /**
   * Footer content
   */
  footer?: ReactNode;

  /**
   * Main content
   */
  children?: ReactNode;
}
