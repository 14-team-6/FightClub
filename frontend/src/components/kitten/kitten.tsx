import React from 'react';
import styled from 'styled-components';
import { getProperty } from '@frontend/src/utils/helper';
import kittenImg from '../../../public/img/attack-right-frame-sm.png';

const propsHelper = getProperty<KittenProps>;

type KittenProps = {
  direction: string,
  sprite: number,
  width: number,
  height: number,
  className?: string
};

const KittenElement = styled.div`
  width: ${propsHelper('width')}px;
  height: ${propsHelper('height')}px;
  background:
    url(${kittenImg}) 0 ${({ sprite, height }: KittenProps) => {
  if (sprite === 1) {
    return '0';
  }
  return `-${(sprite - 1) * height}`;
}}px;
  transform: scale(${({ direction }: KittenProps) => (direction === 'right' ? '1' : '-1')
}, 1);
`;

const Kitten: React.FC<KittenProps> = ({
  direction,
  sprite,
  width,
  height,
  className,
}) => (
    <KittenElement
      className={className}
      direction={direction}
      sprite={sprite}
      width={width}
      height={height}
    />
);

export default Kitten;
