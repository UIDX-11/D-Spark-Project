/**
 * Shadow Tokens
 */

export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px rgba(0, 0, 0, 0.08)',
  md: '0 2px 8px rgba(0, 0, 0, 0.08)',
  lg: '0 4px 16px rgba(0, 0, 0, 0.10)',
  xl: '0 8px 24px rgba(0, 0, 0, 0.12)',
  '2xl': '0 16px 48px rgba(0, 0, 0, 0.15)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
} as const;

export type ShadowScale = keyof typeof shadows;
