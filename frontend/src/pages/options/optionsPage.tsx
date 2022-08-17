import React from 'react';
import styled from 'styled-components';
import ButtonElement from '@frontend/src/components/button/button';
import { useNavigate } from 'react-router-dom';
import SubTitle from '@frontend/src/components/subTitle/subTitle';
import MainTitle from '@frontend/src/components/mainTitle/mainTitle';
import ThemeList from './components/themes';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ButtonsWrappers = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-between;
  width: 150px;
  align-items: center;
  margin-top: 50px;
`;

export const OptionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <MainTitle/>
      <SubTitle text="Choose a theme"/>
      <ThemeList/>
      <ButtonsWrappers>
        <ButtonElement onClick={() => navigate('/')} text='Back' type='button'/>
      </ButtonsWrappers>
    </Wrapper>
  );
};
