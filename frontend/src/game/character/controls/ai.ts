import { Controls } from '@frontend/src/game/character/controls/controls';
import { Character } from '@frontend/src/game/character/character';

export class AI {
  update(characters: Record<string, Character>): Controls {
    const hero = characters.hero;
    const enemy = characters.enemy;

    const res = {
      up: false,
      left: false,
      right: false,
      attack: false,
    };

    if (hero === undefined || enemy === undefined) {
      throw Error('Characters not defined');
    }

    if (hero.life > 0) {
      res.attack = Math.random() * 10 > 9;
    }

    const heroRect = hero.characterVisual.getCollisionRect(hero.curState.state);
    const enemyRect = enemy.characterVisual.getCollisionRect(hero.curState.state);

    if (Math.abs(enemyRect.x - heroRect.x) > 150) {
      if (enemyRect.x < heroRect.x) {
        res.right = true;
      } else {
        res.left = true;
      }
    }

    return res;
  }
}
