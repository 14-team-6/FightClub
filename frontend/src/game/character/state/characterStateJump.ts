import { CharacterStateAbstract, HandleInputOptions } from '@frontend/src/game/character/state/characterStateAbstract';
import { CharacterState } from '@frontend/src/game/types';
import { Controls } from '@frontend/src/game/character/controls/controls';
import { CharacterStateMove } from '@frontend/src/game/character/state/characterStateMove';

enum JumpPhase {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  NOJUMP = 'NOJUMP',
}

export class CharacterStateJump extends CharacterStateAbstract {
  public state = CharacterState.JUMP;

  private jumpPhase: JumpPhase;

  handleInput(props: HandleInputOptions): CharacterStateAbstract | null {
    const { controls, dt } = props;
    this.update(controls, dt);
    if (this.jumpPhase !== JumpPhase.NOJUMP) {
      return this;
    }
    return null;
  }

  enterState(_callback: Function) {
    this.jumpPhase = JumpPhase.FIRST;
    this.characterVisual.moveOption.vY = 0.7;
    super.enterState(_callback);
  }

  protected update(controls: Controls, dt: number) {
    this.jump(dt);
    if (controls.right || controls.left) {
      const characterMove = new CharacterStateMove(this.characterVisual);
      characterMove.move(controls, dt);
    }
    this.characterVisual.updateSprite(this.state);
    this.characterVisual.draw(this.state);
  }

  private jump(dt: number) {
    const { moveOption, ctx } = this.characterVisual;

    const spriteOption = this.characterVisual.spriteOption[this.state];

    const direction = this.jumpPhase === JumpPhase.FIRST ? -1 : 2;

    const height = ctx.canvas.clientHeight;
    const y = Math.floor(moveOption.y + direction * moveOption.vY * dt);

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

    if (moveOption.vY <= 0) {
      this.jumpPhase = JumpPhase.SECOND;
    }

    if (y >= whenEndJump && this.jumpPhase === JumpPhase.SECOND) {
      moveOption.y = lowerBound;
      this.jumpPhase = JumpPhase.NOJUMP;
    }
  }
}
