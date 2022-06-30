import React, { useRef, useEffect } from 'react';
import { useIsSSR } from '@frontend/src/hooks/useIsSSR';
import { KeyboardControl } from '../../game/keyboard';
import Character, { Directions, Controls } from '../character/character';

function Canvas() {
  const isSSR = useIsSSR();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = isSSR ? 0 : window.innerWidth;
  const height = isSSR ? 0 : window.innerHeight;

  const size = { width, height };

  let requestIdRef: number | null = null;

  const characters: Array<Character> = [];

  let then: number;
  let keyboard: KeyboardControl;

  const initHero = (ctx: CanvasRenderingContext2D, control: Controls) => {
    const move = {
      x: Math.floor(size.width * 0.1),
      y: Math.floor(size.height - 300),
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
        x: Math.floor(size.width - 500),
        y: Math.floor(size.height - 300),
        vX: -0.06,
        vY: 0,
        direction: Directions.back,
      };

      const catChar = new Character(ctx, move);
      characters.push(catChar);
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
      }
      keyboard.stop();
    };
  }, [isSSR]);

  return (
    <canvas {...size} ref={canvasRef} />
  );
}

export default Canvas;
