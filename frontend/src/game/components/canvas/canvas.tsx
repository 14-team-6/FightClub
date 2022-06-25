import React, {
  useRef,
  useEffect,
  FC,
  ReactNode,
  useState,
} from 'react';
import { Game } from '@frontend/src/game/core';
import { KeyboardControl } from '../../character/controls/keyboard';

const Canvas:FC = () => {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [UIElements, setUIElements] = useState<ReactNode>(<></>);

  let requestIdRef: number = 0;

  const setUIElement = (reactNode: ReactNode): void => {
    setUIElements(reactNode);
  };

  let game: Game;

  let then: number;
  let keyboard: KeyboardControl;

  const init = () => {
    then = performance.now();
    keyboard = KeyboardControl.getInstance();
    keyboard.start();

    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (ctx) {
      game = new Game(ctx, setUIElement);
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
    game.update({ controls: keyboard.keys, dt });
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
        game.beforeDestroy();
      }
      keyboard.stop();
    };
  }, []);

  return (
    <>
      <>{UIElements}</>
      <canvas {...size} ref={canvasRef}/>
    </>

  );
};

export default Canvas;
