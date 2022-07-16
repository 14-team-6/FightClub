import { Character } from '@frontend/src/game/character/character';
import { CharacterState, Directions } from '@frontend/src/game/types';
import store from '@frontend/src/store/store';
import { setMyLifePercent } from '@frontend/src/actionCreators/gameState/creators';
import Sounds from '@frontend/src/game/components/sounds/sounds';
import { ATTACK_LEVEL_ENEMY, LIFE_LEVEL_HERO } from '@frontend/consts/game';
import { KeyboardControl, keyboardLayoutAWD } from '@frontend/src/game/components/controls/keyboard';

export class CharacterHero extends Character {
  constructor(ctx: CanvasRenderingContext2D) {
    const size = { width: window.innerWidth, height: window.innerHeight };
    const move = {
      x: Math.floor(size.width * 0.1),
      y: Math.floor(size.height - 271),
      vX: 0,
      vY: 0,
      vMax: 0.7,
      a: 0.001,
      direction: Directions.RIGHT,
    };
    super(ctx, move);
  }

  public init(): void {
    this.inputControl = new KeyboardControl(keyboardLayoutAWD);
    super.init();
    this.life = LIFE_LEVEL_HERO;
    store.dispatch(setMyLifePercent(this.life));
  }

  protected onExitState(_fromState: CharacterState) {
    if (_fromState === CharacterState.HURT) {
      this.life -= Math.random() * ATTACK_LEVEL_ENEMY;
      store.dispatch(setMyLifePercent(this.life));
    }
  }

  protected onEnterState(_fromState: CharacterState) {
    switch (_fromState) {
      case CharacterState.ATTACK:
        Sounds.playAttack();
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
