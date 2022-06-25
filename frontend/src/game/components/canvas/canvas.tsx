import React, { useRef, useEffect, FC } from 'react';
import { KeyboardControl } from '../../character/controls/keyboard';
import Sounds from '@frontend/src/game/components/sounds/sounds';
import { Character } from '@frontend/src/game/character/character';
import { CharacterHero } from '@frontend/src/game/character/characterHero';
import { CharacterEnemy } from '@frontend/src/game/character/characterEnemy';

const Canvas:FC = () => {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let requestIdRef: number = 0;

  const characters: Record<string, Character> = {};

  let then: number;
  let keyboard: KeyboardControl;

  const init = () => {
    then = performance.now();
    keyboard = KeyboardControl.getInstance();
    keyboard.start();

    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (ctx) {
      characters.hero = new CharacterHero(ctx);
      characters.enemy = new CharacterEnemy(ctx);
    }

    Sounds.init().then(() => {
      Sounds.playMainTheme();
    });
  };

  const clearFrame = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (ctx) {
      ctx.clearRect(
        0,
        0,
        size.width,
        size.height,
      );
    }
  };

  const renderFrame = (dt: number) => {
    clearFrame();
    for (const [, pers] of Object.entries(characters)) {
      pers.update({ controls: keyboard.keys, dt, characters });
    }
  };

  const tick = (now: number) => {
    if (!canvasRef.current) return;

    const dt = now - then;
    then = now;

    renderFrame(dt);
    requestIdRef = requestAnimationFrame(tick);
  };

  useEffect(() => {
    init();

    requestIdRef = requestAnimationFrame(tick);

    return () => {
      if (requestIdRef) {
        cancelAnimationFrame(requestIdRef);
        Sounds.stopMainTheme();
      }
      keyboard.stop();
    };
  }, []);

  return (
    <canvas {...size} ref={canvasRef}/>
  )
  ;
}

export default Canvas;
