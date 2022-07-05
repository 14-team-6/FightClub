import { Controls } from '@frontend/src/game/components/controls/controls';

interface KeyboardLayout {
  up: string,
  left: string,
  right: string,
  attack: string,
  pause: string,
}

export interface keyboardLayoutAWD extends KeyboardLayout {
  up: 'KeyW',
  left: 'KeyA',
  right: 'KeyD',
  attack: 'Space',
  pause: 'Escape',
}

export interface keyboardLayoutArrows extends KeyboardLayout {
  up: 'ArrowUp',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  attack: 'ShiftRight',
  pause: 'Escape',
}

export class KeyboardControl {
  private static __instance: KeyboardControl;

  private readonly _keyCodeMap: Record<string, keyof KeyboardLayout>;

  private _active;

  public keys: Controls;

  private constructor(keyboardLayout: KeyboardLayout) {
    this._active = false;

    this.keys = {
      left: false,
      right: false,
      up: false,
      attack: false,
      pause: false,
    };

    this._keyCodeMap = Object.entries(keyboardLayout).reduce((akk, val) => {
      return { ...akk, [val[1]]: val[0] }
    }, {});
  }

  public static getInstance(keyboardLayout: KeyboardLayout): KeyboardControl {
    if (!KeyboardControl.__instance) {
      KeyboardControl.__instance = new KeyboardControl(keyboardLayout);
    }

    return KeyboardControl.__instance;
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
