import {
  CharacterMove,
  CharacterSprite,
  CharacterState,
  Directions,
  Rect
} from '@frontend/src/game/types';
import spriteCollection from '@frontend/src/game/spriteCollection';

export class CharacterVisual {
  public ctx: CanvasRenderingContext2D;

  public spriteOption: Record<string, CharacterSprite>;

  public moveOption: CharacterMove;

  constructor(ctx: CanvasRenderingContext2D, moveOptions: CharacterMove) {
    this.ctx = ctx;
    this.spriteOption = spriteCollection();
    this.moveOption = moveOptions;
  }

  public getCollisionRect(state: CharacterState): Rect {
    const spriteOption = this.spriteOption[state];
    if (this.moveOption.direction === Directions.RIGHT) {
      return {
        x: this.moveOption.x + spriteOption.collisionRectX,
        y: this.moveOption.y + spriteOption.collisionRectY,
        width: spriteOption.collisionRectWidth,
        height: spriteOption.collisionRectHeight,
      };
    } else {
      return {
        x: this.moveOption.x + spriteOption.frameWidth - (spriteOption.collisionRectX + spriteOption.collisionRectWidth),
        y: this.moveOption.y + spriteOption.collisionRectY,
        width: spriteOption.collisionRectWidth,
        height: spriteOption.collisionRectHeight,
      };
    }
  }

  public draw(state: CharacterState) {
    const { moveOption, ctx } = this;

    const spriteOption = this.spriteOption[state];

    ctx.beginPath();
    ctx.drawImage(
      spriteOption.img[moveOption.direction as Directions],
      0,
      spriteOption.frameIndex * spriteOption.frameHeight,
      spriteOption.frameWidth,
      spriteOption.frameHeight,
      moveOption.x,
      moveOption.y,
      spriteOption.frameWidth,
      spriteOption.frameHeight,
    );
    ctx.strokeStyle = 'blue';
    const crt = this.getCollisionRect(state);
    ctx.strokeRect(
      crt.x,
      crt.y,
      crt.width,
      crt.height,
    );
    ctx.closePath();
  }

  public updateSprite(state: CharacterState) {
    const spriteOption = this.spriteOption[state];

    spriteOption.tickCount += 1;

    if (spriteOption.tickCount > spriteOption.ticksPerFrame) {
      spriteOption.tickCount = 0;
      if (spriteOption.frameIndex < spriteOption.numberOfFrames - 1) {
        spriteOption.frameIndex += 1;
      } else {
        spriteOption.frameIndex = 0;
      }
    }
  }

  public turnAround() {
    if (this.moveOption.direction === Directions.RIGHT) {
      this.moveOption.direction = Directions.LEFT;
    } else {
      this.moveOption.direction = Directions.RIGHT;
    }
  }
}
