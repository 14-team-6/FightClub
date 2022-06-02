import React from 'react';
import styled from 'styled-components';
import mainBackgroundImage from '../../public/img/main-background.png';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${mainBackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

type Props = {
  children: JSX.Element,
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default MainLayout;
