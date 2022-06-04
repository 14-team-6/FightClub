import React, { useRef, useEffect } from 'react';
import Keyboard, { Keys } from '../../game/keyboard';
import Character from '../character/character';
import cat from '../../../public/img/run.png';

function Canvas() {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestIdRef = useRef<number>();

  const characters = useRef<Array<Character>>([]);
  const hero = useRef<Character>();

  let then: number;

  let keys: Keys;

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const initHero = (ctx: CanvasRenderingContext2D) => {
    const img = new Image();
    img.src = cat;
    const width = 80;
    const height = 80;
    const x = Math.floor(size.width * 0.1);
    const y = Math.floor(size.height - size.height * 0.1 - height / 2);
    const vX = 0;
    const vY = 0;
    const vMax = 0.7;
    const a = 0.001;

    hero.current = new Character({
      ctx, img, x, y, width, height, vX, vY, vMax, a,
    });
  };

  const initCharacters = (ctx: CanvasRenderingContext2D) => {
    while (characters.current.length < 2) {
      const img = new Image();
      img.src = cat;
      const width = 80;
      const height = 80;
      const x = random(0 + width / 2, size.width - width / 2);
      const y = random(0 + height / 2, size.height - height / 2);
      const vX = random(-3, 3);
      const vY = random(-3, 3);

      const catChar = new Character({
        ctx, img, x, y, width, height, vX, vY,
      });
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
    const ctx = canvasRef.current!.getContext('2d');
    ctx!.clearRect(0, 0, size.width, size.height);

    for (let i = 0; i < characters.current.length; i += 1) {
      characters.current[i].draw();
      characters.current[i].update();
    }

    hero.current!.draw();
    hero.current!.go(dt, keys);
  };

  const tick = () => {
    if (!canvasRef.current) return;

    const now = performance.now();
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
