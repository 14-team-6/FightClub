import React from 'react';
import styled from 'styled-components';
import { User } from '@frontend/src/pages/profile/types';
import { MIDDLE_FONT_SIZE, MAIN_RED, MAIN_YELLOW } from '@frontend/consts/styles';

const user: User = {
  id: 1,
  login: 'joao',
  firstName: 'Joao',
  secondName: 'Malvin',
  displayName: '@CRUSHEEER',
  avatar: '../../../../public/img/avatar.png',
  phone: '+351200098787',
  email: 'mew@purrr.like',
};

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 300px;
`;

export const Avatar = styled.img`
  width: 78px;
  height: 78px;
  border: 5px solid ${MAIN_RED};
`;

Avatar.defaultProps = {
  src: '../../../../public/img/avatar.png',
};

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 180px;
`;

export const InfoText = styled.div`
  color: ${MAIN_YELLOW};
  font-size: ${MIDDLE_FONT_SIZE};
`;

export const UserProfile: React.FC = () => (
  <Wrapper>
    {
      user ? (
        <>
          <Avatar src={user.avatar} />
          <UserInfo>
            <InfoText>{user.displayName.toUpperCase()}</InfoText>
            <InfoText>{`${user.firstName.toUpperCase()} ${user.secondName.toUpperCase()}`}</InfoText>
            <InfoText>{user.email.toUpperCase()}</InfoText>
            <InfoText>{user.phone.toUpperCase()}</InfoText>
          </UserInfo>
        </>
      ) : null
    }
  </Wrapper>
);
