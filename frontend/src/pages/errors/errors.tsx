import React, { FC } from 'react';
import styled from 'styled-components';
import { BlackPageLayout } from '../../layouts/blackPage/blackPage';
import { StrokedText } from '../../components/strokedText/strokedText';

const ErrorBox = styled.h1`
  display: flex;
  align-items: end;
  flex-basis: 30%;
`;

const Img = styled.div`
  margin: 47px 0 0;
  background-image: url("../../../public/img/dead_cat.png");
  background-repeat: no-repeat;
  background-position: bottom;
  width: 94px;
  height: 50px;
`;

const BBox = styled.a`
  display: block;
  margin: 27px 0 0;
`;

export enum ErrorTypes {
  'e404' = '404',
  'e500' = '500',
}

interface ErrorProps {
  errorType: ErrorTypes,
}

export const Errors: FC<ErrorProps> = (props: ErrorProps) => {
  return <BlackPageLayout>
      <ErrorBox>
        <StrokedText textColor='#f00' strokeColor='#fff500' strokeSize='4' fontSize='80'>{props.errorType}</StrokedText>
      </ErrorBox>
      <Img/>
      <BBox href="#">
        <StrokedText textColor='#fff500' strokeColor='#5061ff' strokeSize='1' fontSize='30'>Back</StrokedText>
      </BBox>
  </BlackPageLayout>;
};
