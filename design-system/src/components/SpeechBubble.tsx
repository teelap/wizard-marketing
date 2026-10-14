import type { ReactNode } from 'react';

export interface SpeechBubbleProps {
  /** One short line in Jake's voice, in quotes: “The hardest system to debug is people.” */
  children: ReactNode;
  /** Width (px or CSS length). */
  width?: number | string;
}

/**
 * Speech-bubble card with a tail at the top left, for a one-line quote from Jake beside or under his photo.
 */
export function SpeechBubble({ children, width = 330 }: SpeechBubbleProps) {
  return <p className="bubble card" style={{ width, maxWidth: '100%', marginTop: 44 }}>{children}</p>;
}
