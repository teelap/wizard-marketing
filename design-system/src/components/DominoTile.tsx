import type { ReactNode } from 'react';
import { cssVar, type Hue } from '../art';
import type { Style } from '../util';

export interface DominoTileProps {
  /** The number on the tile, zero-padded: "01". */
  n: string;
  /** Top-half colour. */
  color?: Hue;
  /** Short name of the idea. */
  title: string;
  /** One line explaining it. */
  children: ReactNode;
}

/**
 * Domino tile: a coloured top with a big outlined number, a pip, then a title and one line. Tiles tilt alternately, like dominoes about to fall.
 */
export function DominoTile({ n, color = 'red', title, children }: DominoTileProps) {
  return (
    <div className="tile" style={{ '--c': cssVar(color) } as Style}>
      <div className="tile-top"><b className="pop">{n}</b></div>
      <div className="tile-body"><h3>{title}</h3><p>{children}</p></div>
    </div>
  );
}

export interface DominoTilesProps {
  /** Four per row on desktop, two on tablets, one on phones. */
  items: DominoTileProps[];
}

/**
 * A grid of domino tiles for a numbered set of ideas (the Eight Dominoes, steps of a method).
 */
export function DominoTiles({ items }: DominoTilesProps) {
  return (
    <ol className="tiles">
      {items.map(t => (
        <li key={t.n} className="tile" style={{ '--c': cssVar(t.color ?? 'red') } as Style}>
          <div className="tile-top"><b className="pop">{t.n}</b></div>
          <div className="tile-body"><h3>{t.title}</h3><p>{t.children}</p></div>
        </li>
      ))}
    </ol>
  );
}
