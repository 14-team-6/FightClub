import React from 'react';
import styled from 'styled-components';
import { MAIN_FONT_SIZE, MAIN_RED, MAIN_YELLOW } from '@frontend/consts/styles';
import Info from '@frontend/src/pages/profile/components/info';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@frontend/src/selectors/user';

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
  margin-right: 30px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 180px;
`;

export const InfoText = styled.div`
  color: ${MAIN_YELLOW};
  font-size: ${MAIN_FONT_SIZE};
`;

export const UserProfile: React.FC = () => {
  const user: User = useSelector(selectUserInfo);

  return (
    <Wrapper>
      <Info user={user}/>
    </Wrapper>
  );
};
