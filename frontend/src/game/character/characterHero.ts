import { Character } from '@frontend/src/game/character/character';
import { CharacterState, Directions } from '@frontend/src/game/types';
import { store, updateMyLifePercent } from '@frontend/src/game/store/store';
import Sounds from '@frontend/src/game/components/sounds/sounds';

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
    this.life = 100;
  }

  protected onExitState(_fromState: CharacterState) {
    if (_fromState === CharacterState.HURT) {
      this.life -= Math.random()*10;
      store.dispatch(updateMyLifePercent({ type: 'lifeBar', payload: this.life }));
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
