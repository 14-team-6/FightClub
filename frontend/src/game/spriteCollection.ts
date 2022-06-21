import { imageFromSrc } from '@frontend/src/utils/imageFromSrc';
import runRight from '@frontend/public/img/run-right-frame.png';
import runLeft from '@frontend/public/img/run-left-frame.png';
import jumpLeft from '@frontend/public/img/jump-left-frame.png';
import idleLeft from '@frontend/public/img/idle-left-frame.png';
import jumpRight from '@frontend/public/img/jump-right-frame.png';
import idleRight from '@frontend/public/img/idle-right-frame.png';
import attackLeft from '@frontend/public/img/attack-left-frame.png';
import attackRight from '@frontend/public/img/attack-right-frame.png';
import hurtLeft from '@frontend/public/img/hurt-left-frame.png';
import hurtRight from '@frontend/public/img/hurt-right-frame.png';
import { CharacterState } from '@frontend/src/game/types';

export default {
  [CharacterState.RUN]: {
    img: imageFromSrc(runLeft, runRight),
    frameIndex: 0,
    tickCount: 0,
    ticksPerFrame: 5,
    numberOfFrames: 8,
    frameWidth: 456,
    frameHeight: 271,
    collisionRectWidth: 130,
    collisionRectHeight: 160,
    collisionRectX: 165,
    collisionRectY: 110,
  },
  [CharacterState.ATTACK]: {
    img: imageFromSrc(attackLeft, attackRight),
    frameIndex: 0,
    tickCount: 0,
    ticksPerFrame: 5,
    numberOfFrames: 4,
    frameWidth: 456,
    frameHeight: 271,
    collisionRectWidth: 230,
    collisionRectHeight: 160,
    collisionRectX: 165,
    collisionRectY: 110,
  },
  [CharacterState.JUMP]: {
    img: imageFromSrc(jumpLeft, jumpRight),
    frameIndex: 0,
    tickCount: 0,
    ticksPerFrame: 5,
    numberOfFrames: 12,
    frameWidth: 456,
    frameHeight: 271,
    collisionRectWidth: 130,
    collisionRectHeight: 160,
    collisionRectX: 165,
    collisionRectY: 110,
  },
  [CharacterState.IDLE]: {
    img: imageFromSrc(idleLeft, idleRight),
    frameIndex: 0,
    tickCount: 0,
    ticksPerFrame: 5,
    numberOfFrames: 6,
    frameWidth: 456,
    frameHeight: 275,
    collisionRectWidth: 130,
    collisionRectHeight: 160,
    collisionRectX: 165,
    collisionRectY: 110,
  },
  [CharacterState.HURT]: {
    img: imageFromSrc(hurtLeft, hurtRight),
    frameIndex: 0,
    tickCount: 0,
    ticksPerFrame: 5,
    numberOfFrames: 4,
    frameWidth: 456,
    frameHeight: 271,
    collisionRectWidth: 130,
    collisionRectHeight: 160,
    collisionRectX: 165,
    collisionRectY: 110,
  },
};
