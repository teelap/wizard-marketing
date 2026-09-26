/**
 * The interactive tome: lays the pages out as a real book, turns them with a
 * paper fold you can drag, and keeps the reading order accessible.
 *
 * Two layouts share one engine:
 *   spread — two facing pages, the spine in the middle (wide screens)
 *   single — one page at a time, bound on its left edge (phones)
 *
 * Page order in the DOM is print order: page 0 is the front cover, then each
 * sheet contributes its front (even index, a right-hand page) and its back
 * (odd index, the next left-hand page).
 */

import {
    type Fold,
    type Leaf,
    type Vec,
    apply,
    computeFold,
    landingPoint,
    lerp,
    reflection,
    toClipPath,
    toCssMatrix,
    vec,
} from './geometry';
import { PaperSound } from './sound';

type Mode = 'spread' | 'single';
type Visibility = 'shown' | 'preload' | 'hidden';

interface Turn {
    readonly leaf: Leaf;
    readonly front: HTMLElement;
    readonly back: HTMLElement;
    readonly under: HTMLElement | null;
    readonly frontHome: Vec;
    readonly backHome: Vec;
    /** Index to settle on when the corner reaches the landing point / its resting spot. */
    readonly landIndex: number;
    readonly restIndex: number;
    /** Book shift (px) at rest and when landed, for opening and closing the covers. */
    readonly shiftAtRest: number;
    readonly shiftAtLand: number;
    pointer: Vec;
}

interface Grab {
    readonly pointerId: number;
    readonly start: Vec;
    readonly dir: 1 | -1;
    readonly cornerY: number;
    readonly startedAt: number;
    dragging: boolean;
    lastPoint: Vec;
    lastTime: number;
    velocityX: number;
}

const EASE = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const INTERACTIVE = 'a, button, input, select, textarea, label, [data-no-turn]';

export interface TomeOptions {
    readonly reducedMotion: boolean;
    readonly sound: PaperSound;
    readonly onSettle?: (label: string) => void;
}

export class Tome {
    private readonly root: HTMLElement;
    private readonly inner: HTMLElement;
    private readonly pagesEl: HTMLElement;
    private readonly pages: HTMLElement[];
    private readonly blank: HTMLElement;
    private readonly cast: HTMLElement;
    private readonly castBand: HTMLElement;
    private readonly board: HTMLElement;
    private readonly opts: TomeOptions;

    private mode: Mode = 'spread';
    private singleOrder: HTMLElement[] = [];
    private index = 0;
    private w = 0;
    private h = 0;
    private turn: Turn | null = null;
    private grab: Grab | null = null;
    private animating = false;
    private peeking = false;

    constructor(root: HTMLElement, opts: TomeOptions) {
        this.root = root;
        this.opts = opts;
        const inner = root.querySelector<HTMLElement>('[data-tome-inner]');
        const pagesEl = root.querySelector<HTMLElement>('[data-tome-pages]');
        if (!inner || !pagesEl) throw new Error('tome markup is missing its inner wrapper or page list');
        this.inner = inner;
        this.pagesEl = pagesEl;
        this.pages = Array.from(pagesEl.querySelectorAll<HTMLElement>(':scope > [data-page]'));

        this.blank = document.createElement('div');
        this.blank.className = 'tome-page tome-page--blank';
        this.blank.setAttribute('aria-hidden', 'true');
        this.pagesEl.append(this.blank);

        this.board = this.el('div', 'tome-board');
        this.cast = this.el('div', 'tome-cast');
        this.castBand = this.el('div', 'tome-band');
        this.cast.append(this.castBand);
        this.inner.prepend(this.board);
        this.inner.append(this.cast);

        for (const page of [...this.pages, this.blank]) {
            const fx = this.el('div', 'tome-fx');
            fx.append(this.el('div', 'tome-band'));
            page.append(fx);
        }
    }

    private el(tag: string, className: string): HTMLElement {
        const node = document.createElement(tag);
        node.className = className;
        node.setAttribute('aria-hidden', 'true');
        return node;
    }

