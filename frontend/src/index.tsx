import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Stub } from '@frontend/src/pages/game/stub';
import { AuthProvider } from '@frontend/src/hooks/useAuth';
import ProtectedRoutes from '@frontend/src/components/routes/ProtectedRoutes';
import PublicRoutes from '@frontend/src/components/routes/PublicRoutes';
import LoginPage from './pages/login/login';
import MainPage from './pages/main/main';
import { Loading } from './pages/game/loading/loading';
import FightPage from './pages/fight/fight';
import { Errors, ErrorTypes } from './pages/errors/errors';
import Pixeboy from '../public/font/Pixeboy.ttf';
import RegistrationPage from './pages/registration/registration';
import { EndGame, EndGameType } from './pages/game/endGame/endGame';
import { Results } from './pages/results/results';
import ForumPage from './pages/forum/forumPage';
import TopicPage from './pages/forum/topicPage';
import MainLayout from './layouts/mainLayout';
import PostPage from './pages/forum/postPage';
import AnswerPage from './pages/forum/answerPage';
import { ProfilePage } from './pages/profile/profile';
import EditProfilePage from './pages/editProfile/editProfile';

const GS = createGlobalStyle`
  @font-face {
    font-family: Pixeboy;
    src: url(${Pixeboy}) format("truetype");
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

const App: FC = () => (
  <React.Fragment>
    <BrowserRouter>
      <GS />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/fight" element={<FightPage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/game/stub" element={<Stub />} />
            <Route path="/game/loading" element={<Loading />} />
            <Route path="/game/end" element={<EndGame endGameType={EndGameType.LOOSE} />} />
            <Route path='/profile' element={<MainLayout><ProfilePage/></MainLayout>}/>
            <Route path='/profile/edit' element={<MainLayout><EditProfilePage/></MainLayout>}/>
            <Route path="/topics" element={<MainLayout><ForumPage /></MainLayout>} />
            <Route path="/topics/:topicId" element={<MainLayout><TopicPage /></MainLayout>} />
            <Route path="/topics/add" element={<MainLayout><ForumPage /></MainLayout>} />
            <Route path="/topics/:topicId/posts/:postId" element={<MainLayout><PostPage /></MainLayout>} />
            <Route path="/topics/:topicId/posts/add" element={<MainLayout><ForumPage /></MainLayout>} />
            <Route path="/topics/:topicId/posts/:postId/comments/add" element={<MainLayout><AnswerPage /></MainLayout>} />
            <Route path="*" element={<Errors errorType={ErrorTypes.e404} />} />
          </Route>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
            <Route path="/registration" element={<MainLayout><RegistrationPage /></MainLayout>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.Fragment>
);

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
