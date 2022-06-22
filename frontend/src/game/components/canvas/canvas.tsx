import React, { useRef, useEffect, FC } from 'react';
import { KeyboardControl } from '../../keyboard';
import Character from '../character/character';
import { Controls, Directions } from '@frontend/src/game/types';
import Sounds from '@frontend/src/game/components/sounds/sounds';

const Canvas:FC = () => {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let requestIdRef: number = 0;

  const characters: Array<Character> = [];

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

    const hero = new Character(ctx, move, control);
    characters.push(hero);
  };

  const initCharacters = (ctx: CanvasRenderingContext2D) => {
    while (characters.length < 1) {
      const move = {
        x: Math.floor(size.width - size.width * 0.5),
        y: Math.floor(size.height - 271),
        vX: -0.06,
        vY: 0,
        direction: Directions.LEFT,
      };

      const cat = new Character(ctx, move, undefined);
      characters.push(cat);
    }
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

    for (let i = 0; i < characters.length; i += 1) {
      characters[i].update(dt);
      characters[i].draw();
      characters[i].collision(characters);
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