    // ---------------------------------------------------------------- setup

    start(initialId: string | null): void {
        this.layout();
        const target = initialId ? this.indexForId(initialId) : null;
        if (target !== null) this.index = target;
        this.renderStatic();
        this.root.classList.add('is-live');

        this.inner.addEventListener('pointerdown', (e) => this.onPointerDown(e));
        this.inner.addEventListener('pointermove', (e) => this.onPointerMove(e));
        this.inner.addEventListener('pointerup', (e) => this.onPointerUp(e));
        this.inner.addEventListener('pointercancel', (e) => this.onPointerUp(e));
        this.inner.addEventListener('pointerleave', () => this.endPeek());

        new ResizeObserver(() => this.relayout()).observe(this.root);
    }

    private relayout(): void {
        const before = { w: this.w, mode: this.mode };
        this.layout();
        if (before.w === this.w && before.mode === this.mode) return;
        if (this.turn) this.finishTurnInstantly();
        this.renderStatic();
    }

    private layout(): void {
        const available = this.root.clientWidth;
        // Leave room above for the floating nav and below for the turn controls.
        const tall = Math.max(400, window.innerHeight - 245);
        const nextMode: Mode = available >= 720 ? 'spread' : 'single';
        if (nextMode !== this.mode) {
            // Keep the reader on the same page when the layout flips.
            const current = this.currentPages()[0] ?? this.pages[0];
            this.mode = nextMode;
            this.singleOrder = this.pages.filter((p) => !p.hasAttribute('data-spread-only'));
            this.index = this.indexForPage(current);
        }
        this.singleOrder = this.pages.filter((p) => !p.hasAttribute('data-spread-only'));

        const w =
            this.mode === 'spread'
                ? Math.min(available / 2 - 28, tall * 0.75, 520)
                : Math.min(available - 20, tall * 0.75, 480);
        this.w = Math.max(200, Math.floor(w));
        this.h = Math.round(this.w * (4 / 3));

        const bookWidth = this.mode === 'spread' ? 2 * this.w : this.w;
        this.root.style.setProperty('--page-w', `${this.w}px`);
        this.root.style.setProperty('--page-h', `${this.h}px`);
        this.inner.style.width = `${bookWidth}px`;
        this.inner.style.height = `${this.h}px`;
        this.root.dataset.mode = this.mode;

        this.pages.forEach((page, i) => {
            const left = this.mode === 'spread' ? (i % 2 === 1 ? 0 : this.w) : 0;
            page.style.left = `${left}px`;
        });
        this.blank.style.left = `${-this.w}px`;
    }

    // ------------------------------------------------------------- indexing

    private get lastIndex(): number {
        return this.mode === 'spread' ? Math.floor(this.pages.length / 2) : this.singleOrder.length - 1;
    }

    private currentPages(): HTMLElement[] {
        if (this.mode === 'single') return [this.singleOrder[this.index]].filter(Boolean);
        return [this.pages[2 * this.index - 1], this.pages[2 * this.index]].filter(Boolean);
    }

    private indexForPage(page: HTMLElement): number {
        if (this.mode === 'single') {
            const i = this.singleOrder.indexOf(page);
            return i >= 0 ? i : Math.max(0, this.singleOrder.indexOf(this.nearestSinglePage(page)));
        }
        const i = this.pages.indexOf(page);
        return Math.floor((i + 1) / 2);
    }

    private nearestSinglePage(page: HTMLElement): HTMLElement {
        let i = this.pages.indexOf(page);
        while (i < this.pages.length && this.pages[i].hasAttribute('data-spread-only')) i += 1;
        return this.pages[Math.min(i, this.pages.length - 1)];
    }

    private indexForId(id: string): number | null {
        const page = this.pages.find((p) => p.id === id);
        return page ? this.indexForPage(page) : null;
    }

