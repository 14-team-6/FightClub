interface CodeMap {
  KeyD : string;
  KeyA : string;
  KeyW : string;
}

type AllowKeyCode = keyof CodeMap;

export interface Keys {
  left : boolean;
  right : boolean;
  up : boolean;
}

type AllowKey = keyof Keys;

const Keyboard = (() => {
  let active = false;

  const keys = {
    left: false,
    right: false,
    up: false,
  };

  const keyCodeMap = {
    KeyA: 'left',
    KeyD: 'right',
    KeyW: 'up',
  };

  function keyEvents(event: KeyboardEvent) {
    const { code } = event;

    if (code in keyCodeMap) {
      const key = keyCodeMap[code as AllowKeyCode];

      if (key in keys) {
        keys[key as AllowKey] = event.type === 'keydown';
        event.preventDefault();
      }
    }
  }

  const API = {
    start() {
      if (!active) {
        window.addEventListener('keyup', keyEvents);
        window.addEventListener('keydown', keyEvents);
        active = true;
      }
      return keys;
    },

    stop() {
      if (active) {
        window.removeEventListener('keyup', keyEvents);
        window.removeEventListener('keydown', keyEvents);
        active = false;
      }
    },
  };
  return API;
})();

export default Keyboard;
