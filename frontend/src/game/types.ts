import { Controls } from '@frontend/src/game/components/controls/controls';

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

export interface CharacterMove {
  x: number;
  y: number;
  vX: number;
  vY: number;
  vMax?: number;
  a?: number;
  direction?: Directions;
}

export type Keys = Controls;

export enum RoundState {
  PREPARE = 'PREPARE',
  PREPARED = 'PREPARED',
  FIGHT = 'FIGHT',
  ENDING = 'ENDING',
  END = 'END',
}
