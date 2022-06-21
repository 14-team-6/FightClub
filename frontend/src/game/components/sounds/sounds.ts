import { SOUND_JUMP, SOUND_MAIN_THEME, SAMPLING_RATE, SOUND_ATTACK, SOUND_MEOW } from '@frontend/consts/sounds';
import { LoopSettings, Nullable } from '@frontend/src/game/components/sounds/types';
import { Sound } from '@frontend/src/game/components/sounds/sound';

const { AudioContext } = window;

const audioContext = new AudioContext();

const makeSound = (
  name: string,
  url: string,
  loopSettings: Nullable<LoopSettings> = null,
): Promise<any> => {
  const getBufferFromUrl = (): Promise<any> => fetch(url)
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      // using only audioContext cause to
      // gaping between key pressing and sound playing (it's critical f.e. while jumping)
      // so we need to prerender sounds to avoid uncompression
      const offlineContext = new
      OfflineAudioContext(2, SAMPLING_RATE * audioBuffer.duration, SAMPLING_RATE);
      const audioOfflineNode = offlineContext.createBufferSource();
      audioOfflineNode.buffer = audioBuffer;
      audioOfflineNode.connect(offlineContext.destination);
      audioOfflineNode.start();

      return offlineContext.startRendering().then((renderedAudioBuffer) => renderedAudioBuffer);
    });

  return getBufferFromUrl()
    .then((audioBuffer: AudioBuffer) => new Sound(name, audioContext, audioBuffer, loopSettings))
    .catch(() => {
      throw Error(`Can not load sound ${url}`);
    });
};

class SoundFacade {
  private sounds: Record<string, Sound> = {};

  public init(): Promise<any> {
    return Promise.all([
      makeSound('mainTheme', SOUND_MAIN_THEME, { loop: true, loopEnd: 0.1 }),
      makeSound('jump', SOUND_JUMP),
      makeSound('attack', SOUND_ATTACK),
      makeSound('meow', SOUND_MEOW),
    ]).then((res: Sound[]) => {
      this.sounds = res.reduce((akk, val) => ({ ...akk, [val.name]: val }), {});
    }).catch((e: any) => {
      console.log(`Can not start sounds: ${e}`);
    });
  }

  private playIfExist(name: string) {
    if (name in this.sounds) {
      this.sounds[name].play();
    }
  }

  private stopIfExist(name: string) {
    if (name in this.sounds) {
      this.sounds[name].stop();
    }
  }

  public playMainTheme() {
    this.playIfExist('mainTheme');
  }

  public playJump() {
    this.playIfExist('jump');
  }

  public playAttack() {
    this.playIfExist('attack');
  }

  public playMeow() {
    this.playIfExist('meow');
  }

  public stopMainTheme() {
    this.stopIfExist('mainTheme');
  }
}

export default new SoundFacade();
