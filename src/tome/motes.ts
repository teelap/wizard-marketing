/**
 * Gold motes that orbit the journal while it wakes.
 *
 * Each mote travels a tilted ellipse around the book. Two canvases sandwich
 * the book: motes on the near half of their orbit draw in front of it, the
 * rest behind, so the swirl reads as a ring in depth rather than a flat
 * overlay. The loop only runs while there is something to draw.
 */

type Phase = 'idle' | 'ambient' | 'vortex' | 'burst' | 'fade';

interface Mote {
    angle: number;
    radius: number;
    speed: number;
    lift: number;
    size: number;
    twinkle: number;
    life: number;
    hue: 'gold' | 'pale';
    outward: number;
}

const TAU = Math.PI * 2;

export class Motes {
    private readonly back: HTMLCanvasElement;
    private readonly front: HTMLCanvasElement;
    private readonly host: HTMLElement;
    private readonly target: HTMLElement;
    private motes: Mote[] = [];
    private phase: Phase = 'idle';
    private frame = 0;
    private last = 0;
    private energy = 0;
    private scale = 1;

    constructor(host: HTMLElement, back: HTMLCanvasElement, front: HTMLCanvasElement, target: HTMLElement) {
        this.host = host;
        this.back = back;
        this.front = front;
        this.target = target;
    }

    private resize(): void {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const { width, height } = this.host.getBoundingClientRect();
        for (const canvas of [this.back, this.front]) {
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        this.scale = Math.max(0.6, Math.min(1.4, width / 1100));
    }

    private spawn(count: number, radiusScale: number): void {
        const box = this.target.getBoundingClientRect();
        const base = Math.max(box.width, box.height) * 0.55 * radiusScale;
        for (let i = 0; i < count; i += 1) {
            this.motes.push({
                angle: Math.random() * TAU,
                radius: base * (0.7 + Math.random() * 0.7),
                speed: (0.25 + Math.random() * 0.5) * (Math.random() < 0.15 ? -1 : 1),
                lift: (Math.random() - 0.5) * 0.9,
                size: (0.8 + Math.random() * 2.2) * this.scale,
                twinkle: Math.random() * TAU,
                life: 1,
                hue: Math.random() < 0.72 ? 'gold' : 'pale',
                outward: 0,
            });
        }
    }

    ambient(): void {
        this.resize();
        this.motes = [];
        this.spawn(34, 0.95);
        this.energy = 0.25;
        this.setPhase('ambient');
    }

    vortex(): void {
        this.spawn(150, 1.15);
        this.setPhase('vortex');
    }

    burst(): void {
        for (const m of this.motes) m.outward = 60 + Math.random() * 220;
        this.setPhase('burst');
    }

    fade(): void {
        this.setPhase('fade');
    }

    stop(): void {
        cancelAnimationFrame(this.frame);
        this.phase = 'idle';
        this.motes = [];
        for (const canvas of [this.back, this.front]) {
            canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    private setPhase(phase: Phase): void {
        const wasIdle = this.phase === 'idle';
        this.phase = phase;
        if (wasIdle) {
            this.last = performance.now();
            this.frame = requestAnimationFrame((t) => this.tick(t));
        }
    }

    private tick(now: number): void {
        const dt = Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        const targetEnergy = { idle: 0, ambient: 0.25, vortex: 1, burst: 1.3, fade: 0.2 }[this.phase];
        this.energy += (targetEnergy - this.energy) * Math.min(1, dt * 1.6);

        const host = this.host.getBoundingClientRect();
        const box = this.target.getBoundingClientRect();
        const cx = box.left + box.width / 2 - host.left;
        const cy = box.top + box.height / 2 - host.top;
        const tilt = 0.32;

        const back = this.back.getContext('2d');
        const front = this.front.getContext('2d');
        if (!back || !front) return;
        back.clearRect(0, 0, host.width, host.height);
        front.clearRect(0, 0, host.width, host.height);
        back.globalCompositeOperation = 'lighter';
        front.globalCompositeOperation = 'lighter';

        const shrink = this.phase === 'vortex' ? 0.992 : 1;
        for (const m of this.motes) {
            m.angle += m.speed * dt * (0.6 + this.energy * 2.4);
            m.twinkle += dt * 6;
            if (this.phase === 'vortex') m.radius = Math.max(box.width * 0.42, m.radius * shrink);
            if (this.phase === 'burst') m.radius += m.outward * dt * 2.2;
            if (this.phase === 'burst' || this.phase === 'fade') m.life -= dt * (this.phase === 'burst' ? 0.55 : 0.9);

            const x = cx + Math.cos(m.angle) * m.radius;
            const y = cy + Math.sin(m.angle) * m.radius * tilt + m.lift * box.height * 0.5;
            const alpha = Math.max(0, m.life) * (0.35 + 0.65 * Math.abs(Math.sin(m.twinkle))) * (0.35 + this.energy * 0.75);
            if (alpha <= 0.01) continue;

            const ctx = Math.sin(m.angle) > 0 ? front : back;
            const r = m.size * (0.8 + this.energy * 0.6);
            const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
            const core = m.hue === 'gold' ? '255, 206, 120' : '255, 244, 214';
            glow.addColorStop(0, `rgba(${core}, ${Math.min(1, alpha)})`);
            glow.addColorStop(0.35, `rgba(${core}, ${alpha * 0.35})`);
            glow.addColorStop(1, `rgba(${core}, 0)`);
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x, y, r * 4, 0, TAU);
            ctx.fill();
        }

        this.motes = this.motes.filter((m) => m.life > 0);
        if ((this.phase === 'burst' || this.phase === 'fade') && this.motes.length === 0) {
            this.stop();
            return;
        }
        this.frame = requestAnimationFrame((t) => this.tick(t));
    }
}
