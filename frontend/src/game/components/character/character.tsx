import { KeyboardControl, Keys } from '../../keyboard';
import {
  CharacterMove,
  CharacterSprite,
  CharacterState,
  Controls,
  Directions,
  JumpPhase,
  Rect
} from '@frontend/src/game/types';
import spriteCollection from '@frontend/src/game/spriteCollection';
import Sounds from '@frontend/src/game/components/sounds/sounds';
import { store, updateEnemyLifePercent, updateMyLifePercent } from '@frontend/src/game/store/store';

class Character {
  private ctx: CanvasRenderingContext2D;

  private control: Controls;

  private moveOption: CharacterMove;

  private spriteOption: Record<string, CharacterSprite>;

  private currentState: CharacterState;

  private prevState: CharacterState;

  private isJump: boolean;

  private jumpPhase: JumpPhase;

  private isHurt: boolean;

  private isAttack: boolean;

  private isMove: boolean;

  private life: number;

  private isDied: boolean;

  constructor(ctx: CanvasRenderingContext2D, move: CharacterMove, control: Controls = 'ai') {
    this.ctx = ctx;
    this.moveOption = move;
    this.moveOption.direction = this.moveOption.direction || Directions.RIGHT;
    this.control = control;
    this.spriteOption = spriteCollection();
    this.currentState = CharacterState.IDLE;
    this.prevState = this.currentState;
    this.life = 100;
    this.isDied = false;
  }

  private updateState(keys: Keys) {
    let nextState = this.currentState;

    if (this.isJump || this.isHurt || this.isAttack || this.isDied) {
      return;
    }

    if (keys.up) {
      nextState = CharacterState.JUMP;
      Sounds.playJump();
      this.isJump = true;
      this.jumpPhase = JumpPhase.FIRST;
      this.moveOption.vY = 0.7;
    } else if (keys.attack && !this.isAttack) {
      Sounds.playAttack();
      nextState = CharacterState.ATTACK;
      this.isAttack = true;
    } else if (keys.left) {
      nextState = CharacterState.RUN;
      this.isMove = true;
    } else if (keys.right) {
      nextState = CharacterState.RUN;
      this.isMove = true;
    } else {
      nextState = CharacterState.IDLE;
      this.moveOption.vX = 0;
    }
    if (nextState != this.prevState) {
      this.spriteOption[nextState].frameIndex = 0;
    }
    this.prevState = this.currentState;
    this.currentState = nextState;
  }

