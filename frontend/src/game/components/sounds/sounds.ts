import { SOUND_JUMP, SOUND_MAIN_THEME } from '@frontend/consts/sounds';

export class Sounds {
  private static audioContext: AudioContext;

  private static mainTrack: AudioBufferSourceNode;

  private static jumpBuffer: AudioBuffer;

  private static getBufferFromUrl(url: string) {
    return fetch(url)
      .then((res) => { return res.arrayBuffer(); })
      .then((arrayBuffer) => {
        return this.audioContext.decodeAudioData(arrayBuffer);
      })
      .then((audioBuffer) => {
        // using only audioContext cause to
        // gaping between key pressing and sound playing (it's critical f.e. while jumping)
        // so we need to prerender sounds to avoid uncompression
        const offlineContext = new OfflineAudioContext(2, 44100 * audioBuffer.duration, 44100);
        const audioOfflineNode = offlineContext.createBufferSource();
        audioOfflineNode.buffer = audioBuffer;
        audioOfflineNode.connect(offlineContext.destination);
        audioOfflineNode.start();

        return offlineContext.startRendering().then((renderedAudioBuffer) => {
          return renderedAudioBuffer;
        });
      });
  }

  private static getAudioNodeFromBuffer(audioBuffer: AudioBuffer) {
    const audioNode = this.audioContext.createBufferSource();
    audioNode.buffer = audioBuffer;
    audioNode.connect(this.audioContext.destination);
    return audioNode;
  }

  private static getAudioNodeFromUrl(url: string) {
    return this.getBufferFromUrl(url)
      .then((audioBuffer) => {
        return this.getAudioNodeFromBuffer(audioBuffer);
      });
  }

  public static async init() {
    const { AudioContext } = window;

    this.audioContext = new AudioContext();
    await this.audioContext.resume();

    this.mainTrack = await this.getAudioNodeFromUrl(SOUND_MAIN_THEME);
    if (this.mainTrack.buffer === null) {
      throw Error('Could not load main theme');
    }
    this.mainTrack.loop = true;

    // to avoid small gap while looping (this gap appears due to compression / uncompression)
    this.mainTrack.loopEnd = this.mainTrack.buffer.duration - 0.1;

    this.jumpBuffer = await this.getBufferFromUrl(SOUND_JUMP);
    if (this.jumpBuffer === null) {
      throw Error('Could not load jump sound');
    }
  }

  public static start() {
    this.mainTrack.start(0);
  }

  public static jump() {
    // according to MDN it's ok to recreate this
    const audioNode = this.audioContext.createBufferSource();
    audioNode.buffer = this.jumpBuffer;
    audioNode.connect(this.audioContext.destination);
    audioNode.start(0, 0.03);
  }

  public static stop() {
    this.mainTrack.stop();
  }
}
