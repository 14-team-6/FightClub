import React, { FC } from 'react';
import { Avatar, InfoText, UserInfo } from '@frontend/src/pages/profile/components/user';
import { User } from '@frontend/src/pages/profile/types';

interface InfoProps {
  user: User;
}

const Info: FC<InfoProps> = ({ user }) => (
  <>
    <Avatar src={user?.avatar ?? '../../../../public/img/avatar.png'} />
    <UserInfo>
      <InfoText>{user.displayName?.toUpperCase()}</InfoText>
      <InfoText>{`${user.firstName?.toUpperCase()} ${user.secondName?.toUpperCase()}`}</InfoText>
      <InfoText>{user.email?.toUpperCase()}</InfoText>
      <InfoText>{user.phone?.toUpperCase()}</InfoText>
    </UserInfo>
  </>
);

export default Info;
