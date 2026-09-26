/**
 * A synthesized paper rustle, so the page ships no audio files. A short burst
 * of noise is swept through a band-pass filter: the sweep is the sheet
 * sliding, the fast decay is it settling. Audio only starts after the reader
 * turns a page themselves, which also satisfies browser autoplay rules.
 */

const STORAGE_KEY = 'tome-sound';

type AudioContextCtor = typeof AudioContext;

export class PaperSound {
    private ctx: AudioContext | null = null;
    private noise: AudioBuffer | null = null;
    private lastPlayed = 0;
    enabled: boolean;

    constructor() {
        this.enabled = PaperSound.readPreference();
    }

    private static readPreference(): boolean {
        try {
            return window.localStorage.getItem(STORAGE_KEY) !== 'off';
        } catch {
            return true;
        }
    }

    setEnabled(on: boolean): void {
        this.enabled = on;
        try {
            window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
        } catch {
            // Private windows can refuse storage; the toggle still works for this visit.
        }
    }

    private ensureContext(): AudioContext | null {
        if (this.ctx) return this.ctx;
        const Ctor: AudioContextCtor | undefined =
            window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
        if (!Ctor) return null;
        this.ctx = new Ctor();
        const length = Math.floor(this.ctx.sampleRate * 0.6);
        this.noise = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
        const data = this.noise.getChannelData(0);
        for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
        return this.ctx;
    }

    /** `weight` 0..1 scales loudness, so a fast riffle through many pages stays soft. */
    play(weight = 1): void {
        if (!this.enabled) return;
        const now = performance.now();
        if (now - this.lastPlayed < 60) return;
        this.lastPlayed = now;

        const ctx = this.ensureContext();
        if (!ctx || !this.noise) return;
        if (ctx.state === 'suspended') void ctx.resume();

        const t = ctx.currentTime;
        const source = ctx.createBufferSource();
        source.buffer = this.noise;
        source.playbackRate.value = 0.85 + Math.random() * 0.3;

        const band = ctx.createBiquadFilter();
        band.type = 'bandpass';
        band.Q.value = 0.9;
        band.frequency.setValueAtTime(900, t);
        band.frequency.exponentialRampToValueAtTime(3400, t + 0.22);

        const air = ctx.createBiquadFilter();
        air.type = 'highpass';
        air.frequency.value = 450;

        const gain = ctx.createGain();
        const peak = 0.16 * Math.max(0.15, Math.min(1, weight));
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(peak, t + 0.035);
        gain.gain.exponentialRampToValueAtTime(peak * 0.35, t + 0.16);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);

        source.connect(band).connect(air).connect(gain).connect(ctx.destination);
        source.start(t);
        source.stop(t + 0.45);
    }
}
