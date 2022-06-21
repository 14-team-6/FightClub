import React, { FC } from 'react';
import styled from 'styled-components';
import { BlackPageLayout } from '../../layouts/blackPage';
import ButtonElement from '../../components/button/button';
import { StrokedText } from '../../components/strokedText/strokedText';
import { MAIN_RED, MAIN_YELLOW } from '../../../consts/styles';

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

const BBox = styled.div`
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

export const Errors: FC<ErrorProps> = (props: ErrorProps) => (
  <BlackPageLayout>
    <ErrorBox>
      <StrokedText
        fontSize="100px"
        textColor={MAIN_RED}
        strokeColor={MAIN_YELLOW}
      >{props.errorType}</StrokedText>
    </ErrorBox>
    <Img />
    <BBox>
      <ButtonElement type="button" text="Back" />
    </BBox>
  </BlackPageLayout>
);
