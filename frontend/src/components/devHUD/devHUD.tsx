import React, { FC } from 'react';
import styled from 'styled-components';

type HUDProps = {
  message: string;
  className?: string;
};

const DevHUDImpl: FC<HUDProps> = ({ message, className }) => {

  return (
    <>
      <pre className={className}>{message}</pre>
    </>
  );
};

const DevHUDStyled = styled(DevHUDImpl)`
  position: fixed;
  height: 300px;
  width: 300px;
  top: 100px;
  left: 10px;
  color: chartreuse;
`;

export const DevHUD = React.memo(DevHUDStyled);
