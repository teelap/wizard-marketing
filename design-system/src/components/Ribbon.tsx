import type { ReactNode } from 'react';

export interface RibbonProps {
  /** A short command in the display face: "Summon the wizard." Keeps to one line. */
  children: ReactNode;
  /** Heading level for the text inside. */
  as?: 'h2' | 'h3' | 'p';
}

/**
 * Red banner ribbon with notched tails, for the one call to action a section is built around.
 */
export function Ribbon({ children, as: Tag = 'h2' }: RibbonProps) {
  return <div className="ribbon"><Tag className="disp">{children}</Tag></div>;
}
