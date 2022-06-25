import { Character } from '@frontend/src/game/character/character';
import { StartGame } from '@frontend/src/pages/game/startGame/startGame';
import { EndRound } from '@frontend/src/pages/game/endRound/endRound';
import { EndGameType } from '@frontend/src/pages/game/endGame/endGame';
import { RoundState } from '@frontend/src/game/types';

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
    const {
      roundName,
      hero,
      enemy,
      setUIElements,
    } = props;
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
      }
      return this.hero;
    }
    throw Error('Could not determine the winner');
  }

  public update(): void {
    switch (this.roundState) {
      case RoundState.PREPARE:
        this.roundState = RoundState.PREPARED;
        this.setUIElements(StartGame({ roundName: this.roundName }));
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
            this.setUIElements(EndRound({ endGameType: EndGameType.WIN }));
          } else {
            this.setUIElements(EndRound({ endGameType: EndGameType.LOOSE }));
          }
          setTimeout(() => {
            this.roundState = RoundState.END;
          }, 3000);
        }
        break;
      default:
    }
  }
}
