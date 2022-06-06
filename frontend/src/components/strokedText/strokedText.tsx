import React, { FC } from 'react';
import styled from 'styled-components';

const propsHelper = (prop: keyof Omit<TextProps, 'children'>) => (props: TextProps) => props[prop];

const H1 = styled.h1`
  font-family: Pixeboy, serif;
  text-align: center;
  color: ${propsHelper('textColor')};
  font-size: ${propsHelper('fontSize')};
  text-shadow: 0 ${(props: TextProps) => { // eslint-disable-line arrow-body-style
    return `-${Number(props.fontSize.replace(/px/, '')) / 12.5}`;
  }}px 0 ${propsHelper('strokeColor')},
  -1px 0 ${propsHelper('strokeColor')},
    -1px -1px ${propsHelper('strokeColor')},
    0 -1px ${propsHelper('strokeColor')};
`;

type TextProps = {
  fontSize: string,
  textColor: string,
  strokeColor: string,
  children: React.ReactNode,
};

export const StrokedText: FC<TextProps> = ({
  fontSize,
  children,
  textColor,
  strokeColor,
}) => (
  <H1
    fontSize={fontSize}
    textColor={textColor}
    strokeColor={strokeColor}
  >
    {children}
  </H1>
);
