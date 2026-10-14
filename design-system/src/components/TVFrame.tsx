import type { ReactNode } from 'react';
import { PHOTOS, type PhotoName } from '../photos';
import { cx } from '../util';

export interface TVFrameProps {
  /** One of Jake's approved photos by name (sets src, alt and crop). */
  photo?: PhotoName;
  /** Or any image URL. Never a drawn or generated likeness of Jake. */
  src?: string;
  alt?: string;
  /** CSS object-position for the crop. */
  position?: string;
  /** Tilt left (-2°), right (2°) or none. */
  tilt?: 'left' | 'right' | 'none';
  /** CSS aspect ratio of the screen. 4/5 is the site's portrait frame. */
  aspect?: string;
  /** Width (px or CSS length). */
  width?: number | string;
  /** A Starburst (or other sticker) to slap on the frame's corner. */
  sticker?: ReactNode;
}

/**
 * Photo in a fat-bezel 70s TV: thick ink border, round corners, hard shadow, slight tilt. Every photo of Jake goes in one.
 */
export function TVFrame({ photo, src, alt, position, tilt = 'right', aspect = '4/5', width = 420, sticker }: TVFrameProps) {
  const p = photo ? PHOTOS[photo] : undefined;
  const tv = (
    <div className={cx('tv', tilt === 'left' && 'tv--tilt-l', tilt === 'right' && 'tv--tilt-r')} style={{ aspectRatio: aspect }}>
      <img src={src ?? p?.src} alt={alt ?? p?.alt ?? ''} style={{ objectPosition: position ?? p?.position }} />
    </div>
  );
  return <div style={{ position: 'relative', width, maxWidth: '100%' }}>{sticker}{tv}</div>;
}
