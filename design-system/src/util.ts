import type { CSSProperties } from 'react';

/** Join class names, dropping empty ones. */
export const cx = (...names: Array<string | false | null | undefined>): string => names.filter(Boolean).join(' ');

/** Style object that also accepts CSS custom properties such as `--c`. */
export type Style = CSSProperties & Record<`--${string}`, string | number>;
