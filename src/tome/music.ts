/**
 * The waking cue, synthesized live so the page ships no audio files.
 *
 *   swell  — a D major 9 pad whose filter opens as the journal rises
 *   motes  — a bell arpeggio climbing the pentatonic scale during the rise
 *   chime  — a bright bell cluster and a soft whoosh as the cover opens
 *
 * Everything runs through a generated reverb so it sounds like a room, and a
 * compressor keeps the peak polite.
 */

type AudioContextCtor = typeof AudioContext;

const D_MAJOR_9 = [73.42, 146.83, 220.0, 293.66, 369.99, 440.0, 659.25];
const PENTATONIC = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66, 1318.51, 1479.98, 1760.0, 1975.53];

export class MagicMusic {
    private ctx: AudioContext | null = null;
    private master: GainNode | null = null;
    private wet: ConvolverNode | null = null;
    private dry: GainNode | null = null;

    private setup(): boolean {
        if (this.ctx) return true;
        const Ctor: AudioContextCtor | undefined =
            window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
        if (!Ctor) return false;
        const ctx = new Ctor();
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -18;
        comp.ratio.value = 4;
        const master = ctx.createGain();
        master.gain.value = 0.85;
        master.connect(comp).connect(ctx.destination);

        const wet = ctx.createConvolver();
        wet.buffer = this.impulse(ctx, 3.2);
        const wetLevel = ctx.createGain();
        wetLevel.gain.value = 0.55;
        wet.connect(wetLevel).connect(master);
        const dry = ctx.createGain();
        dry.gain.value = 0.6;
        dry.connect(master);

        Object.assign(this, { ctx, master, wet, dry });
        return true;
    }

    /** Decaying stereo noise: the reverb's idea of a stone room. */
    private impulse(ctx: AudioContext, seconds: number): AudioBuffer {
        const length = Math.floor(ctx.sampleRate * seconds);
        const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
        for (let ch = 0; ch < 2; ch += 1) {
            const data = buffer.getChannelData(ch);
            for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2.6;
        }
        return buffer;
    }

    private send(node: AudioNode, wetShare: number): void {
        if (!this.ctx || !this.wet || !this.dry) return;
        const toWet = this.ctx.createGain();
        toWet.gain.value = wetShare;
        const toDry = this.ctx.createGain();
        toDry.gain.value = 1 - wetShare;
        node.connect(toWet).connect(this.wet);
        node.connect(toDry).connect(this.dry);
    }

    private bell(freq: number, at: number, level: number, decay: number): void {
        const ctx = this.ctx;
        if (!ctx) return;
        const out = ctx.createGain();
        out.gain.setValueAtTime(0.0001, at);
        out.gain.exponentialRampToValueAtTime(level, at + 0.006);
        out.gain.exponentialRampToValueAtTime(0.0001, at + decay);
        // Slightly inharmonic partials are what make it read as a bell, not a beep.
        [
            [1, 1],
            [2.76, 0.32],
            [5.4, 0.12],
        ].forEach(([ratio, amount]) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq * ratio;
            const g = ctx.createGain();
            g.gain.value = amount;
            osc.connect(g).connect(out);
            osc.start(at);
            osc.stop(at + decay + 0.05);
        });
        this.send(out, 0.7);
    }

    /** The rising swell and arpeggio. `rise` is how long the journal takes to lift, in seconds. */
    swell(rise: number): void {
        if (!this.setup() || !this.ctx) return;
        const ctx = this.ctx;
        if (ctx.state === 'suspended') void ctx.resume();
        const t = ctx.currentTime + 0.05;
        const end = t + rise + 4.2;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.Q.value = 0.8;
        filter.frequency.setValueAtTime(280, t);
        filter.frequency.exponentialRampToValueAtTime(2600, t + rise);
        filter.frequency.exponentialRampToValueAtTime(900, end);

        const pad = ctx.createGain();
        pad.gain.setValueAtTime(0.0001, t);
        pad.gain.exponentialRampToValueAtTime(0.32, t + rise);
        pad.gain.setValueAtTime(0.32, t + rise + 0.6);
        pad.gain.exponentialRampToValueAtTime(0.0001, end);
        filter.connect(pad);
        this.send(pad, 0.45);

        D_MAJOR_9.forEach((freq, i) => {
            const voice = ctx.createGain();
            voice.gain.value = i === 0 ? 0.28 : 0.14;
            voice.connect(filter);
            [-7, 7].forEach((cents) => {
                const osc = ctx.createOscillator();
                osc.type = i === 0 ? 'sine' : 'sawtooth';
                osc.frequency.value = freq;
                osc.detune.value = cents;
                osc.connect(voice);
                osc.start(t);
                osc.stop(end + 0.1);
            });
        });

        const steps = Math.floor((rise - 0.3) / 0.17);
        for (let i = 0; i < steps; i += 1) {
            const note = PENTATONIC[i % PENTATONIC.length];
            this.bell(note, t + 0.3 + i * 0.17, 0.05 + 0.03 * (i / steps), 1.4);
        }
    }

    /** The cover opening. */
    chime(): void {
        const ctx = this.ctx;
        if (!ctx) return;
        const t = ctx.currentTime + 0.02;
        [1174.66, 1479.98, 1760.0, 2349.32].forEach((f, i) => this.bell(f, t + i * 0.045, 0.09, 2.6));
        [1975.53, 1760.0, 1479.98, 1318.51, 1174.66, 987.77].forEach((f, i) => this.bell(f, t + 0.35 + i * 0.09, 0.035, 1.6));

        const length = Math.floor(ctx.sampleRate * 1.2);
        const noise = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = noise.getChannelData(0);
        for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = noise;
        const band = ctx.createBiquadFilter();
        band.type = 'bandpass';
        band.Q.value = 1.2;
        band.frequency.setValueAtTime(600, t);
        band.frequency.exponentialRampToValueAtTime(4200, t + 0.9);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.12, t + 0.25);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.15);
        src.connect(band).connect(g);
        this.send(g, 0.8);
        src.start(t);
        src.stop(t + 1.2);
    }

    /** Skip: fade everything out quickly. */
    fadeOut(): void {
        if (!this.ctx || !this.master) return;
        const t = this.ctx.currentTime;
        this.master.gain.cancelScheduledValues(t);
        this.master.gain.setValueAtTime(this.master.gain.value, t);
        this.master.gain.linearRampToValueAtTime(0, t + 0.35);
    }
}
