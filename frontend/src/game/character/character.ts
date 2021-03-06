import { CharacterStateAbstract } from '@frontend/src/game/character/state/characterStateAbstract';
import { CharacterStateIdle } from '@frontend/src/game/character/state/characterStateIdle';
import { CharacterVisual } from '@frontend/src/game/character/characterVisual';
import { CharacterMove, CharacterState } from '@frontend/src/game/types';
import { InputControls } from '@frontend/src/game/components/controls/controls';

export type CharacterUpdateProps = {
  dt: number,
  characters: Record<string, Character>,
};

export class Character {
  public characterVisual: CharacterVisual;

  public life: number;

  private stateStack: CharacterStateAbstract[] = [];

  private readonly ctx: CanvasRenderingContext2D;

  private readonly storedMoveOption: CharacterMove;

  protected inputControl: InputControls;

  public isPaused = false;

  constructor(ctx: CanvasRenderingContext2D, moveOption: CharacterMove) {
    this.ctx = ctx;
    this.storedMoveOption = moveOption;
    this.characterVisual = new CharacterVisual(this.ctx, { ...this.storedMoveOption });
    this.init();
  }

  public init(): void {
    if (this.inputControl === undefined) {
      throw Error('Must initialize controls in child classes');
    }
    this.isPaused = true;
    this.inputControl.start();
    this.characterVisual.moveOption = { ...this.storedMoveOption };
    this.stateStack = [];
    this.stateStack.push(new CharacterStateIdle(this.characterVisual));
    this.stateStack[0].enterState(this.onEnterState.bind(this));
  }

  public beforeDestroy() {
    this.inputControl.stop();
  }

  public get curState(): CharacterStateAbstract {
    const curState = this.stateStack.at(-1);
    if (curState === undefined) {
      throw Error('There is no initial state');
    }
    return curState;
  }

  /* eslint-disable */
  // have to disable to avoid no-unused-vars error
  protected onExitState(_fromState: CharacterState): void {
    // to overload
  }

  protected onEnterState(_fromState: CharacterState): void {
    // to overload
  }
  /* eslint-enable */

  public update(props: CharacterUpdateProps): void {
    const { dt, characters } = props;
    let controls = this.inputControl.keys;
    if (this.isPaused) {
      controls = {
        up: false,
        left: false,
        right: false,
        attack: false,
        pause: false,
      };
    }
    const hadSomethingOnStack = this.stateStack.length !== 1;
    const curState = this.stateStack.length === 1 ? this.stateStack[0] : this.stateStack.pop();
    if (curState === undefined) {
      throw Error('There is no initial state');
    }
    const newState = curState.handleInput({
      controls,
      dt,
      characters,
      life: this.life,
    });
    if (newState !== null) {
      if (newState !== curState) {
        curState.exitState(this.onExitState.bind(this));
        newState.enterState(this.onEnterState.bind(this));
      }
      this.stateStack.push(newState);
    } else if (hadSomethingOnStack) {
      curState.exitState(this.onExitState.bind(this));
    }
  }
}