    /** Label for the status line and the address bar. */
    private currentLabel(): { label: string; id: string | null } {
        const pages = this.currentPages();
        const named = pages.find((p) => p.dataset.chapter) ?? pages[pages.length - 1] ?? pages[0];
        return { label: named?.dataset.title ?? '', id: named?.dataset.chapter ?? null };
    }

    // ------------------------------------------------------------ rendering

    private setVisibility(page: HTMLElement, state: Visibility): void {
        page.style.display = state === 'hidden' ? 'none' : '';
        page.style.visibility = state === 'preload' ? 'hidden' : '';
        const hidden = state !== 'shown';
        page.inert = hidden;
        if (hidden) page.setAttribute('aria-hidden', 'true');
        else page.removeAttribute('aria-hidden');
    }

    private restShift(index: number): number {
        if (this.mode === 'single') return 0;
        if (index === 0) return -this.w / 2;
        if (!this.pages[2 * index]) return this.w / 2;
        return 0;
    }

    private applyShift(px: number): void {
        this.inner.style.transform = `translateX(${px.toFixed(2)}px)`;
    }

    private renderStatic(): void {
        const shown = new Set(this.currentPages());
        const preload = new Set<HTMLElement>();
        if (this.mode === 'spread') {
            [-3, -2, 1, 2].forEach((d) => {
                const p = this.pages[2 * this.index + d];
                if (p) preload.add(p);
            });
        } else {
            [-1, 1].forEach((d) => {
                const p = this.singleOrder[this.index + d];
                if (p) preload.add(p);
            });
        }

        for (const page of this.pages) {
            this.resetPage(page);
            this.setVisibility(page, shown.has(page) ? 'shown' : preload.has(page) ? 'preload' : 'hidden');
        }
        this.resetPage(this.blank);
        this.blank.style.display = 'none';
        this.cast.style.display = 'none';
        this.applyShift(this.restShift(this.index));
        this.renderFurniture();

        this.root.dataset.atStart = String(this.index === 0);
        this.root.dataset.atEnd = String(this.index === this.lastIndex);
        const { label, id } = this.currentLabel();
        this.opts.onSettle?.(label);
        this.syncHash(id);
    }

    /** The leather board under an open book and the stacked page edges beside it. */
    private renderFurniture(): void {
        const open = this.mode === 'single' || (this.index > 0 && this.index < this.lastIndex);
        this.board.style.display = open ? '' : 'none';
        delete this.root.dataset.board;
        const leavesLeft = this.mode === 'spread' ? this.index : 0;
        const leavesRight = this.mode === 'spread' ? this.lastIndex - this.index : 0;
        this.root.style.setProperty('--edge-left', `${open ? Math.min(9, 2 + leavesLeft * 0.7) : 0}px`);
        this.root.style.setProperty('--edge-right', `${open ? Math.min(9, 2 + leavesRight * 0.7) : 0}px`);
    }

    private resetPage(page: HTMLElement): void {
        page.style.clipPath = '';
        page.style.transform = '';
        page.style.zIndex = '';
        const band = page.querySelector<HTMLElement>('.tome-fx > .tome-band');
        if (band) band.style.display = 'none';
    }

    private syncHash(id: string | null): void {
        const target = id ? `#${id}` : window.location.pathname + window.location.search;
        if ((id ? `#${id}` : '') === window.location.hash) return;
        try {
            history.replaceState(null, '', target);
        } catch {
            // Sandboxed frames can block history writes; the book still works.
        }
    }

    // --------------------------------------------------------------- turning

    /** True while the journal is closed on its front cover. */
    get atFrontCover(): boolean {
        return this.index === 0;
    }

    private canTurn(dir: 1 | -1): boolean {
        return dir === 1 ? this.index < this.lastIndex : this.index > 0;
    }

