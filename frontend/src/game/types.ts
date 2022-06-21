export enum LifeBarTypes {
  IAM,
  ENEMY,
}

export type LifeBarProps = {
  lifePercent: number,
  lifeType: LifeBarTypes,
  name: string
};

export interface SpriteMap {
  right: HTMLImageElement;
  left: HTMLImageElement;
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
