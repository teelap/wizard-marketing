/* Jake's rainbow-wall photo set, served from jakethewizard.com. These are the ONLY photos of Jake to use:
   never draw, generate or cartoon his likeness. `position` is the object-position the site crops each with. */

const BASE = 'https://www.jakethewizard.com/dev_assets/photos/jake-rainbow-wall-';

export interface JakePhoto {
  /** 800px-wide-ish WebP. */
  src: string;
  /** Double-resolution WebP for big frames. */
  srcLarge: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
  /** Crop focus to pass to TVFrame. */
  position: string;
}

const photo = (id: number, orientation: JakePhoto['orientation'], position: string, alt: string): JakePhoto =>
  ({ src: `${BASE}${id}-800.webp`, srcLarge: `${BASE}${id}-1600.webp`, alt, orientation, position });

/** Jake's approved photos, keyed by pose. */
export const PHOTOS = {
  castingSpell: photo(5686, 'landscape', '66% 40%', 'Jake Tlapek in front of a rainbow-striped mural, hands raised like he’s casting a spell'),
  armsWide: photo(5690, 'landscape', '46% 50%', 'Jake Tlapek in sunglasses with his arms spread wide in welcome, in front of a rainbow-striped brick mural'),
  pointing: photo(5681, 'landscape', '47% 50%', 'Jake Tlapek in sunglasses pointing both hands at the camera in front of a rainbow-striped brick mural'),
  handsOnHips: photo(5678, 'landscape', '55% 40%', 'Jake Tlapek standing hands on hips in sunglasses in front of a rainbow-striped brick mural'),
  relaxed: photo(5675, 'landscape', '37% 40%', 'Jake Tlapek in sunglasses, standing relaxed in front of a rainbow-striped brick mural'),
  leaningIn: photo(5684, 'landscape', '50% 50%', 'Jake Tlapek leaning in toward the camera in front of a rainbow mural'),
  headTilt: photo(5695, 'portrait', '50% 30%', 'Jake Tlapek, head tilted, sunglasses on, leaning on a rainbow mural'),
  endOfWall: photo(5661, 'portrait', '50% 78%', 'Jake Tlapek in sunglasses, standing alone at the end of a long rainbow-striped wall'),
  walkingStripes: photo(5663, 'portrait', '50% 100%', 'Jake Tlapek in sunglasses walking past a rainbow-striped brick wall'),
  walkingArcs: photo(5671, 'portrait', '50% 100%', 'Jake Tlapek in sunglasses walking past rainbow arcs painted on a brick wall'),
  adjustingGlasses: photo(5668, 'portrait', '50% 90%', 'Jake Tlapek adjusting his sunglasses as he walks past rainbow arcs painted on a brick wall'),
  strolling: photo(5672, 'portrait', '50% 90%', 'Jake Tlapek strolling past rainbow arcs painted on a brick wall, smiling'),
} as const;

export type PhotoName = keyof typeof PHOTOS;