    private makeTurn(dir: 1 | -1, cornerY: number): Turn | null {
        const { w, h } = this;
        if (this.mode === 'spread') {
            const s = this.index;
            if (dir === 1) {
                const front = this.pages[2 * s];
                const back = this.pages[2 * s + 1];
                if (!front || !back) return null;
                const leaf: Leaf = { rect: { x: w, y: 0, w, h }, spineX: w, corner: vec(2 * w, cornerY) };
                return {
                    leaf, front, back, under: this.pages[2 * s + 2] ?? null,
                    frontHome: vec(w, 0), backHome: vec(0, 0),
                    landIndex: s + 1, restIndex: s,
                    shiftAtRest: this.restShift(s), shiftAtLand: this.restShift(s + 1),
                    pointer: leaf.corner,
                };
            }
            const front = this.pages[2 * s - 1];
            const back = this.pages[2 * s - 2];
            if (!front || !back) return null;
            const leaf: Leaf = { rect: { x: 0, y: 0, w, h }, spineX: w, corner: vec(0, cornerY) };
            return {
                leaf, front, back, under: this.pages[2 * s - 3] ?? null,
                frontHome: vec(0, 0), backHome: vec(w, 0),
                landIndex: s - 1, restIndex: s,
                shiftAtRest: this.restShift(s), shiftAtLand: this.restShift(s - 1),
                pointer: leaf.corner,
            };
        }

        // Single page: a forward turn lifts the current page away to the left.
        // A backward turn is the same fold played in reverse on the previous page.
        const p = dir === 1 ? this.index : this.index - 1;
        const front = this.singleOrder[p];
        if (!front) return null;
        const leaf: Leaf = { rect: { x: 0, y: 0, w, h }, spineX: 0, corner: vec(w, cornerY) };
        const turn: Turn = {
            leaf, front, back: this.blank, under: this.singleOrder[p + 1] ?? null,
            frontHome: vec(0, 0), backHome: vec(-w, 0),
            landIndex: p + 1, restIndex: p,
            shiftAtRest: 0, shiftAtLand: 0,
            pointer: dir === 1 ? leaf.corner : landingPoint(leaf),
        };
        return turn;
    }

    private beginTurn(turn: Turn): void {
        this.turn = turn;
        for (const page of this.currentPages()) page.style.zIndex = '1';
        if (turn.under) {
            this.setVisibility(turn.under, 'shown');
            turn.under.style.zIndex = '1';
        }
        this.setVisibility(turn.front, 'shown');
        turn.front.style.zIndex = '3';
        if (turn.back === this.blank) this.blank.style.display = 'flex';
        else this.setVisibility(turn.back, 'shown');
        turn.back.style.zIndex = '4';
        this.cast.style.display = '';
        this.cast.style.left = `${turn.leaf.rect.x}px`;
        this.board.style.display = '';
        // Swinging the front cover leaves the left half bare until it lands; the back cover the right.
        const closedEnd = [turn.landIndex, turn.restIndex].find((i) => i === 0 || i === this.lastIndex);
        if (this.mode === 'spread' && closedEnd !== undefined) {
            this.root.dataset.board = closedEnd === 0 ? 'right' : 'left';
        }
        this.drawTurn(turn.pointer);
    }

    private drawTurn(pointer: Vec): void {
        const turn = this.turn;
        if (!turn) return;
        turn.pointer = pointer;
        const fold = computeFold(turn.leaf, pointer);
        if (!fold) {
            turn.front.style.clipPath = '';
            turn.back.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
            this.cast.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
            this.applyShift(turn.shiftAtRest);
            return;
        }
        turn.front.style.clipPath = toClipPath(fold.flat, turn.frontHome);
        turn.back.style.transform = toCssMatrix(fold.backMatrix, turn.backHome);
        turn.back.style.clipPath = toClipPath(fold.liftedOnBack, turn.backHome);
        this.applyShift(turn.shiftAtRest + (turn.shiftAtLand - turn.shiftAtRest) * fold.progress);
        this.drawLight(turn, fold);
    }

