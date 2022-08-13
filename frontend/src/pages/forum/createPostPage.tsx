import React from 'react';
import styled from 'styled-components';
import { AddPostForm } from '@frontend/src/pages/forum/components/addPostForm';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const AddPostPage = () => (
  <Wrapper>
    <AddPostForm/>
  </Wrapper>
);

export default AddPostPage;
