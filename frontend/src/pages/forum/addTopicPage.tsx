import { AddTopicForm } from '@frontend/src/pages/forum/components/addTopicForm';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const AddTopicPage = () => (
  <Wrapper>
    <AddTopicForm />
  </Wrapper>
);

export default AddTopicPage;
