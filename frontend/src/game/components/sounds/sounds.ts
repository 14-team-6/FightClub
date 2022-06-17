import { SOUND_JUMP, SOUND_MAIN_THEME, SAMPLING_RATE } from '@frontend/consts/sounds';
import { LoopSettings, Nullable } from '@frontend/src/game/components/sounds/types';
import { Sound } from '@frontend/src/game/components/sounds/sound';

const { AudioContext } = window;

const audioContext = new AudioContext();

const makeSound = (
  name: string,
  url: string,
  loopSettings: Nullable<LoopSettings> = null,
): Promise<any> => {
  const getBufferFromUrl = (): Promise<any> => {
    return fetch(url)
      .then((res) => { return res.arrayBuffer(); })
      .then((arrayBuffer) => {
        return audioContext.decodeAudioData(arrayBuffer);
      })
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

        return offlineContext.startRendering().then((renderedAudioBuffer) => {
          return renderedAudioBuffer;
        });
      });
  };

  return getBufferFromUrl()
    .then((audioBuffer: AudioBuffer) => {
      return new Sound(name, audioContext, audioBuffer, loopSettings);
    })
    .catch(() => {
      throw Error(`Can not load sound ${url}`);
    });
};

class SoundFacade {
  private sounds: Record<string, Sound> = {};

  public async init() {
    return Promise.all([
      makeSound('mainTheme', SOUND_MAIN_THEME, { loop: true, loopEnd: 0.1 }),
      makeSound('jump', SOUND_JUMP),
    ]).then((res: Sound[]) => {
      this.sounds = res.reduce((akk, val) => { return { ...akk, [val.name]: val }; }, {});
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

  public stopMainTheme() {
    this.stopIfExist('mainTheme');
  }
}

export default new SoundFacade();
