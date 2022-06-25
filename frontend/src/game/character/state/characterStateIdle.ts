import { CharacterStateAbstract, HandleInputOptions } from '@frontend/src/game/character/state/characterStateAbstract';
import { CharacterStateMove } from '@frontend/src/game/character/state/characterStateMove';
import { CharacterState } from '@frontend/src/game/types';
import { CharacterStateAttack } from '@frontend/src/game/character/state/characterStateAttack';
import { CharacterStateHurt } from '@frontend/src/game/character/state/characterStateHurt';
import { CharacterStateJump } from '@frontend/src/game/character/state/characterStateJump';
import { CharacterStateDie } from '@frontend/src/game/character/state/characterStateDie';

export class CharacterStateIdle extends CharacterStateAbstract {
  public state: CharacterState = CharacterState.IDLE;

  public handleInput(props:HandleInputOptions): CharacterStateAbstract | null {
    const { controls, characters, life } = props;
    this.update();
    if (life < 0) {
      return new CharacterStateDie(this.characterVisual);
    }
    if (controls.up) {
      return new CharacterStateJump(this.characterVisual);
    }
    if (controls.left || controls.right) {
      return new CharacterStateMove(this.characterVisual);
    }
    if (controls.attack) {
      return new CharacterStateAttack(this.characterVisual);
    }
    const isCollision = this.collision(characters);
    if (isCollision) {
      return new CharacterStateHurt(this.characterVisual);
    }
    return null;
  }

  private update(): void {
    this.characterVisual.updateSprite(this.state);
    this.characterVisual.draw(this.state);
  }
}
