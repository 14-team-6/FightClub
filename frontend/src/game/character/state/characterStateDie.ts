import { CharacterStateAbstract } from '@frontend/src/game/character/state/characterStateAbstract';
import { CharacterState } from '@frontend/src/game/types';

export class CharacterStateDie extends CharacterStateAbstract {
  public state: CharacterState = CharacterState.DIE;

  handleInput(): CharacterStateAbstract | null {
    this.update();
    return this;
  }

  private update(): void {
    const spriteOption = this.characterVisual.spriteOption[this.state];
    if (spriteOption.frameIndex === spriteOption.numberOfFrames - 1) {
      this.characterVisual.draw(this.state);
      return;
    }
    this.characterVisual.updateSprite(this.state);
    this.characterVisual.draw(this.state);
  }
}
