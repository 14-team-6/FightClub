import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import { Loading } from './pages/game/loading/loading';
import { Errors, ErrorTypes } from './pages/errors/errors';
import Pixeboy from '../public/font/Pixeboy.ttf';
import LoginPage from './pages/login/login';
import RegistrationPage from './pages/registration/registration';
import ForumPage from './pages/forum/forumPage';
import TopicPage from './pages/forum/topicPage';
import MainLayout from './layouts/mainLayout';
import PostPage from './pages/forum/postPage';
import AnswerPage from './pages/forum/answerPage';

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
      <Routes>
        <Route path="/" element={
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/game/loading">Load game</Link></li>
          </ul>
        } />
        <Route path="/game/loading" element={<Loading />} />
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/registration" element={<MainLayout><RegistrationPage /></MainLayout>} />
        <Route path="/topics" element={<MainLayout><ForumPage /></MainLayout>} />
        <Route path="/topics/:topicId" element={<MainLayout><TopicPage /></MainLayout>} />
        <Route path="/topics/add" element={<MainLayout><ForumPage /></MainLayout>} />
        <Route path="/topics/:topicId/posts/:postId" element={<MainLayout><PostPage /></MainLayout>} />
        <Route path="/topics/:topicId/posts/add" element={<MainLayout><ForumPage /></MainLayout>} />
        <Route path="/topics/:topicId/posts/:postId/comments/add" element={<MainLayout><AnswerPage /></MainLayout>} />
        <Route path="*" element={<Errors errorType={ErrorTypes.e404} />} />
      </Routes>
    </BrowserRouter>
  </React.Fragment>
);

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
