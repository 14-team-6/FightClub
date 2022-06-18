import { Keys } from '../../game/keyboard';
import forward from '../../../public/img/forward.png';
import back from '../../../public/img/back.png';

interface SpriteMap {
  forward: HTMLImageElement;
  back: HTMLImageElement;
}

export type AllowDirection = keyof SpriteMap;
interface CharacterMove {
  x: number;
  y: number;
  vX: number;
  vY: number;
  vMax?: number;
  a?: number;
  direction?: AllowDirection;
}
interface CharacterSprite {
  img: SpriteMap,
  frameIndex: number;
  numberOfFrames: number;
  frameWidth: number;
  frameHeight: number;
  tickCount: number;
  ticksPerFrame:number;
}

class Character {
  private ctx: CanvasRenderingContext2D;

  private moveOption: CharacterMove;

  private spriteOption: CharacterSprite;

  constructor(ctx: CanvasRenderingContext2D, move: CharacterMove) {
    this.ctx = ctx;
    this.moveOption = move;
    this.moveOption.direction = this.moveOption.direction || 'forward';

    const spriteImg = {
      forward: new Image(),
      back: new Image(),
    };

    spriteImg.forward.src = forward;
    spriteImg.back.src = back;

    this.spriteOption = {
      img: spriteImg,
      frameIndex: 0,
      tickCount: 0,
      ticksPerFrame: 1,
      numberOfFrames: 8,
      frameWidth: 426,
      frameHeight: 272,
    };
  }

  public draw() {
    const { moveOption, spriteOption, ctx } = this;

    ctx.beginPath();
    ctx.drawImage(
      spriteOption.img[moveOption.direction as AllowDirection],
      0,
      spriteOption.frameIndex * spriteOption.frameHeight,
      spriteOption.frameWidth,
      spriteOption.frameHeight,
      moveOption.x,
      moveOption.y,
      spriteOption.frameWidth,
      spriteOption.frameHeight,
    );
    ctx.closePath();
  }

  private updateSprite() {
    const { spriteOption } = this;

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

  public update(dt: number) {
    const { moveOption, spriteOption, ctx } = this;

    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;

    if (moveOption.x + spriteOption.frameWidth >= width
      || moveOption.x - spriteOption.frameWidth <= 0) {
      moveOption.vX = -moveOption.vX;
      this.turnAround();
    }
    if (moveOption.y + spriteOption.frameHeight >= height
      || moveOption.y - spriteOption.frameHeight <= 0) {
      moveOption.vY = -moveOption.vY;
    }

    moveOption.x = Math.floor(moveOption.x + moveOption.vX * dt);
    moveOption.y = Math.floor(moveOption.y + moveOption.vY * dt);

    this.updateSprite();
  }

  private updateVx(dt: number, k: number) {
    const { moveOption } = this;

    if (moveOption.vX < moveOption.vMax! && moveOption.vX >= 0) {
      moveOption.vX += k * moveOption.a! * dt;
    } else if (moveOption.vX > moveOption.vMax!) {
      moveOption.vX = moveOption.vMax!;
    } else {
      moveOption.vX = 0;
    }
  }

  private updateVy(dt: number, k: number) {
    const { moveOption } = this;

    if (moveOption.vY < moveOption.vMax! && moveOption.vY >= 0) {
      moveOption.vY += k * moveOption.a! * dt;
    } else if (moveOption.vY > moveOption.vMax!) {
      moveOption.vY = moveOption.vMax!;
    } else {
      moveOption.vY = 0;
    }
  }

  private run(dt: number, d: number) {
    const { moveOption, spriteOption, ctx } = this;

    const width = ctx.canvas.clientWidth;
    const x = Math.floor(moveOption.x + d * moveOption.vX * dt);
    if (x > 0 && x < width - spriteOption.frameWidth) {
      moveOption.x = x;
    }
  }

  private jump(dt: number, d: number) {
    const { moveOption, spriteOption, ctx } = this;

    const height = ctx.canvas.clientHeight;
    const y = Math.floor(moveOption.y + d * moveOption.vY * dt);
    if (y > 0 && y < height - spriteOption.frameHeight) {
      moveOption.y = y;
    }
  }

  private rotate(direction: AllowDirection) {
    this.moveOption.direction = direction;
  }

  private turnAround() {
    if (this.moveOption.direction === 'forward') {
      this.moveOption.direction = 'back';
    } else {
      this.moveOption.direction = 'forward';
    }
  }

  public move(dt: number, keys: Keys) {
    let aDirectionX = -1;
    if (keys.right || keys.left) {
      aDirectionX = 1;
    }
    this.updateVx(dt, aDirectionX);

    let vDirectionX = 0;
    if (keys.left) {
      vDirectionX = -1;
      this.rotate('back');
    } else if (keys.right) {
      vDirectionX = 1;
      this.rotate('forward');
    }
    if (vDirectionX) {
      this.run(dt, vDirectionX);
      this.updateSprite();
    }

    const aDirectionY = 1;
    this.updateVy(dt, aDirectionY);

    let vDirectionY = 2;
    if (keys.up) {
      vDirectionY = -1;
    }
    this.jump(dt, vDirectionY);
  }

  public collision(characters: Array<Character>) {
    characters.forEach((element) => {
      if (this !== element) {
        const dx = this.moveOption.x - element.moveOption.x;

        if (dx < this.spriteOption.frameWidth) {
          this.moveOption.vX = -this.moveOption.vX;
          this.turnAround();
        }
      }
    });
  }
}

export default Character;
