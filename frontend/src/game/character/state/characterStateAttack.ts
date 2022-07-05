import { CharacterStateAbstract } from '@frontend/src/game/character/state/characterStateAbstract';
import { CharacterState } from '@frontend/src/game/types';

export class CharacterStateAttack extends CharacterStateAbstract {
  private isAttack: boolean = false;

  public state: CharacterState = CharacterState.ATTACK;

  public handleInput(): CharacterStateAbstract | null {
    this.update();
    const spriteOption = this.characterVisual.spriteOption[this.state];
    if (spriteOption.frameIndex === spriteOption.numberOfFrames - 1) {
      this.isAttack = false;
    }
    if (this.isAttack) {
      return this;
    }
    return null;
  }

  public enterState(_callback: Function) {
    this.isAttack = true;
    super.enterState(_callback);
  }

  private update(): void {
    this.characterVisual.updateSprite(this.state);
    this.characterVisual.draw(this.state);
  }
}
