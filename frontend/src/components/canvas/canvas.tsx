import React, { useRef, useEffect } from 'react';
import Keyboard, { Keys } from '../../game/keyboard';
import Character, { AllowDirection } from '../character/character';

function Canvas() {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let requestIdRef: number | null = null;

  const characters: Array<Character> = [];
  let hero: Character | null = null;

  let then: number;
  let keys: Keys;

  const initHero = (ctx: CanvasRenderingContext2D) => {
    const move = {
      x: Math.floor(size.width * 0.1),
      y: Math.floor(size.height - 300),
      vX: 0,
      vY: 0,
      vMax: 0.7,
      a: 0.001,
    };

    hero = new Character(ctx, move);
  };

  const initCharacters = (ctx: CanvasRenderingContext2D) => {
    while (characters.length < 1) {
      const move = {
        x: Math.floor(size.width - size.width * 0.1),
        y: Math.floor(size.height - 300),
        vX: -0.06,
        vY: 0,
        direction: 'back' as AllowDirection,
      };

      const catChar = new Character(ctx, move);
      characters.push(catChar);
    }
  };

  const init = () => {
    then = performance.now();
    keys = Keyboard.start();

    const ctx = canvasRef.current!.getContext('2d');

    if (ctx) {
      initCharacters(ctx);
      initHero(ctx);
    }
  };

  const renderFrame = (dt: number) => {
    for (let i = 0; i < characters.length; i += 1) {
      characters[i].clear();
    }
    hero!.clear();

    for (let i = 0; i < characters.length; i += 1) {
      characters[i].update(dt);
      characters[i].draw();
      characters[i].collision([hero!]);
    }

    hero!.move(dt, keys);
    hero!.draw();
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
      cancelAnimationFrame(requestIdRef!);
      Keyboard.stop();
    };
  }, []);

  return (
    <canvas {...size} ref={canvasRef} />
  );
}

export default Canvas;
