import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ProtectedRoutes from '@frontend/src/components/routes/ProtectedRoutes';
import { store } from '@frontend/src/game/store/store';
import { AuthProvider } from '@frontend/src/hooks/useAuth';
import PublicRoutes from '@frontend/src/components/routes/PublicRoutes';
import LoginPage from './pages/login/login';
import MainPage from './pages/main/main';
import FightPage from './pages/game/fight';
import { Errors, ErrorTypes } from './pages/errors/errors';
import Pixeboy from '../public/font/Pixeboy.ttf';
import RegistrationPage from './pages/registration/registration';
import { Results } from './pages/results/results';
import ForumPage from './pages/forum/forumPage';
import TopicPage from './pages/forum/topicPage';
import MainLayout from './layouts/mainLayout';
import PostPage from './pages/forum/postPage';
import AnswerPage from './pages/forum/answerPage';
import { ProfilePage } from './pages/profile/profile';

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
    <Provider store={store}>
      <BrowserRouter>
        <GS />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/game/fight" element={<FightPage />} />
              <Route path="/game/fight/newgame" element={<Navigate to={'/game/fight'} />} />
              <Route path="/results" element={<Results />} />
              <Route path='/profile' element={<MainLayout><ProfilePage/></MainLayout>}/>
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
    </Provider>
  </React.Fragment>
);

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
