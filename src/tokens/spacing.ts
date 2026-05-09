/**
 * Spacing Tokens
 *
 * Based on 4px grid system
 * Use these tokens for consistent spacing throughout the application
 */

export const spacing = {
  0: '0px',
  xs: '4px',      // 0.25rem
  sm: '8px',      // 0.5rem
  md: '16px',     // 1rem
  lg: '24px',     // 1.5rem
  xl: '32px',     // 2rem
  '2xl': '48px',  // 3rem
  '3xl': '64px',  // 4rem
  '4xl': '80px',  // 5rem
  '5xl': '96px',  // 6rem
} as const;

/**
 * Padding utilities
 */
export const padding = {
  none: spacing[0],
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
  '2xl': spacing['2xl'],
  '3xl': spacing['3xl'],
} as const;

/**
 * Margin utilities
 */
export const margin = {
  none: spacing[0],
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
  '2xl': spacing['2xl'],
  '3xl': spacing['3xl'],
} as const;

/**
 * Gap utilities for flex and grid
 */
export const gap = {
  none: spacing[0],
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
  '2xl': spacing['2xl'],
} as const;

export type SpacingScale = keyof typeof spacing;
