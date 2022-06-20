import { LoopSettings, Nullable } from '@frontend/src/game/components/sounds/types';

const DEFAULT_LOOP_SETTINGS = {
  loop: false,
  loopEnd: 0,
};

export class Sound {
  private readonly audioBuffer: AudioBuffer;

  private readonly loopSettings: LoopSettings;

  private readonly audioContext: AudioContext;

  private audioNode: AudioBufferSourceNode;

  private isPlaying: boolean;

  public readonly name: string;

  constructor(
    name: string,
    audioContext: AudioContext,
    audioBuffer: AudioBuffer,
    loopSettings: Nullable<Partial<LoopSettings>>,
  ) {
    this.name = name;
    this.audioBuffer = audioBuffer;
    this.audioContext = audioContext;
    this.loopSettings = { ...DEFAULT_LOOP_SETTINGS, ...loopSettings };
  }

  public play() {
    this.audioNode = this.audioContext.createBufferSource();
    this.audioNode.buffer = this.audioBuffer;
    if (this.loopSettings.loop) {
      this.audioNode.loop = this.loopSettings.loop;
      if (this.loopSettings.loopEnd !== undefined) {
        this.audioNode.loopEnd = this.audioNode.buffer.duration - this.loopSettings.loopEnd;
      }
    }
    this.audioNode.connect(this.audioContext.destination);
    this.audioNode.onended = () => {
      this.isPlaying = false;
    };
    this.audioNode.start(0);
    this.isPlaying = true;
  }

  public stop() {
    if (this.isPlaying) {
      this.audioNode.stop();
    }
  }
}
