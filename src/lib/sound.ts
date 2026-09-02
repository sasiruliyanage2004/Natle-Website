// Ultra-Smooth, Warm Organic Sound Engine (Zero Beeps, High-End Tactile Acoustic Feel)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public getIsSoundEnabled(): boolean {
    return !this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return !this.isMuted;
  }

  // Silky-Smooth, Warm Organic Micro-Thump (Whisper-Quiet, Zero High-Pitched Beep)
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      
      // Warm low-frequency sine wave through a gentle acoustic low-pass filter
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Gentle warm frequency (180Hz -> 80Hz), eliminating any electronic beep
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.04);

      // Low-pass filter to eliminate any sharp digital click or beep
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, now);

      // Gentle, whisper-soft gain (0.07 volume)
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Safe audio fallback
    }
  }

  // Ultra-gentle air breath for hover
  public playHover() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.025);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Safe fallback
    }
  }

  // Silent / Smooth Sweep (No screeching)
  public playSweep(_pitchFactor: number = 0.5) {
    // Kept silent to preserve a clean, peaceful slider experience
  }

  // Warm, Luxurious Harmonic Chord for AI completion
  public playChime() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Warm, soothing acoustic frequencies (E major triad: E4, G#4, B4)
      const notes = [329.63, 415.30, 493.88];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.06;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.04, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.45);
      });
    } catch {
      // Safe fallback
    }
  }
}

export const sound = new SoundEngine();