    /** Shadow on the page being uncovered, a sheen on the curling underside, shade on the flat side. */
    private drawLight(turn: Turn, fold: Fold): void {
        const lift = Math.sin(Math.PI * fold.progress);
        const reach = this.w * (0.12 + 0.3 * lift);

        this.cast.style.clipPath = toClipPath(fold.lifted, vec(turn.leaf.rect.x, 0));
        this.placeBand(
            this.castBand,
            vec(fold.origin.x - turn.leaf.rect.x, fold.origin.y),
            vec(-fold.normal.x, -fold.normal.y),
            reach,
            `linear-gradient(to bottom, rgba(28,16,6,${(0.22 + 0.3 * lift).toFixed(3)}), rgba(28,16,6,0))`,
        );

        const spine = reflection(vec(turn.leaf.spineX, 0), vec(0, 1));
        const backOrigin = apply(spine, fold.origin);
        const backBand = turn.back.querySelector<HTMLElement>('.tome-fx > .tome-band');
        if (backBand) {
            this.placeBand(
                backBand,
                vec(backOrigin.x - turn.backHome.x, backOrigin.y - turn.backHome.y),
                vec(fold.normal.x, -fold.normal.y),
                this.w * (0.18 + 0.25 * lift),
                'linear-gradient(to bottom, rgba(44,28,12,0.34), rgba(255,246,222,0.22) 22%, rgba(255,246,222,0) 60%)',
            );
        }

        const frontBand = turn.front.querySelector<HTMLElement>('.tome-fx > .tome-band');
        if (frontBand) {
            this.placeBand(
                frontBand,
                vec(fold.origin.x - turn.frontHome.x, fold.origin.y - turn.frontHome.y),
                fold.normal,
                this.w * 0.14,
                `linear-gradient(to bottom, rgba(44,28,12,${(0.1 + 0.16 * lift).toFixed(3)}), rgba(44,28,12,0))`,
            );
        }
    }

    /**
     * Lays a long gradient band along the fold line. The band's top edge sits on
     * the line and it grows in `toward`, so gradients read outward from the crease.
     */
    private placeBand(band: HTMLElement, origin: Vec, toward: Vec, thickness: number, background: string): void {
        const span = 3 * Math.hypot(this.w, this.h);
        const angle = Math.atan2(-toward.x, toward.y);
        band.style.display = 'block';
        band.style.width = `${span}px`;
        band.style.height = `${thickness}px`;
        band.style.left = `${origin.x - span / 2}px`;
        band.style.top = `${origin.y}px`;
        band.style.transform = `rotate(${angle}rad)`;
        band.style.background = background;
    }

    private settle(index: number): void {
        this.turn = null;
        this.index = index;
        this.renderStatic();
    }

    private finishTurnInstantly(): void {
        const turn = this.turn;
        if (!turn) return;
        const fold = computeFold(turn.leaf, turn.pointer);
        this.settle(fold && fold.progress > 0.5 ? turn.landIndex : turn.restIndex);
    }

    private animatePointer(to: Vec, duration: number): Promise<void> {
        const turn = this.turn;
        if (!turn) return Promise.resolve();
        if (this.opts.reducedMotion || duration <= 0) {
            this.drawTurn(to);
            return Promise.resolve();
        }
        const from = turn.pointer;
        const bottom = turn.leaf.corner.y > 0;
        const arc = Math.min(this.h * 0.18, Math.abs(to.x - from.x) * 0.2) * (bottom ? -1 : 1);
        this.animating = true;
        return new Promise((resolve) => {
            const started = performance.now();
            const step = (now: number): void => {
                const t = clamp((now - started) / duration, 0, 1);
                const e = EASE(t);
                const p = lerp(from, to, e);
                this.drawTurn(vec(p.x, p.y + arc * Math.sin(Math.PI * e)));
                if (t < 1) requestAnimationFrame(step);
                else {
                    this.animating = false;
                    resolve();
                }
            };
            requestAnimationFrame(step);
        });
    }

