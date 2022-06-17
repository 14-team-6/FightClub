import React, { FC, useCallback, useEffect } from 'react';
import MainLayout from '@frontend/src/layouts/mainLayout';
import MainTitle from '@frontend/src/components/mainTitle/mainTitle';
import Button from '@frontend/src/components/button/button';
import Sounds from '@frontend/src/game/components/sounds/sounds';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StubImpl: FC = () => {
  useEffect(() => {
    Sounds.init().then(() => { Sounds.playMainTheme(); });
    return () => { Sounds.stopMainTheme(); };
  });

  const takeJump = useCallback(() => {
    Sounds.playJump();
  }, []);

  return (
    <MainLayout>
      <Wrap>
        <MainTitle text='sound check'/>
        <Button text='Jump!' onClick={takeJump} type='button'/>
      </Wrap>
    </MainLayout>
  );
};

export const Stub = React.memo(StubImpl);
