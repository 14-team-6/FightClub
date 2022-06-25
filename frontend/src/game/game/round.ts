import { Character } from '@frontend/src/game/character/character';
import { EndGame, EndGameType } from '@frontend/src/pages/game/endGame/endGame';

export enum RoundState {
  PREPARE = 'PREPARE',
  PREPARED = 'PREPARED',
  FIGHT = 'FIGHT',
  ENDING = 'ENDING',
  END = 'END',
}

type RoundProps = {
  roundName: string,
  hero: Character,
  enemy: Character,
  setUIElements: Function;
};

export class Round {
  public roundState: RoundState;

  private readonly hero: Character;

  private readonly enemy: Character;

  private readonly setUIElements: Function;

  public roundName: string;

  constructor(props: RoundProps) {
    const { roundName, hero, enemy, setUIElements } = props;
    this.roundState = RoundState.PREPARE;
    this.hero = hero;
    this.enemy = enemy;
    this.roundName = roundName;
    this.hero.init();
    this.enemy.init();
    this.setUIElements = setUIElements;
  }

  public get winner(): Character {
    if (this.hero.life <= 0 || this.enemy.life <= 0) {
      if (this.hero.life <= 0) {
        return this.enemy;
      } else {
        return this.hero;
      }
    }
    throw Error('Could not determine the winner');
  }

  public update(): void {
    switch (this.roundState) {
      case RoundState.PREPARE:
        this.roundState = RoundState.PREPARED;
        this.setUIElements(EndGame({ roundName: this.roundName, endGameType: EndGameType.FIGHT }));
        setTimeout(() => {
          this.roundState = RoundState.FIGHT;
          this.setUIElements(null);
          this.hero.isPaused = false;
          this.enemy.isPaused = false;
        }, 3000);
        break;
      case RoundState.FIGHT:
        if (this.hero.life <= 0 || this.enemy.life <= 0) {
          this.roundState = RoundState.ENDING;
          if (this.enemy.life <= 0) {
            this.setUIElements(EndGame({ endGameType: EndGameType.WIN }));
          } else {
            this.setUIElements(EndGame({ endGameType: EndGameType.LOOSE }));
          }
          setTimeout(() => {
            this.roundState = RoundState.END;
            //this.setUIElements(null);
          }, 3000);
        }
        break;
      default:
    }
  }
}
