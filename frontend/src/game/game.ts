import { Character, CharacterUpdateProps } from '@frontend/src/game/character/character';
import { Round } from '@frontend/src/game/game/round';
import { CharacterHero } from '@frontend/src/game/character/characterHero';
import { CharacterEnemy } from '@frontend/src/game/character/characterEnemy';
import store from '@frontend/src/store/store';
import { setRoundName } from '@frontend/src/actionCreators/gameState/creators';
import { EndGame, EndGameType } from '@frontend/src/pages/game/endGame/endGame';
import Sounds from '@frontend/src/game/components/sounds/sounds';
import { KeyboardControl, keyboardLayoutPause } from '@frontend/src/game/components/controls/keyboard';
import { PauseGame } from '@frontend/src/pages/game/pauseGame/pauseGame';
import { RoundState } from '@frontend/src/game/types';

enum GameState {
  ROUND_1 = 'ROUND 1',
  ROUND_2 = 'ROUND 2',
  ROUND_3 = 'ROUND 3',
  FINISHED = 'FINISHED',
  PAUSED = 'PAUSED',
}

type GameUpdateProps = {
  dt: number,
};

export class Game {
  public hero: Character;

  public enemy: Character;

  public inputPause: KeyboardControl;

  private currentRound: Round;

  private currentWinner: Character;

  private readonly setUIElements: Function;

  private gameState: GameState;

  constructor(ctx: CanvasRenderingContext2D, setUIElements: Function) {
    this.gameState = GameState.ROUND_1;
    this.setUIElements = setUIElements;
    this.hero = new CharacterHero(ctx);
    this.enemy = new CharacterEnemy(ctx);

    this.inputPause = new KeyboardControl(keyboardLayoutPause);
    this.inputPause.start();

    Sounds.init().then(() => {
      Sounds.playMainTheme();
    });

    this.currentRound = new Round({
      roundName: 'ROUND 1',
      hero: this.hero,
      enemy: this.enemy,
      setUIElements: this.setUIElements,
    });
    store.dispatch(setRoundName('ROUND 1'));
  }

  private updateCharacters(props: CharacterUpdateProps): void {
    this.hero.update(props);
    this.enemy.update(props);
  }

  private handleEndGame(): void {
    const endGameType = this.currentWinner === this.hero ? EndGameType.WIN : EndGameType.LOOSE;
    const score = endGameType === EndGameType.WIN ? Math.round(this.hero.life * 1000) : 0;
    this.setUIElements(EndGame({ endGameType, score }));
  }

  private handleResumeGame(oldState: GameState): Function {
    return () => {
      Sounds.playMainTheme();
      this.gameState = oldState;
      this.hero.isPaused = false;
      this.enemy.isPaused = false;
      this.setUIElements(null);
    };
  }

  private handlePausing(): void {
    if (this.inputPause.keys.pause && this.currentRound.roundState === RoundState.FIGHT) {
      const handler = this.handleResumeGame(this.gameState);
      Sounds.stopMainTheme();
      this.setUIElements(PauseGame({ resumeCallback: handler.bind(this) }));
      this.hero.isPaused = true;
      this.enemy.isPaused = true;
      this.gameState = GameState.PAUSED;
    }
  }

  public update(props: GameUpdateProps): void {
    const characterProps = {
      ...props, characters: { hero: this.hero, enemy: this.enemy },
    };

    this.currentRound.update();

    switch (this.gameState) {
      case GameState.ROUND_1:
        this.updateCharacters(characterProps);
        this.handlePausing();
        if (this.currentRound.roundState === RoundState.END) {
          this.currentWinner = this.currentRound.winner;
          this.currentRound = new Round({
            roundName: 'ROUND 2',
            hero: this.hero,
            enemy: this.enemy,
            setUIElements: this.setUIElements,
          });
          store.dispatch(setRoundName('ROUND 2'));
          this.gameState = GameState.ROUND_2;
        }
        break;
      case GameState.ROUND_2:
        this.updateCharacters(characterProps);
        this.handlePausing();
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
            store.dispatch(setRoundName('ROUND 3'));
            this.gameState = GameState.ROUND_3;
          }
        }
        break;
      case GameState.ROUND_3:
        this.updateCharacters(characterProps);
        this.handlePausing();
        if (this.currentRound.roundState === RoundState.END) {
          this.currentWinner = this.currentRound.winner;
          this.gameState = GameState.FINISHED;
        }
        break;
      case GameState.FINISHED:
        this.updateCharacters(characterProps);
        this.handleEndGame();
        break;
      default:
    }
  }

  public beforeDestroy(): void {
    this.hero.beforeDestroy();
    this.enemy.beforeDestroy();
    this.inputPause.stop();
    Sounds.stopMainTheme();
  }
}
