import React from 'react';
import styled from 'styled-components';
import { UserProfile } from '@frontend/src/pages/profile/components/user';
import ButtonElement from '@frontend/src/components/button/button';
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
  width: 100px;
  margin-top: 50px;
`;

export const ProfilePage: React.FC = () => {
  return (
    <Wrapper>
      <MainTitle />
      <UserProfile />
      <ButtonsWrappers>
        {/* временно кнопки, как вмерджится страница форума в мейн, переделаю на линки */}
        <ButtonElement type="button" text="Back"/>
        <ButtonElement type="button" text="Edit"/>
      </ButtonsWrappers>
    </Wrapper>
  );
};
