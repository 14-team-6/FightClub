import React, { FC } from 'react';
import styled from 'styled-components';
import { getProperty } from '@frontend/src/utils/helper';

const propsHelper = getProperty<TextProps>;

const H1 = styled.h1`
  text-align: center;
  color: ${propsHelper('textColor')};
  font-size: ${propsHelper('fontSize')};
  text-shadow:
    0 ${(props: TextProps) => `-${Number(props.fontSize.replace(/px/, '')) / 12.5}`}px 0 ${propsHelper('strokeColor')},
    -1px 0 ${propsHelper('strokeColor')},
    -1px -1px ${propsHelper('strokeColor')},
    0 -1px ${propsHelper('strokeColor')};
`;

type TextProps = {
  fontSize: string,
  textColor: string,
  strokeColor: string,
  children: React.ReactNode,
  className?: any,
  'data-cy'?: string,
};

export const StrokedText: FC<TextProps> = ({
  className,
  fontSize,
  children,
  textColor,
  strokeColor,
  'data-cy': dataCY,
}) => (
  <H1
    fontSize={fontSize}
    textColor={textColor}
    strokeColor={strokeColor}
    className={className}
    data-cy={dataCY}
  >
    {children}
  </H1>
);
