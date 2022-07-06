import { CharacterStateAbstract } from '@frontend/src/game/character/state/characterStateAbstract';
import { CharacterState } from '@frontend/src/game/types';

export class CharacterStateHurt extends CharacterStateAbstract {
  private isHurt: boolean = false;

  public state: CharacterState = CharacterState.HURT;

  handleInput(): CharacterStateAbstract | null {
    this.update();
    const spriteOption = this.characterVisual.spriteOption[this.state];
    if (spriteOption.frameIndex === spriteOption.numberOfFrames - 1) {
      this.isHurt = false;
    }
    if (this.isHurt) {
      return this;
    }
    return null;
  }

  enterState(_callback: Function): void {
    this.isHurt = true;
    super.enterState(_callback);
  }

  private update(): void {
    this.characterVisual.updateSprite(this.state);
    this.characterVisual.draw(this.state);
  }
}
