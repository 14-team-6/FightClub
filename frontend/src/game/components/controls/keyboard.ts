import { Controls, InputControls } from '@frontend/src/game/components/controls/controls';

interface KeyboardLayout {
  up?: string,
  left?: string,
  right?: string,
  attack?: string,
  pause?: string,
}

export const keyboardLayoutAWD: KeyboardLayout = {
  up: 'KeyW',
  left: 'KeyA',
  right: 'KeyD',
  attack: 'Space',
};

export const keyboardLayoutArrows: KeyboardLayout = {
  up: 'ArrowUp',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  attack: 'ShiftRight',
};

export const keyboardLayoutPause: KeyboardLayout = {
  pause: 'Escape',
};

export class KeyboardControl extends InputControls {
  private readonly _keyCodeMap: Record<string, keyof KeyboardLayout>;

  private _active;

  public keys: Controls;

  public constructor(keyboardLayout: KeyboardLayout) {
    super();
    this._active = false;

    this.keys = {
      left: false,
      right: false,
      up: false,
      attack: false,
      pause: false,
    };

    this._keyCodeMap = Object.entries(keyboardLayout).reduce((akk, val) => ({ ...akk, [val[1]]: val[0] }), {});
  }

  private keyEvents = (event: KeyboardEvent) => {
    const { code } = event;

    if (code in this._keyCodeMap) {
      const key = this._keyCodeMap[code];

      if (key in this.keys) {
        this.keys[key] = event.type === 'keydown';
        event.preventDefault();
      }
    }
  };

  public start = () => {
    if (!this._active) {
      window.addEventListener('keyup', this.keyEvents);
      window.addEventListener('keydown', this.keyEvents);
      this._active = true;
    }
  };

  public stop = () => {
    if (this._active) {
      window.removeEventListener('keyup', this.keyEvents);
      window.removeEventListener('keydown', this.keyEvents);
      this._active = false;
    }
  };
}