  private getCollisionRect(): Rect {
    const spriteOption = this.spriteOption[this.currentState];
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

  public draw() {
    const { moveOption, ctx } = this;

    const spriteOption = this.spriteOption[this.currentState];

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
    //ctx.strokeStyle = 'blue';
    // const crt = this.getCollisionRect();
    // ctx.strokeRect(
    //   crt.x,
    //   crt.y,
    //   crt.width,
    //   crt.height,
    // );
    ctx.closePath();
  }

  public update(dt: number) {
    if (this.life <= 0) {
      this.prevState = this.currentState;
      this.currentState = CharacterState.DIE;
      this.isDied = true;
      this._updateSprite();
    }
    if (this.control === 'ai') {
      this._update(dt);
    } else {
      this._move(dt);
    }
  }

  private _updateSprite() {
    const spriteOption = this.spriteOption[this.currentState];

    spriteOption.tickCount += 1;

    if (spriteOption.tickCount > spriteOption.ticksPerFrame) {
      spriteOption.tickCount = 0;
      if (spriteOption.frameIndex < spriteOption.numberOfFrames - 1) {
        spriteOption.frameIndex += 1;
      } else {
        if (!this.isDied) {
          spriteOption.frameIndex = 0;
          if (this.isHurt) {
            this.isHurt = false;
          }
          if (this.isAttack) {
            this.isAttack = false;
          }
        }
      }
    }
  }

  private turnAround() {
    if (this.isDied) {
      return;
    }
    if (this.moveOption.direction === Directions.RIGHT) {
      this.moveOption.direction = Directions.LEFT;
    } else {
      this.moveOption.direction = Directions.RIGHT;
    }
  }

  private _update(dt: number) {
    const { moveOption, ctx } = this;

    if (this.isDied) {
      return;
    }

    if (!this.isHurt && !this.isAttack) {
      this.currentState = CharacterState.IDLE;
    }

    const spriteOption = this.spriteOption[this.currentState];

    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;

    if (Math.random()*100 > 99) {
      this.currentState = CharacterState.ATTACK;
      Sounds.playEnemyAttack();
      this.isAttack = true;
    }

    if (moveOption.x + spriteOption.frameWidth >= width
      || moveOption.x - spriteOption.frameWidth <= 0) {
      moveOption.vX = -moveOption.vX;
      this.turnAround();
    }
    if (moveOption.y + spriteOption.frameHeight >= height
      || moveOption.y - spriteOption.frameHeight <= 0) {
      moveOption.vY = -moveOption.vY;
    }

    moveOption.y = Math.floor(moveOption.y + moveOption.vY * dt);

    this._updateSprite();
  }

  private _updateVx(dt: number, k: number) {
    const { moveOption } = this;

    if (moveOption.vX < moveOption.vMax! && moveOption.vX >= 0) {
      moveOption.vX += k * moveOption.a! * dt;
    } else if (moveOption.vX >= moveOption.vMax!) {
      moveOption.vX = moveOption.vMax!;
    } else {
      moveOption.vX = 0;
    }
  }

  private _run(dt: number, d: number) {
    if (this.isDied) {
      return;
    }
    const {moveOption, ctx} = this;
    const spriteOption = this.spriteOption[this.currentState];
    const cr = this.getCollisionRect();
    const width = ctx.canvas.clientWidth;
    if (this.moveOption.direction === Directions.RIGHT) {
      const x = Math.min(width - cr.width, Math.floor(moveOption.x + d * moveOption.vX * dt));
      if (cr.x <= width - cr.width) {
        moveOption.x = x;
      }
    } else {
      const x = Math.max( -1 * spriteOption.collisionRectX , Math.floor(moveOption.x + d * moveOption.vX * dt));
      if (cr.x >= 0) {
        moveOption.x = x;
      }
    }
  }

  private _jump(dt: number, d: number) {
    const { moveOption, ctx } = this;

    const spriteOption = this.spriteOption[this.currentState];

    const height = ctx.canvas.clientHeight;
    const y = Math.floor(moveOption.y + d * moveOption.vY * dt);

    // bounds are inverted!
    // so the lower bound is around the bottom of the screen
    const lowerBound = height - spriteOption.frameHeight;

    // to avoid roundness problem - when the cat jumps
    // almost down to the lower bound, but not reach 3 pixels
    const whenEndJump = lowerBound - 20;

    if (this.jumpPhase === JumpPhase.FIRST) {
      moveOption.vY -= 0.017;
    } else {
      moveOption.vY += 0.017;
    }

    if (y < lowerBound) {
      moveOption.y = y;
    }

    if ( moveOption.vY <= 0 ) {
      this.jumpPhase = JumpPhase.SECOND;
    }

    if (y >= whenEndJump && this.jumpPhase === JumpPhase.SECOND) {
      this.moveOption.y = lowerBound;
      this.jumpPhase = JumpPhase.NOJUMP;
      this.isJump = false;
      this.prevState = this.currentState;
      this.currentState = CharacterState.IDLE;
    }
  }

  private _rotate(direction: Directions) {
    if (this.isDied) {
      return;
    }
    this.moveOption.direction = direction;
  }

  private _move(dt: number) {
    const keyboard = this.control as KeyboardControl;

    this.updateState(keyboard.keys);

    let aDirectionX = -1;
    if (keyboard.keys.right || keyboard.keys.left || this.isMove) {
      aDirectionX = 1;
    }
    this._updateVx(dt, aDirectionX);

    let vDirectionX = 0;
    if (keyboard.keys.left) {
      vDirectionX = -1;
      this._rotate(Directions.LEFT);
    } else if (keyboard.keys.right) {
      vDirectionX = 1;
      this._rotate(Directions.RIGHT);
    }
    if (vDirectionX) {
      this._run(dt, vDirectionX);
    }
    if (this.isJump) {
      let vDirectionY = 2;
      if (this.jumpPhase === JumpPhase.FIRST) {
        vDirectionY = -1;
      }
      this._jump(dt, vDirectionY);
    }
    this._updateSprite();
  }

  // TODO: there is a bug now: no attack priority. Each cat can attack simultaneously
  public collision(characters: Array<Character>) {
    characters.forEach((element) => {
      if (this !== element) {
        const iam = this.getCollisionRect();
        const they = element.getCollisionRect();

        const x1 = Math.max(iam.x, they.x);
        const x2 = Math.min(iam.x + iam.width, they.x + they.width);

        const y1 = Math.max(iam.y, they.y);
        const y2 = Math.min(iam.y + iam.height, they.y + they.height);

        if (x1 < x2 && y1 < y2) {
          if (element.currentState === CharacterState.ATTACK && !this.isHurt && !this.isAttack) {
            this.kick();
          }
        }
      }
    });
  }

  private kick() {
    const nextState = CharacterState.HURT;
    this.spriteOption[nextState].frameIndex = 0;
    this.prevState = this.currentState;
    this.currentState = nextState;
    this.isHurt = true;
    this.life -= Math.random() * 10;
    if (this.life <= 0) {
      Sounds.playDead();
    } else {
      Sounds.playMeow();
    }
    if (this.control === 'ai') {
      store.dispatch(updateEnemyLifePercent({ type: 'lifeBar', payload: this.life }));
    } else {
      store.dispatch(updateMyLifePercent({ type: 'lifeBar', payload: this.life }));
    }
  }
}

export default Character;
