import { SpriteMap, Directions } from '@frontend/src/game/types';

export const imageFromSrc = (srcLeft: string, srcRight: string): SpriteMap => {
  const imageR = new Image();
  const imageL = new Image();
  imageR.src = srcRight;
  imageL.src = srcLeft;
  return {
    [Directions.RIGHT]: imageR,
    [Directions.LEFT]: imageL,
  };
};
