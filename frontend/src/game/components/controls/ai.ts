import { Controls, InputControls } from '@frontend/src/game/components/controls/controls';
import { Character } from '@frontend/src/game/character/character';
import { ENEMY_ATTACK_PROBABILITY } from '@frontend/consts/game';

export class AI extends InputControls {
  public keys: Controls;

  public start() {
    this.keys = {
      up: false,
      left: false,
      right: false,
      attack: false,
      pause: false,
    };
  }

  public stop() {}

  update(characters: Record<string, Character>) {
    const { hero, enemy } = characters;

    const res = {
      up: false,
      left: false,
      right: false,
      attack: false,
      pause: false,
    };

    if (hero === undefined || enemy === undefined) {
      throw Error('Characters not defined');
    }

    if (hero.life > 0) {
      res.attack = Math.random() * 100 > ENEMY_ATTACK_PROBABILITY;
    }

    const heroRect = hero.characterVisual.getCollisionRect(hero.curState.state);
    const enemyRect = enemy.characterVisual.getCollisionRect(enemy.curState.state);

    if (Math.abs(enemyRect.x - heroRect.x) > 150) {
      if (enemyRect.x < heroRect.x) {
        res.right = true;
      } else {
        res.left = true;
      }
    }

    this.keys = res;
  }
}
