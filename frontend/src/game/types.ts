import { KeyboardControl } from '@frontend/src/game/character/controls/keyboard';

export enum LifeBarTypes {
  IAM,
  ENEMY,
}

export type LifeBarProps = {
  lifeType: LifeBarTypes,
  name: string,
  lifePercent?: number,
  lifePercentCallback?: Function,
  lifePercentPropName: string,
};

export enum Directions {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export type Rect = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type SpriteMap = Record<Directions, HTMLImageElement>;

export enum CharacterState {
  IDLE = 'IDLE',
  RUN = 'RUN',
  JUMP = 'JUMP',
  ATTACK = 'ATTACK',
  HURT = 'HURT',
  DIE = 'DIE',
}

export interface CharacterSprite {
  img: SpriteMap,
  frameIndex: number;
  numberOfFrames: number;
  frameWidth: number;
  frameHeight: number;
  collisionRectX: number;
  collisionRectY: number;
  collisionRectWidth: number;
  collisionRectHeight: number;
  tickCount: number;
  ticksPerFrame: number;
}

export type Controls = KeyboardControl | 'ai';

export interface CharacterMove {
  x: number;
  y: number;
  vX: number;
  vY: number;
  vMax?: number;
  a?: number;
  direction?: Directions;
}

export enum JumpPhase {
  NOJUMP,
  FIRST,
  SECOND,
}
