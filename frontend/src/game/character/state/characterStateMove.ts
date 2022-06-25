import { CharacterStateAbstract, handleInputOptions } from '@frontend/src/game/character/state/characterStateAbstract';
import { CharacterState, Directions } from '@frontend/src/game/types';
import { Controls } from '@frontend/src/game/character/controls/controls';
import { CharacterStateHurt } from '@frontend/src/game/character/state/characterStateHurt';
import { CharacterStateJump } from '@frontend/src/game/character/state/characterStateJump';

export class CharacterStateMove extends CharacterStateAbstract {
  public readonly state: CharacterState = CharacterState.RUN;

  public handleInput(props: handleInputOptions): CharacterStateAbstract | null {
    const { controls, dt, characters } = props;
    this.update(controls, dt);
    if (controls.right || controls.left ) {
      if (controls.up) {
        return new CharacterStateJump(this.characterVisual);
      }

      const isCollision = this.collision(characters);
      if (isCollision) {
        return new CharacterStateHurt(this.characterVisual);
      }
      return this;
    }
    return null;
  }

  public enterState(_callback: Function): void {
    this.characterVisual.moveOption.vX = 0;
    super.enterState(_callback);
  }

  protected update(controls: Controls, dt: number): void {
    this.move(controls, dt);
    this.characterVisual.updateSprite(this.state);
    this.characterVisual.draw(this.state);
  }

  private updateVx(dt: number, direction: number) {
    const { moveOption } = this.characterVisual;

    if (moveOption.vX < moveOption.vMax! && moveOption.vX >= 0) {
      moveOption.vX += direction * moveOption.a! * dt;
    } else if (moveOption.vX >= moveOption.vMax!) {
      moveOption.vX = moveOption.vMax!;
    } else {
      moveOption.vX = 0;
    }
  }

  public move(controls: Controls, dt: number) {
    const { moveOption, spriteOption, ctx } = this.characterVisual;

    if (controls.left) {
      moveOption.direction = Directions.LEFT;
    } else if (controls.right) {
      moveOption.direction = Directions.RIGHT;
    }

    const direction = moveOption.direction === Directions.RIGHT ? 1 : -1;

    this.updateVx(dt, 1);

    const cr = this.characterVisual.getCollisionRect(this.state);
    const width = ctx.canvas.clientWidth;
    if (moveOption.direction === Directions.RIGHT) {
      const x = Math.min(width - cr.width, Math.floor(moveOption.x + direction * moveOption.vX * dt));
      if (cr.x <= width - cr.width) {
        moveOption.x = x;
      }
    } else {
      const x = Math.max( -1 * spriteOption[this.state].collisionRectX , Math.floor(moveOption.x + direction * moveOption.vX * dt));
      if (cr.x >= 0) {
        moveOption.x = x;
      }
    }
  }
}
