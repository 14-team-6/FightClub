import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

type TextProps = {
  fontSize?: string,
  textColor?: string,
  strokeColor?: string,
  strokeSize?: string,
  children?: React.ReactNode,
};

const SSvg = styled.svg`
  font: normal ${(props) => { return props.fontSize; }}px Pixeboy, sans-serif;
  height: 1.1em;
`;

const SText = styled.text`
  fill: ${(props: TextProps) => { return props.textColor; }};
  stroke: ${(props: TextProps) => { return props.strokeColor; }};
  stroke-width: ${(props: TextProps) => { return props.strokeSize; }}px;
`;

export const StrokedText: FC<TextProps> = ({
  strokeSize,
  fontSize,
  textColor,
  strokeColor,
  children,
}) => {
  const ref = React.createRef<SVGSVGElement>();

  useEffect(() => {
    const svg = ref.current;
    if (svg !== null) {
      const textWidth = children === null || children === undefined
        ? 0 : children.toString().length;
      const newWidth = (Number(fontSize) / 2.1538) * textWidth;
      svg.style.width = `${newWidth}`;
      svg.setAttribute('viewBox', `0 -${Math.abs(svg.getBBox().y) / 4} ${newWidth} 1`);
    }
  }, []);

  return <SSvg ref={ref} fontSize={fontSize}>
    <SText
      textColor={textColor}
      strokeColor={strokeColor}
      strokeSize={strokeSize}>{children}</SText>
  </SSvg>;
};
