import consulting from '../assets/icon-consulting.webp';
import mastermind from '../assets/icon-mastermind.webp';
import dominoes from '../assets/icon-dominoes.webp';
import podcast from '../assets/icon-podcast.webp';
import tools from '../assets/icon-tools.webp';
import contact from '../assets/icon-contact.webp';

const ICONS = { consulting, mastermind, dominoes, podcast, tools, contact } as const;

/** The illustrated icon set. */
export type IconName = keyof typeof ICONS;

export interface IconProps {
  /** consulting = magnifying glass, mastermind = speech bubbles, dominoes = falling dominoes, podcast = microphone, tools = toolbox, contact = envelope. */
  name: IconName;
  /** Size in px (square box; the art keeps its proportions). */
  size?: number;
  /** Leave empty when the icon sits beside a text label. */
  alt?: string;
  className?: string;
}

/**
 * One of the six illustrated 70s icons (ink outlines, flat brand colours). Use them for offers and destinations, never as decoration in running text.
 */
export function Icon({ name, size = 88, alt = '', className }: IconProps) {
  return <img className={className} src={ICONS[name]} width={size} height={size} alt={alt} style={{ width: size, height: size, objectFit: 'contain' }} />;
}
