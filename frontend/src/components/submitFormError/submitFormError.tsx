import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  font-family: Pixeboy, sans-serif;
  height: 26px;
  font-size: 26px;
`;

interface SubmitFormErrorProps {
  error: string;
}

const SubmitFormError: React.FC<SubmitFormErrorProps> = ({ error }) => {
  return <Span>{error}</Span>;
};

export default React.memo(SubmitFormError);
