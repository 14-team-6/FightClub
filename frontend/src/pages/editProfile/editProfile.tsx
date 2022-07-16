import React from 'react';
import MainTitle from '../../components/mainTitle/mainTitle';
import { Wrapper } from '../login/login';
import EditProfilePageForm from '../../components/editProfilePageForm/editProfilePageForm';
import Link from '../../components/link/link';

const EditProfilePage: React.FC = () => (
  <Wrapper>
    <MainTitle />
    <EditProfilePageForm />
    <Link to={'/profile'}>BACK</Link>
  </Wrapper>
);

export default EditProfilePage;
