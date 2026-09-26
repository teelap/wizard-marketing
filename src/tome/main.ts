/**
 * Boots the tome on /projects. Without JavaScript the pages simply stack as
 * parchment sheets, so everything here is enhancement.
 */

import { Intro, shouldPlayIntro } from './intro';
import { PaperSound } from './sound';
import { Tome } from './tome';

const EDITABLE = 'input, textarea, select, [contenteditable="true"]';

function init(): void {
    const root = document.querySelector<HTMLElement>('[data-tome]');
    if (!root || typeof ResizeObserver === 'undefined' || !CSS.supports('clip-path', 'polygon(0 0, 1px 0, 0 1px)')) {
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sound = new PaperSound();
    const status = document.querySelector<HTMLElement>('[data-tome-status]');
    const prev = document.querySelector<HTMLButtonElement>('[data-tome-prev]');
    const next = document.querySelector<HTMLButtonElement>('[data-tome-next]');
    const tome = new Tome(root, {
        reducedMotion,
        sound,
        onSettle: (label) => {
            if (status) status.textContent = label;
            if (prev) prev.disabled = root.dataset.atStart === 'true';
            if (next) next.disabled = root.dataset.atEnd === 'true';
        },
    });

    const initial = decodeURIComponent(window.location.hash.slice(1)) || null;
    tome.start(initial);
    if (shouldPlayIntro(initial, reducedMotion)) Intro.create(tome, sound)?.arm();

    prev?.addEventListener('click', () => void tome.prev());
    next?.addEventListener('click', () => void tome.next());
    bindSoundToggle(sound);
    bindChapterLinks(root, tome, reducedMotion);
    bindKeyboard(root, tome);

    // A typed or linked #chapter on an already-open page turns to it.
    window.addEventListener('hashchange', () => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (id) void tome.goTo(id);
    });
}

function bindSoundToggle(sound: PaperSound): void {
    const toggle = document.querySelector<HTMLButtonElement>('[data-tome-sound]');
    if (!toggle) return;
    const render = (): void => {
        toggle.setAttribute('aria-pressed', String(sound.enabled));
        const icon = toggle.querySelector('i');
        icon?.classList.toggle('fa-volume-high', sound.enabled);
        icon?.classList.toggle('fa-volume-xmark', !sound.enabled);
    };
    render();
    toggle.addEventListener('click', () => {
        sound.setEnabled(!sound.enabled);
        render();
        if (sound.enabled) sound.play(0.5);
    });
}

/** Contents entries and the index below the book riffle straight to a chapter. */
function bindChapterLinks(root: HTMLElement, tome: Tome, reducedMotion: boolean): void {
    document.addEventListener('click', (event) => {
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-tome-goto]');
        if (!link) return;
        const id = link.dataset.tomeGoto;
        if (!id) return;
        event.preventDefault();

        const box = root.getBoundingClientRect();
        const offscreen = box.bottom < 80 || box.top > window.innerHeight - 80;
        if (offscreen) root.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });

        window.setTimeout(
            () => {
                void tome.goTo(id).then(() => {
                    document.getElementById(`${id}-title`)?.focus({ preventScroll: true });
                });
            },
            offscreen && !reducedMotion ? 450 : 0,
        );
    });
}

function bindKeyboard(root: HTMLElement, tome: Tome): void {
    let inView = true;
    new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
    }, { threshold: 0.35 }).observe(root);

    document.addEventListener('keydown', (event) => {
        if (!inView || event.altKey || event.ctrlKey || event.metaKey) return;
        // While the journal is still waking on the desk, the keys belong to the intro.
        if (document.querySelector('.tome-stage.is-intro')) return;
        if ((event.target as Element | null)?.closest?.(EDITABLE)) return;
        if (event.key === 'ArrowRight' || event.key === 'PageDown') {
            event.preventDefault();
            void tome.next();
        } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
            event.preventDefault();
            void tome.prev();
        }
    });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
