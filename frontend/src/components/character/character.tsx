import { KeyboardControl } from '../../game/keyboard';
import forwardSprite from '../../../public/img/forward.png';
import backSprite from '../../../public/img/back.png';

export enum Directions {
  forward = 'forward',
  back = 'back',
}

type SpriteMap = Record<Directions, HTMLImageElement>;

export type Controls = KeyboardControl | 'ai';
interface CharacterMove {
  x: number;
  y: number;
  vX: number;
  vY: number;
  vMax?: number;
  a?: number;
  direction?: Directions;
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

  private control: Controls;

  private moveOption: CharacterMove;

  private spriteOption: CharacterSprite;

  constructor(ctx: CanvasRenderingContext2D, move: CharacterMove, control: Controls = 'ai') {
    this.ctx = ctx;
    this.moveOption = move;
    this.moveOption.direction = this.moveOption.direction || Directions.forward;
    this.control = control;

    const spriteImg = {
      forward: new Image(),
      back: new Image(),
    };

    spriteImg.forward.src = forwardSprite;
    spriteImg.back.src = backSprite;

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
    ctx.closePath();
  }

  public update(dt: number) {
    if (this.control === 'ai') {
      this._update(dt);
    } else {
      this._move(dt);
    }
  }

  private _updateSprite() {
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

  public _update(dt: number) {
    const { moveOption, spriteOption, ctx } = this;

    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;

    if (moveOption.x + spriteOption.frameWidth >= width
      || moveOption.x - spriteOption.frameWidth <= 0) {
      moveOption.vX = -moveOption.vX;
      this._turnAround();
    }
    if (moveOption.y + spriteOption.frameHeight >= height
      || moveOption.y - spriteOption.frameHeight <= 0) {
      moveOption.vY = -moveOption.vY;
    }

    moveOption.x = Math.floor(moveOption.x + moveOption.vX * dt);
    moveOption.y = Math.floor(moveOption.y + moveOption.vY * dt);

    this._updateSprite();
  }

  private _updateVx(dt: number, k: number) {
    const { moveOption } = this;

    if (moveOption.vX < moveOption.vMax! && moveOption.vX >= 0) {
      moveOption.vX += k * moveOption.a! * dt;
    } else if (moveOption.vX > moveOption.vMax!) {
      moveOption.vX = moveOption.vMax!;
    } else {
      moveOption.vX = 0;
    }
  }

  private _updateVy(dt: number, k: number) {
    const { moveOption } = this;

    if (moveOption.vY < moveOption.vMax! && moveOption.vY >= 0) {
      moveOption.vY += k * moveOption.a! * dt;
    } else if (moveOption.vY > moveOption.vMax!) {
      moveOption.vY = moveOption.vMax!;
    } else {
      moveOption.vY = 0;
    }
  }

  private _run(dt: number, d: number) {
    const { moveOption, spriteOption, ctx } = this;

    const width = ctx.canvas.clientWidth;
    const x = Math.floor(moveOption.x + d * moveOption.vX * dt);
    if (x > 0 && x < width - spriteOption.frameWidth) {
      moveOption.x = x;
    }
  }

  private _jump(dt: number, d: number) {
    const { moveOption, spriteOption, ctx } = this;

    const height = ctx.canvas.clientHeight;
    const y = Math.floor(moveOption.y + d * moveOption.vY * dt);
    if (y > 0 && y < height - spriteOption.frameHeight) {
      moveOption.y = y;
    }
  }

  private _rotate(direction: Directions) {
    this.moveOption.direction = direction;
  }

  private _turnAround() {
    if (this.moveOption.direction === Directions.forward) {
      this.moveOption.direction = Directions.back;
    } else {
      this.moveOption.direction = Directions.forward;
    }
  }

  public _move(dt: number) {
    const keyboard = this.control as KeyboardControl;

    let aDirectionX = -1;
    if (keyboard.keys.right || keyboard.keys.left) {
      aDirectionX = 1;
    }
    this._updateVx(dt, aDirectionX);

    let vDirectionX = 0;
    if (keyboard.keys.left) {
      vDirectionX = -1;
      this._rotate(Directions.back);
    } else if (keyboard.keys.right) {
      vDirectionX = 1;
      this._rotate(Directions.forward);
    }
    if (vDirectionX) {
      this._run(dt, vDirectionX);
      this._updateSprite();
    }

    const aDirectionY = 1;
    this._updateVy(dt, aDirectionY);

    let vDirectionY = 2;
    if (keyboard.keys.up) {
      vDirectionY = -1;
    }
    this._jump(dt, vDirectionY);
  }

  public collision(characters: Array<Character>) {
    characters.forEach((element) => {
      if (this !== element) {
        const dx = this.moveOption.x - element.moveOption.x;

        if (dx < this.spriteOption.frameWidth) {
          this.moveOption.vX = -this.moveOption.vX;
          this._turnAround();
        }
      }
    });
  }
}

export default Character;
