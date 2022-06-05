import React, { useRef, useEffect } from 'react';
import Keyboard, { Keys } from '../../game/keyboard';
import Character, { AllowDirection } from '../character/character';

function Canvas() {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestIdRef = useRef<number>();

  const characters = useRef<Array<Character>>([]);
  const hero = useRef<Character>();

  let then: number;
  let keys: Keys;

  const initHero = (ctx: CanvasRenderingContext2D) => {
    const move = {
      x: Math.floor(size.width * 0.1),
      y: Math.floor(size.height * 0.9),
      vX: 0,
      vY: 0,
      vMax: 0.7,
      a: 0.001,
    };

    hero.current = new Character(ctx, move);
  };

  const initCharacters = (ctx: CanvasRenderingContext2D) => {
    while (characters.current.length < 1) {
      const move = {
        x: Math.floor(size.width - size.width * 0.1),
        y: Math.floor(size.height * 0.9),
        vX: -0.06,
        vY: 0,
        direction: 'back' as AllowDirection,
      };

      const catChar = new Character(ctx, move);
      characters.current.push(catChar);
    }
  };

  const init = () => {
    then = performance.now();
    keys = Keyboard.start();

    const ctx = canvasRef.current!.getContext('2d');

    initCharacters(ctx!);
    initHero(ctx!);
  };

  const renderFrame = (dt: number) => {
    for (let i = 0; i < characters.current.length; i += 1) {
      characters.current[i].clear();
    }
    hero.current!.clear();

    for (let i = 0; i < characters.current.length; i += 1) {
      characters.current[i].update(dt);
      characters.current[i].draw();
      characters.current[i].collision([hero.current!]);
    }

    hero.current!.move(dt, keys);
    hero.current!.draw();
  };

  const tick = (now: number) => {
    if (!canvasRef.current) return;

    const dt = now - then;
    then = now;

    renderFrame(dt);
    requestIdRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    init();

    requestIdRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(requestIdRef.current!);
      Keyboard.stop();
    };
  }, []);

  return (
    <canvas {...size} ref={canvasRef} />
  );
}

export default Canvas;
