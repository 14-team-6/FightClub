export interface Controls {
  left : boolean;
  right : boolean;
  up : boolean;
  attack: boolean;
  pause: boolean;
}

export abstract class InputControls {
  public abstract keys: Controls;

  public abstract start(): void;

  public abstract stop(): void;
}
