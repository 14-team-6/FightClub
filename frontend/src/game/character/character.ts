import { CharacterStateAbstract, handleInputOptions } from '@frontend/src/game/character/state/characterStateAbstract';
import { characterStateIdle } from '@frontend/src/game/character/state/characterStateIdle';
import { CharacterVisual } from '@frontend/src/game/character/characterVisual';
import { CharacterMove, CharacterState } from '@frontend/src/game/types';

export class Character {
  public readonly characterVisual: CharacterVisual;

  life: number;

  private stateStack: CharacterStateAbstract[] = [];

  constructor(ctx: CanvasRenderingContext2D, moveOption: CharacterMove) {
    this.characterVisual = new CharacterVisual(ctx, moveOption);
    this.stateStack.push(new characterStateIdle(this.characterVisual));
    this.stateStack[0].enterState(this.onEnterState.bind(this));
  }

  public get curState(): CharacterStateAbstract {
    const curState = this.stateStack.at(-1);
    if (curState === undefined) {
      throw Error('There is no initial state');
    }
    return curState;
  }

  protected onExitState(_fromState: CharacterState): void {
    // to overload
  };

  protected onEnterState(_fromState: CharacterState): void {
    // to overload
  }

  public update(props: Omit<handleInputOptions, 'life'>) {
    const { controls, dt, characters } = props;
    const hadSomethingOnStack = this.stateStack.length !== 1;
    const curState = this.stateStack.length === 1 ? this.stateStack[0] : this.stateStack.pop();
    if (curState === undefined) {
      throw Error('There is no initial state');
    }
    const newState = curState.handleInput({ controls, dt, characters, life: this.life });
    if (newState !== null) {
      if (newState !== curState) {
        curState.exitState(this.onExitState.bind(this));
        newState.enterState(this.onEnterState.bind(this));
      }
      this.stateStack.push(newState);
    } else {
      if (hadSomethingOnStack) {
        curState.exitState(this.onExitState.bind(this));
      }
    }
  }
}
