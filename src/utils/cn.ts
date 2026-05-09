/**
 * Class name utility for merging Tailwind classes
 *
 * Combines multiple class names and removes duplicates
 * Useful for component composition with className overrides
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
