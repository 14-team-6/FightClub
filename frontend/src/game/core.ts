import { Character } from '@frontend/src/game/character/character';
import { Round, RoundState } from '@frontend/src/game/game/round';
import { HandleInputOptions } from '@frontend/src/game/character/state/characterStateAbstract';
import { Controls } from '@frontend/src/game/character/controls/controls';
import { CharacterHero } from '@frontend/src/game/character/characterHero';
import { CharacterEnemy } from '@frontend/src/game/character/characterEnemy';
import { store, updateRoundName } from '@frontend/src/game/store/store';

enum GameState {
  ROUND_1 = 'ROUND 1',
  ROUND_2 = 'ROUND 2',
  ROUND_3 = 'ROUND 3',
  FINISHED = 'FINISHED',
  PAUSED = 'PAUSED',
}

type GameUpdateProps = {
  controls: Controls,
  dt: number,
};

export class Game {
  public hero: Character;

  public enemy: Character;

  private currentRound: Round;

  private currentWinner: Character;

  private readonly setUIElements: Function;

  private gameState: GameState;

  constructor(ctx: CanvasRenderingContext2D, setUIElements: Function) {
    this.gameState = GameState.ROUND_1;
    this.setUIElements = setUIElements;
    this.hero = new CharacterHero(ctx);
    this.enemy = new CharacterEnemy(ctx);
    this.currentRound = new Round({
      roundName: 'ROUND 1',
      hero: this.hero,
      enemy: this.enemy,
      setUIElements: this.setUIElements,
    });
    store.dispatch(updateRoundName({ type: 'lifeBar', payload: 'ROUND 1' }));
  }

  private updateCharacters(props: Omit<HandleInputOptions, 'life'>): void {
    this.hero.update(props);
    this.enemy.update(props);
  }

  public update(props: GameUpdateProps): void {
    const characterProps = {
      ...props, characters: { hero: this.hero, enemy: this.enemy },
    };

    this.currentRound.update();

    switch (this.gameState) {
      case GameState.PAUSED:
        this.setUIElements('PAUSED');
        break;
      case GameState.ROUND_1:
        this.updateCharacters(characterProps);
        if (this.currentRound.roundState === RoundState.END) {
          this.currentWinner = this.currentRound.winner;
          this.currentRound = new Round({
            roundName: 'ROUND 2',
            hero: this.hero,
            enemy: this.enemy,
            setUIElements: this.setUIElements,
          });
          store.dispatch(updateRoundName({ type: 'lifeBar', payload: 'ROUND 2' }));
          this.gameState = GameState.ROUND_2;
        }
        break;
      case GameState.ROUND_2:
        this.updateCharacters(characterProps);
        if (this.currentRound.roundState === RoundState.END) {
          if (this.currentWinner === this.currentRound.winner) {
            this.gameState = GameState.FINISHED;
          } else {
            this.currentWinner = this.currentRound.winner;
            this.currentRound = new Round({
              roundName: 'ROUND 3',
              hero: this.hero,
              enemy: this.enemy,
              setUIElements: this.setUIElements,
            });
            store.dispatch(updateRoundName({ type: 'lifeBar', payload: 'ROUND 3' }));
            this.gameState = GameState.ROUND_3;
          }
        }
        break;
      case GameState.ROUND_3:
        this.updateCharacters(characterProps);
        if (this.currentRound.roundState === RoundState.END) {
          this.currentWinner = this.currentRound.winner;
          this.gameState = GameState.FINISHED;
        }
        break;
      case GameState.FINISHED:
        this.updateCharacters(characterProps);
        break;
      default:
    }
  }
}
