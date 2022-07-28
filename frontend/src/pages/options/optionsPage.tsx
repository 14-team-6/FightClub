import React from 'react';
import styled from 'styled-components';
import ButtonElement from '@frontend/src/components/button/button';
import { useNavigate } from 'react-router-dom';
import NavList from '@frontend/src/components/navlist/navlist';
import { ThemeItem } from '@frontend/src/services/types';
import SubTitle from '@frontend/src/components/subTitle/subTitle';
import { themeService } from '@frontend/src/services/themeService';
import { useThemes } from './hooks/useThemes';
import MainTitle from '../../components/mainTitle/mainTitle';

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
  const themes = useThemes();

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    const themeId: string = event.currentTarget.dataset.id ?? '0';
    themeService.setTheme(themeId);
  };

  return (
    <Wrapper>
      <MainTitle/>
      <SubTitle text="Choose a theme"/>
      <NavList>
        {
        themes
          ? themes.map(
            (theme: ThemeItem) => <li key={theme.id}>
              <ButtonElement type="button" className="active" data-id={theme.id} text={theme.name} onClick={onClick} />
            </li>,
          )
          : null
        }
      </NavList>
      <ButtonsWrappers>
        <ButtonElement onClick={() => navigate('/')} text='Main menu' type='button'/>
      </ButtonsWrappers>
    </Wrapper>
  );
};
