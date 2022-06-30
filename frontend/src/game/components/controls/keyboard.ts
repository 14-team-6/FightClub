import { Controls } from '@frontend/src/game/components/controls/controls';

interface CodeMap {
  KeyD : string;
  KeyA : string;
  KeyW : string;
  Space: string;
  Escape: string;
}

type AllowKeyCode = keyof CodeMap;

type AllowKey = keyof Controls;

export class KeyboardControl {
  private static __instance: KeyboardControl;

  private _keyCodeMap: CodeMap = {
    KeyA: 'left',
    KeyD: 'right',
    KeyW: 'up',
    Space: 'attack',
    Escape: 'pause',
  };

  private _active;

  public keys: Controls;

  private constructor() {
    this._active = false;

    this.keys = {
      left: false,
      right: false,
      up: false,
      attack: false,
      pause: false,
    };
  }

  public static getInstance(): KeyboardControl {
    if (!KeyboardControl.__instance) {
      KeyboardControl.__instance = new KeyboardControl();
    }

    return KeyboardControl.__instance;
  }

  private keyEvents = (event: KeyboardEvent) => {
    const { code } = event;

    if (code in this._keyCodeMap) {
      const key = this._keyCodeMap[code as AllowKeyCode];

      if (key in this.keys) {
        this.keys[key as AllowKey] = event.type === 'keydown';
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
