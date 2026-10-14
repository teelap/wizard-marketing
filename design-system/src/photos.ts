/* Jake's photos from the October 2026 shoot (Nichole Gibbons), served from jakethewizard.com. These are the
   ONLY photos of Jake to use: never draw, generate or cartoon his likeness. Rotate through the scenes; don't
   lean on the same few. `position` is the object-position to crop with (the shoot crops are already 4:5). */

const BASE = 'https://www.jakethewizard.com/dev_assets/photos/jake-rainbow-wall-';
const SHOOT = 'https://www.jakethewizard.com/dev_assets/photos/jake-tlapek-';

/** The scene a photo was taken in. */
export type Scene = 'rainbow-wall' | 'cloak' | 'arcade' | 'graffiti' | 'eye-mural' | 'butterfly' | 'book-mural' | 'blazer' | 'patio' | 'street' | 'white-wall';

export interface JakePhoto {
  /** Where it was shot. cloak = the green wizard cloak (brand and wizard-voice posts); book-mural = holding Eight Dominoes. */
  scene: Scene;
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
  ({ scene: 'rainbow-wall', src: `${BASE}${id}-800.webp`, srcLarge: `${BASE}${id}-1600.webp`, alt, orientation, position });
/* The rest of the shoot: 1080x1350 face-centred crops, ready for 4:5 TV frames. */
const shot = (scene: Scene, file: string, id: number, alt: string): JakePhoto => {
  const src = `${SHOOT}${file}-${id}-portrait.webp`;
  return { scene, src, srcLarge: src, alt, orientation: 'portrait', position: '50% 40%' };
};

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
  wizardReach: shot('cloak', 'cloak-butterfly', 5907, 'Jake Tlapek in a green wizard cloak and aviators at a butterfly mural, reaching toward the camera'),
  wizardCloak: shot('cloak', 'cloak-butterfly', 5902, 'Jake Tlapek in a full green wizard cloak in front of a monarch butterfly mural'),
  cloakGrin: shot('cloak', 'cloak-alley', 5949, 'Jake Tlapek in a hooded green cloak and gold aviators, grinning'),
  cloakSeated: shot('cloak', 'cloak-alley', 5926, 'Jake Tlapek seated in a green wizard cloak beside a stack of kegs'),
  cloakStein: shot('cloak', 'patio', 5996, 'Jake Tlapek laughing in a green wizard cloak, holding a beer stein'),
  cloakPinball: shot('cloak', 'arcade', 5641, 'Jake Tlapek in a green wizard cloak, leaning over a pinball machine'),
  arcadeLean: shot('arcade', 'arcade', 5605, 'Jake Tlapek smiling in a grey tee among pinball machines'),
  arcadeLaugh: shot('arcade', 'arcade', 5631, 'Jake Tlapek laughing in front of a row of pinball machines'),
  graffitiSmile: shot('graffiti', 'graffiti', 5571, 'Jake Tlapek with a big smile in front of a colourful graffiti wall'),
  graffitiGrin: shot('graffiti', 'graffiti', 5580, 'Jake Tlapek smiling in front of a pink and blue graffiti wall'),
  graffitiReach: shot('graffiti', 'graffiti', 5594, 'Jake Tlapek reaching toward the camera with a playful grin in front of graffiti'),
  eyeMural: shot('eye-mural', 'eye-mural', 5502, 'Jake Tlapek under a blue sky in front of a giant eye mural'),
  butterflyWelcome: shot('butterfly', 'butterfly', 5879, 'Jake Tlapek with his arms open wide in a light blazer at a monarch butterfly mural'),
  butterflySmile: shot('butterfly', 'butterfly', 5873, 'Jake Tlapek smiling in a light blazer at a butterfly mural'),
  bookHeldUp: shot('book-mural', 'book-mural', 5720, 'Jake Tlapek holding up his book Eight Dominoes in front of a striped mural'),
  bookLaugh: shot('book-mural', 'book-mural', 5743, 'Jake Tlapek lying on a painted flower floor, laughing with his book Eight Dominoes'),
  bookReading: shot('book-mural', 'book-mural', 5706, 'Jake Tlapek sitting on a painted flower floor reading Eight Dominoes under a striped wall'),
  headshot: shot('blazer', 'blazer', 5769, 'Jake Tlapek smiling to camera in a light blazer and glasses'),
  armsCrossed: shot('blazer', 'blazer', 5781, 'Jake Tlapek laughing with his arms crossed in a light blazer'),
  breezeBlock: shot('blazer', 'blazer', 5800, 'Jake Tlapek smiling in a light blazer in front of a breeze-block wall'),
  thinking: shot('blazer', 'blazer', 5818, 'Jake Tlapek in a light blazer with his hand on his chin, thinking'),
  patioReading: shot('patio', 'patio', 5965, 'Jake Tlapek reading a book on a patio, hand at his chin'),
  streetWalk: shot('street', 'street', 5961, 'Jake Tlapek walking down a street with a leather bag'),
  whiteWall: shot('white-wall', 'white-wall', 5426, 'Jake Tlapek in a floral shirt leaning on a white brick wall'),
} as const;

export type PhotoName = keyof typeof PHOTOS;
