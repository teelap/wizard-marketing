/**
 * The waking: the journal lies closed on a candlelit desk until the visitor
 * taps it. Then it rises off the desk into dark space while gold motes swirl
 * and the music swells, hovers for a breath, and opens itself to the contents.
 *
 * The tap is the point: browsers only allow sound after a user gesture, and a
 * ritual you start yourself lands better than one that starts without you.
 * Deep links, reduced motion and repeat visits in the same session skip it.
 */

import { Motes } from './motes';
import { MagicMusic } from './music';
import type { PaperSound } from './sound';
import type { Tome } from './tome';

const SEEN_KEY = 'tome-intro-seen';
const RISE_SECONDS = 2.8;
const HOVER_MS = 450;
const OPEN_MS = 1500;

export function shouldPlayIntro(hashTarget: string | null, reducedMotion: boolean): boolean {
    if (reducedMotion || hashTarget) return false;
    try {
        return window.sessionStorage.getItem(SEEN_KEY) !== '1';
    } catch {
        return true;
    }
}

function markSeen(): void {
    try {
        window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
        // Storage can be blocked; the intro simply offers itself again next time.
    }
}

const wait = (ms: number): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, ms));

interface IntroParts {
    readonly stage: HTMLElement;
    readonly book: HTMLElement;
    readonly wake: HTMLButtonElement;
    readonly skip: HTMLButtonElement;
    readonly shadow: HTMLElement;
    readonly motes: Motes;
}

export class Intro {
    private readonly parts: IntroParts;
    private readonly tome: Tome;
    private readonly sound: PaperSound;
    private readonly music = new MagicMusic();
    private state: 'resting' | 'waking' | 'done' = 'resting';
    private visibility: IntersectionObserver | null = null;

    private constructor(parts: IntroParts, tome: Tome, sound: PaperSound) {
        this.parts = parts;
        this.tome = tome;
        this.sound = sound;
    }

    static create(tome: Tome, sound: PaperSound): Intro | null {
        const stage = document.querySelector<HTMLElement>('[data-tome-stage]');
        const book = document.querySelector<HTMLElement>('[data-tome]');
        const wake = document.querySelector<HTMLButtonElement>('[data-tome-wake]');
        const skip = document.querySelector<HTMLButtonElement>('[data-tome-skip]');
        const shadow = document.querySelector<HTMLElement>('[data-tome-shadow]');
        const back = document.querySelector<HTMLCanvasElement>('[data-motes="back"]');
        const front = document.querySelector<HTMLCanvasElement>('[data-motes="front"]');
        if (!stage || !book || !wake || !skip || !shadow || !back || !front) return null;
        const motes = new Motes(stage, back, front, book);
        return new Intro({ stage, book, wake, skip, shadow, motes }, tome, sound);
    }

    /** Lay the journal on the desk and wait for the tap. */
    arm(): void {
        const { stage, wake, skip, motes } = this.parts;
        stage.classList.add('is-intro', 'intro-rest');
        wake.hidden = false;
        skip.hidden = false;
        this.placeShadow();
        motes.ambient();

        wake.addEventListener('click', () => void this.run());
        // The journal itself is also a (pointer) target while it rests on the desk.
        this.parts.book.addEventListener('click', () => {
            if (this.state === 'resting') void this.run();
        });
        skip.addEventListener('click', () => this.finish(true));

        // No point animating motes nobody can see.
        this.visibility = new IntersectionObserver(([entry]) => {
            if (this.state !== 'resting') return;
            if (entry.isIntersecting) motes.ambient();
            else motes.stop();
        });
        this.visibility.observe(stage);
    }

    private placeShadow(): void {
        const { stage, book, shadow } = this.parts;
        const s = stage.getBoundingClientRect();
        const b = book.getBoundingClientRect();
        shadow.style.left = `${b.left + b.width / 2 - s.left}px`;
        shadow.style.top = `${b.top + b.height / 2 - s.top}px`;
        shadow.style.width = `${b.width * 1.05}px`;
        shadow.style.height = `${b.height * 0.9}px`;
    }

    private async run(): Promise<void> {
        if (this.state !== 'resting') return;
        this.state = 'waking';
        const { stage, wake, motes } = this.parts;
        const byKeyboard = document.activeElement === wake;
        wake.hidden = true;

        if (this.sound.enabled) this.music.swell(RISE_SECONDS);
        motes.vortex();
        stage.classList.remove('intro-rest');
        stage.classList.add('intro-rising');

        await wait(RISE_SECONDS * 1000);
        if (this.state !== 'waking') return;
        stage.classList.add('intro-hover');
        await wait(HOVER_MS);
        if (this.state !== 'waking') return;

        if (this.sound.enabled) this.music.chime();
        motes.burst();
        await this.tome.flip(1, OPEN_MS, 0.8);
        if (this.state !== 'waking') return;
        this.finish(false);
        if (byKeyboard) document.getElementById('contents-title')?.focus({ preventScroll: true });
    }

    /** Settle into the normal book. `skipped` jumps straight to the opened journal. */
    finish(skipped: boolean): void {
        if (this.state === 'done') return;
        this.state = 'done';
        markSeen();
        this.visibility?.disconnect();
        const { stage, wake, skip, motes } = this.parts;
        if (skipped) {
            this.music.fadeOut();
            motes.stop();
        } else {
            motes.fade();
        }
        wake.hidden = true;
        skip.hidden = true;
        stage.classList.remove('intro-rest', 'intro-rising', 'intro-hover');
        stage.classList.add('intro-settling');
        window.setTimeout(() => stage.classList.remove('is-intro', 'intro-settling'), 900);
        // Skipping still lands on the opened journal, never past its first page.
        if (skipped && this.tome.atFrontCover) void this.tome.flip(1, 0);
    }
}
