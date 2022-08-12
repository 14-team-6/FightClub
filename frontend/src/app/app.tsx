import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoutes from '@frontend/src/components/routes/ProtectedRoutes';
import PublicRoutes from '@frontend/src/components/routes/PublicRoutes';
import LoginPage from '@frontend/src/pages/login/login';
import MainPage from '@frontend/src/pages/main/main';
import { Loading } from '@frontend/src/pages/game/loading/loading';
import { Errors, ErrorTypes } from '@frontend/src/pages/errors/errors';
import RegistrationPage from '@frontend/src/pages/registration/registration';
import { EndGame, EndGameType } from '@frontend/src/pages/game/endGame/endGame';
import { Results } from '@frontend/src/pages/results/results';
import ForumPage from '@frontend/src/pages/forum/forumPage';
import TopicPage from '@frontend/src/pages/forum/topicPage';
import MainLayout from '@frontend/src/layouts/mainLayout';
import PostPage from '@frontend/src/pages/forum/postPage';
import AnswerPage from '@frontend/src/pages/forum/answerPage';
import { ProfilePage } from '@frontend/src/pages/profile/profilePage';
import { createGlobalStyle } from 'styled-components';
import { MAIN_FONT } from '@frontend/consts/styles';
import FightPage from '@frontend/src/pages/game/fight/fight';
import { AuthProvider } from '@frontend/src/hooks/useAuth';
import EditProfilePage from '@frontend/src/pages/editProfile/editProfile';
import AddTopicPage from '@frontend/src/pages/forum/addTopicPage';
import AddPostPage from '@frontend/src/pages/forum/createPostPage';

const GS = createGlobalStyle`
  @font-face {
    font-family: Pixeboy;
    src: url(${MAIN_FONT}) format("truetype");
    font-style: normal;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Pixeboy, serif;
  }
`;

export const App = () => (
  <>
    <GS/>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoutes/>}>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/game/fight" element={<FightPage/>}/>
        <Route path="/game/fight/newgame" element={<Navigate to={'/game/fight'} />} />
        <Route path="/results" element={<Results/>}/>
        <Route path="/game/loading" element={<Loading/>}/>
        <Route path="/game/end" element={<EndGame endGameType={EndGameType.LOOSE}/>}/>
        <Route path="/profile" element={<MainLayout><ProfilePage/></MainLayout>}/>
        <Route path="/topics" element={<MainLayout><ForumPage/></MainLayout>}/>
        <Route path="/topics/:topicId" element={<MainLayout><TopicPage/></MainLayout>}/>
        <Route path="/topics/add" element={<MainLayout><AddTopicPage/></MainLayout>}/>
        <Route path="/topics/:topicId/posts/:postId" element={<MainLayout><PostPage/></MainLayout>}/>
        <Route path="/topics/:topicId/posts/add" element={<MainLayout><AddPostPage/></MainLayout>}/>
        <Route path="/topics/:topicId/posts/:postId/comments/:commentId/add" element={<MainLayout><AnswerPage/></MainLayout>}/>
        <Route path="/profile" element={<MainLayout><ProfilePage/></MainLayout>}/>
        <Route path="/profile/edit" element={<MainLayout><EditProfilePage/></MainLayout>}/>
        <Route path="*" element={<Errors errorType={ErrorTypes.e404}/>}/>
      </Route>
        <Route path="/" element={<PublicRoutes/>}>
        <Route path="/login" element={<MainLayout><LoginPage/></MainLayout>}/>
        <Route path="/registration" element={<MainLayout><RegistrationPage/></MainLayout>}/>
      </Route>
    </Routes>
    </AuthProvider>
  </>
);
