import React from 'react';
import MainTitle from '../../components/mainTitle/mainTitle';
import { Wrapper } from '../login/login';
import EditProfilePageForm from '../../components/editProfilePageForm/editProfilePageForm';

const EditProfilePage: React.FC = () => (
  <Wrapper>
    <MainTitle/>
    <EditProfilePageForm/>
  </Wrapper>
);

export default EditProfilePage;
