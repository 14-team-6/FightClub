import { Controls } from '@frontend/src/game/components/controls/controls';
import { Character } from '@frontend/src/game/character/character';
import { CharacterVisual } from '@frontend/src/game/character/characterVisual';
import { CharacterState } from '@frontend/src/game/types';

export type HandleInputOptions = {
  controls: Controls,
  dt: number,
  characters: Record<string, Character>,
  life: number,
};

export abstract class CharacterStateAbstract {
  public readonly characterVisual: CharacterVisual;

  public readonly state: CharacterState;

  constructor(character: CharacterVisual) {
    this.characterVisual = character;
  }

  public abstract handleInput(props: HandleInputOptions): CharacterStateAbstract | null;

  public enterState(_callback: Function): void {
    this.characterVisual.spriteOption[this.state].frameIndex = 0;
    _callback(this.state);
  }

  public exitState(_callback: Function): void {
    _callback(this.state);
  }

  protected collision(characters: Record<string, Character>): boolean {
    const iAm = this.characterVisual;
    let res = false;
    for (const [, element] of Object.entries(characters)) {
      const heIs = element.curState.characterVisual;
      if (iAm !== heIs) {
        if (element.curState.state === CharacterState.ATTACK) {
          const iAmRect = iAm.getCollisionRect(this.state);
          const heIsRect = heIs.getCollisionRect(element.curState.state);

          const x1 = Math.max(iAmRect.x, heIsRect.x);
          const x2 = Math.min(iAmRect.x + iAmRect.width, heIsRect.x + heIsRect.width);

          const y1 = Math.max(iAmRect.y, heIsRect.y);
          const y2 = Math.min(iAmRect.y + iAmRect.height, heIsRect.y + heIsRect.height);

          if (x1 < x2 && y1 < y2) {
            res = true;
          }
        }
      }
    }
    return res;
  }
}
