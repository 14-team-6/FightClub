import React, {
  useRef,
  useEffect,
  FC,
  ReactNode,
  useState,
} from 'react';
import { Game } from '@frontend/src/game/game';
import { useIsSSR } from '@frontend/src/hooks/useIsSSR';

const Canvas:FC = () => {
  const isSSR = useIsSSR();

  let width = 0;
  let height = 0;

  let size = { width, height };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [UIElements, setUIElements] = useState<ReactNode>(<></>);

  let requestIdRef: number = 0;

  const setUIElement = (reactNode: ReactNode): void => {
    setUIElements(reactNode);
  };

  let game: Game;

  let then: number;

  const init = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    size = { width, height };

    if (canvasRef.current) {
      canvasRef.current.width = size.width;
      canvasRef.current.height = size.height;
    }

    then = performance.now();

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
    game.update({ dt });
  };

  const tick = (now: number) => {
    if (!canvasRef.current) return;

    const dt = now - then;
    then = now;

    renderFrame(dt);
    requestIdRef = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!isSSR) {
      init();
      requestIdRef = requestAnimationFrame(tick);
    }

    return () => {
      if (requestIdRef) {
        cancelAnimationFrame(requestIdRef);
        game.beforeDestroy();
      }
    };
  }, [isSSR]);

  return (
    <>
      <>{UIElements}</>
      <canvas {...size} ref={canvasRef}/>
    </>

  );
};

export default Canvas;
