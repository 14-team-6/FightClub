import React, { useRef, useEffect } from 'react';
import { KeyboardControl } from '../../keyboard';
import Character from '../character/character';
import { Controls, Directions } from '@frontend/src/game/types';
import Sounds from '@frontend/src/game/components/sounds/sounds';

function Canvas() {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let requestIdRef: number | null = null;

  //const characters: Array<Character> = [];

  let hero: Character | undefined = undefined;
  let cat: Character | undefined = undefined;

  let then: number;
  let keyboard: KeyboardControl;

  const initHero = (ctx: CanvasRenderingContext2D, control: Controls) => {
    const move = {
      x: Math.floor(size.width * 0.1),
      y: Math.floor(size.height - 271),
      vX: 0,
      vY: 0,
      vMax: 0.7,
      a: 0.001,
    };

    hero = new Character(ctx, move, control, 0);
    //characters.push(hero);
  };

  const initCharacters = (ctx: CanvasRenderingContext2D) => {
    //while (characters.length < 1) {
      const move = {
        x: Math.floor(size.width - size.width * 0.5),
        y: Math.floor(size.height - 271),
        vX: -0.06,
        vY: 0,
        direction: Directions.LEFT,
      };

      cat = new Character(ctx, move, undefined, 0);
      //characters.push(catChar);
    //}
  };

  const init = () => {
    then = performance.now();
    keyboard = KeyboardControl.getInstance();
    keyboard.start();

    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (ctx) {
      initCharacters(ctx);
      initHero(ctx, keyboard);
    }

    Sounds.init().then(() => {
      Sounds.playMainTheme();
    });
  };

  // @ts-ignore-line
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

    hero!.update(dt);
    hero!.draw();

    cat!.update(dt);
    cat!.draw();

    // for (let i = 0; i < characters.length; i += 1) {
    //   characters[i].update(dt);
    //   characters[i].draw();
    //   characters[i].collision(characters);
    // }
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
      }
      keyboard.stop();
    };
  }, []);

  return (
    <>
      <canvas {...size} ref={canvasRef} />
    </>
  );
}

export default Canvas;