    private durationFor(from: Vec, to: Vec, base: number): number {
        const share = Math.abs(to.x - from.x) / (2 * this.w);
        return clamp(base * (0.35 + share), 160, base);
    }

    /** Turn one page with the full animation. Resolves once the book has settled. */
    async flip(dir: 1 | -1, base = 900, weight = 1): Promise<void> {
        if (this.animating || this.grab || !this.canTurn(dir)) return;
        if (this.peeking) this.endPeek(true);
        const turn = this.turn ?? this.makeTurn(dir, this.h);
        if (!turn) return;
        if (!this.turn) this.beginTurn(turn);
        this.opts.sound.play(weight);
        const reverseSingle = this.mode === 'single' && dir === -1;
        const target = reverseSingle ? turn.leaf.corner : landingPoint(turn.leaf);
        await this.animatePointer(target, this.durationFor(turn.pointer, target, base));
        this.settle(reverseSingle ? turn.restIndex : turn.landIndex);
    }

    next(): Promise<void> {
        return this.flip(1);
    }

    prev(): Promise<void> {
        return this.flip(-1);
    }

    /** Riffle straight to a chapter, one quick page at a time. */
    async goTo(id: string): Promise<void> {
        const target = this.indexForId(id);
        if (target === null || target === this.index) return;
        const steps = Math.abs(target - this.index);
        const base = clamp(1100 / steps, 240, 900);
        const dir: 1 | -1 = target > this.index ? 1 : -1;
        while (this.index !== target) {
            const before = this.index;
            await this.flip(dir, base, steps > 2 ? 0.45 : 1);
            if (this.index === before) break;
        }
    }

    // ------------------------------------------------------------ pointer

    private localPoint(e: PointerEvent): Vec {
        const r = this.inner.getBoundingClientRect();
        return vec(e.clientX - r.left, e.clientY - r.top);
    }

    /** Which way a press at `p` would turn, if it lands on a turnable edge. */
    private zoneAt(p: Vec): 1 | -1 | null {
        const { w } = this;
        if (this.mode === 'spread') {
            if (p.x > w * 1.55 && this.pages[2 * this.index] && this.canTurn(1)) return 1;
            if (p.x < w * 0.45 && this.pages[2 * this.index - 1] && this.canTurn(-1)) return -1;
            return null;
        }
        if (p.x > w * 0.6 && this.canTurn(1)) return 1;
        if (p.x < w * 0.28 && this.canTurn(-1)) return -1;
        return null;
    }

    private onPointerDown(e: PointerEvent): void {
        if (e.button !== 0 || this.animating) return;
        if ((e.target as Element).closest(INTERACTIVE)) return;
        const p = this.localPoint(e);
        const dir = this.zoneAt(p);
        if (!dir) return;
        if (this.peeking) this.endPeek(true);
        this.grab = {
            pointerId: e.pointerId, start: p, dir,
            cornerY: p.y > this.h / 2 ? this.h : 0,
            startedAt: performance.now(), dragging: false,
            lastPoint: p, lastTime: performance.now(), velocityX: 0,
        };
        try {
            this.inner.setPointerCapture(e.pointerId);
        } catch {
            // Capture can be refused (e.g. a pointer that already ended); the drag still works while over the book.
        }
    }

    private onPointerMove(e: PointerEvent): void {
        const p = this.localPoint(e);
        const grab = this.grab;
        if (!grab) {
            if (e.pointerType === 'mouse') this.updatePeek(p);
            return;
        }
        if (e.pointerId !== grab.pointerId) return;
        const now = performance.now();
        grab.velocityX = (p.x - grab.lastPoint.x) / Math.max(1, now - grab.lastTime);
        grab.lastPoint = p;
        grab.lastTime = now;

        if (!grab.dragging) {
            if (Math.hypot(p.x - grab.start.x, p.y - grab.start.y) < 6) return;
            const turn = this.makeTurn(grab.dir, grab.cornerY);
            if (!turn) {
                this.grab = null;
                return;
            }
            grab.dragging = true;
            this.root.classList.add('is-dragging');
            this.beginTurn(turn);
            this.opts.sound.play(0.6);
        }
        this.drawTurn(this.dragPointer(grab, p));
    }

