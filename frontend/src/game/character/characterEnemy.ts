import { Character } from '@frontend/src/game/character/character';
import { CharacterState, Directions } from '@frontend/src/game/types';
import { HandleInputOptions } from '@frontend/src/game/character/state/characterStateAbstract';
import { AI } from '@frontend/src/game/components/controls/ai';
import store from '@frontend/src/store/store';
import { setEnemyLifePercent } from '@frontend/src/reducers/gameState';
import Sounds from '@frontend/src/game/components/sounds/sounds';
import { ATTACK_LEVEL_HERO, LIFE_LEVEL_ENEMY } from '@frontend/consts/game';

export class CharacterEnemy extends Character {
  private ai: AI;

  constructor(ctx: CanvasRenderingContext2D) {
    const size = { width: window.innerWidth, height: window.innerHeight };
    const move = {
      x: Math.floor(size.width - size.width * 0.5),
      y: Math.floor(size.height - 271),
      vX: 0,
      vY: 0,
      vMax: 0.4,
      a: 0.001,
      direction: Directions.LEFT,
    };
    super(ctx, move);
    this.ai = new AI();
  }

  public init(): void {
    super.init();
    this.life = LIFE_LEVEL_ENEMY;
    store.dispatch(setEnemyLifePercent(this.life));
  }

  public update(props: HandleInputOptions): void {
    const { dt, characters } = props;
    const controls = this.ai.update(characters);
    super.update({ controls, dt, characters });
  }

  protected onExitState(_fromState: CharacterState): void {
    if (_fromState === CharacterState.HURT) {
      this.life -= Math.random() * ATTACK_LEVEL_HERO;
      store.dispatch(setEnemyLifePercent(this.life));
    }
  }

  protected onEnterState(_fromState: CharacterState): void {
    switch (_fromState) {
      case CharacterState.ATTACK:
        Sounds.playEnemyAttack();
        break;
      case CharacterState.DIE:
        Sounds.playDead();
        break;
      case CharacterState.HURT:
        Sounds.playMeow();
        break;
      case CharacterState.JUMP:
        Sounds.playJump();
        break;
      default:
    }
  }
}
