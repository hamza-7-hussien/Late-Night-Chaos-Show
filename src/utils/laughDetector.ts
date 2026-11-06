/**
 * حساس الضحك ومحلل الصوت للمايكروفون (Real-Time Laugh & Voice Detector)
 * يعتمد على Web Audio API لفحص مستويات الصوت ونوبات الضحك المفاجئة
 */

export type SensitivityLevel = 'low' | 'medium' | 'high';

class LaughDetectorService {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private animFrameId: number | null = null;

  public isListening: boolean = false;
  public micPermissionGranted: boolean = false;
  public currentVolume: number = 0; // 0 to 100
  public sensitivity: SensitivityLevel = 'medium';

  private onLaughCallback: (() => void) | null = null;
  private onVolumeChangeCallback: ((vol: number, isSpeaking: boolean) => void) | null = null;
  private lastLaughTimestamp: number = 0;

  async startListening(
    onLaugh: () => void,
    onVolumeChange?: (vol: number, isSpeaking: boolean) => void
  ): Promise<boolean> {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        return false;
      }

      this.onLaughCallback = onLaugh;
      this.onVolumeChangeCallback = onVolumeChange || null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.micStream = stream;
      this.micPermissionGranted = true;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx();
      const source = this.audioCtx.createMediaStreamSource(stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.4;
      source.connect(this.analyser);

      this.isListening = true;
      this.analyzeLoop();
      return true;
    } catch (err) {
      console.warn('Microphone access denied or unavailable. Fallback to manual buzzer.', err);
      this.micPermissionGranted = false;
      this.isListening = false;
      return false;
    }
  }

  stopListening() {
    this.isListening = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop());
      this.micStream = null;
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.currentVolume = 0;
  }

  private analyzeLoop = () => {
    if (!this.isListening || !this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // حساب متوسط شدة الصوت
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    const normalizedVol = Math.min(100, Math.round((average / 128) * 100));
    this.currentVolume = normalizedVol;

    const isSpeaking = normalizedVol > 12;

    if (this.onVolumeChangeCallback) {
      this.onVolumeChangeCallback(normalizedVol, isSpeaking);
    }

    // تحديد عتبة كشف نوبة الضحك المفاجئة حسب الحساسية
    let threshold = 55;
    if (this.sensitivity === 'high') threshold = 40;
    if (this.sensitivity === 'low') threshold = 70;

    const now = Date.now();
    // نوبة ضحك (صوت عالي مفاجئ مع ترددات انفجارية) ولم يتكرر خلال ثانيتين
    if (normalizedVol >= threshold && now - this.lastLaughTimestamp > 2200) {
      this.lastLaughTimestamp = now;
      if (this.onLaughCallback) {
        this.onLaughCallback();
      }
    }

    this.animFrameId = requestAnimationFrame(this.analyzeLoop);
  };
}

export const laughDetector = new LaughDetectorService();