    /** Maps the finger to the corner. Reverse single-page turns pull the page back in from the left. */
    private dragPointer(grab: Grab, p: Vec): Vec {
        const turn = this.turn;
        if (!turn) return p;
        if (this.mode === 'single' && grab.dir === -1) {
            const t = clamp((p.x - grab.start.x) / (this.w * 0.9), 0, 1);
            const along = lerp(landingPoint(turn.leaf), turn.leaf.corner, t);
            return vec(along.x, lerp(turn.leaf.corner, p, 0.5).y);
        }
        return p;
    }

    private async onPointerUp(e: PointerEvent): Promise<void> {
        const grab = this.grab;
        if (!grab || e.pointerId !== grab.pointerId) return;
        this.grab = null;
        this.root.classList.remove('is-dragging');
        if (this.inner.hasPointerCapture(e.pointerId)) this.inner.releasePointerCapture(e.pointerId);

        if (!grab.dragging) {
            // A tap on the page edge turns the page.
            if (e.type === 'pointerup') await this.flip(grab.dir);
            return;
        }
        const turn = this.turn;
        if (!turn) return;
        const fold = computeFold(turn.leaf, turn.pointer);
        const progress = fold ? fold.progress : 0;
        const flung = grab.velocityX * -Math.sign(turn.leaf.corner.x - turn.leaf.spineX || 1) > 0.5;
        const reverseSingle = this.mode === 'single' && grab.dir === -1;

        let landed: boolean;
        if (reverseSingle) landed = progress < 0.65 || grab.velocityX > 0.5;
        else landed = progress > 0.3 || flung;

        const target = landed === !reverseSingle ? landingPoint(turn.leaf) : turn.leaf.corner;
        if (landed) this.opts.sound.play(0.8);
        await this.animatePointer(target, this.durationFor(turn.pointer, target, 700));
        if (reverseSingle) this.settle(landed ? turn.restIndex : turn.landIndex);
        else this.settle(landed ? turn.landIndex : turn.restIndex);
    }

    // --------------------------------------------------------------- peek

    /** Hovering near an outer corner lifts it a little, inviting a drag. */
    private updatePeek(p: Vec): void {
        if (this.opts.reducedMotion || this.animating || (this.turn && !this.peeking)) return;
        const dir = this.zoneAt(p);
        const cornerX = dir === 1 ? (this.mode === 'spread' ? 2 * this.w : this.w) : 0;
        const nearBottom = this.h - p.y < this.w * 0.2;
        const near = dir !== null && Math.abs(p.x - cornerX) < this.w * 0.2 && nearBottom;
        if (!near || !dir || (this.mode === 'single' && dir === -1)) {
            this.endPeek();
            return;
        }
        if (!this.peeking) {
            const turn = this.makeTurn(dir, this.h);
            if (!turn) return;
            this.peeking = true;
            this.beginTurn(turn);
        }
        const turn = this.turn;
        if (!turn) return;
        const inward = dir === 1 ? -1 : 1;
        const peek = vec(turn.leaf.corner.x + inward * this.w * 0.09, this.h - this.w * 0.07);
        this.drawTurn(lerp(turn.pointer, peek, 0.35));
        requestAnimationFrame(() => {
            if (this.peeking && this.turn && !this.grab) this.drawTurn(lerp(this.turn.pointer, peek, 0.5));
        });
    }

    private endPeek(immediate = false): void {
        if (!this.peeking) return;
        this.peeking = false;
        const turn = this.turn;
        if (!turn) return;
        if (immediate) {
            this.settle(turn.restIndex);
            return;
        }
        void this.animatePointer(turn.leaf.corner, 180).then(() => {
            if (!this.grab && this.turn === turn) this.settle(turn.restIndex);
        });
    }
}
