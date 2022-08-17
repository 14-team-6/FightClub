import React from 'react';
import styled from 'styled-components';
import { UserProfile } from '@frontend/src/pages/profile/components/user';
import ButtonElement from '@frontend/src/components/button/button';
import { useNavigate } from 'react-router-dom';
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

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <MainTitle/>
      <UserProfile/>
      <ButtonsWrappers>
        <ButtonElement onClick={() => navigate('/profile/edit')} text='Edit' type='button'/>
        <ButtonElement onClick={() => navigate('/')} text='Back' type='button'/>
      </ButtonsWrappers>
    </Wrapper>
  );
};
