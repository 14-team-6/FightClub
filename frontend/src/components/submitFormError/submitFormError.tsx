import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  height: 26px;
  font-size: 26px;
`;

interface SubmitFormErrorProps {
  error: string;
}

const SubmitFormError: React.FC<SubmitFormErrorProps> = ({ error }) => <Span>{error}</Span>;

export default React.memo(SubmitFormError);
