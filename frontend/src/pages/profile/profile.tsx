import React from 'react';
import styled from 'styled-components';
import { UserProfile } from '@frontend/src/pages/profile/components/user';
import Link from '../../components/link/link';
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

export const ProfilePage: React.FC = () => (
  <Wrapper>
    <MainTitle />
    <UserProfile />
    <ButtonsWrappers>
      <Link to={'/'}>BACK</Link>
      <Link to={'/profile/edit'}>EDIT</Link>
    </ButtonsWrappers>
  </Wrapper>
);
