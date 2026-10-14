import type { ReactNode } from 'react';

export interface WavyProps {
  /** The words to underline. */
  children: ReactNode;
}

/**
 * Bold text with a red wavy underline, the kit's way to stress a phrase inside body copy.
 */
export function Wavy({ children }: WavyProps) {
  // The same squiggle as links in running text (the kit's .wavy sits 8px low, made for single short words).
  return <span className="wavy" style={{ textDecorationThickness: 2, textUnderlineOffset: 5 }}>{children}</span>;
}
