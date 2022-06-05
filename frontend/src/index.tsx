import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import Pixeboy from '../public/font/Pixeboy.ttf';
import RegistrationPage from './pages/registration/registration';
import ForumPage from './pages/forum/forumPage';
import TopicPage from './pages/forum/topicPage';
import MainLayout from './layouts/mainLayout';

const GS = createGlobalStyle`
  @font-face {
    font-family: Pixeboy;
    src: url(${Pixeboy}) format("truetype");
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Pixeboy, serif;
  }
`;

const App: FC = () => (
  <React.Fragment>
    <BrowserRouter>
      <GS />
      <Routes>
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/registration" element={<MainLayout><RegistrationPage /></MainLayout>} />
        <Route path="/topics" element={<MainLayout><ForumPage /></MainLayout>} />
        <Route path="/topics/:topicId" element={<MainLayout><TopicPage /></MainLayout>} />
        <Route path="/topics/add" element={<MainLayout><ForumPage /></MainLayout>} />
        <Route path="/topics/:topicId/posts/:postId" element={<MainLayout><ForumPage /></MainLayout>} />
        <Route path="/topics/:topicId/posts/add" element={<MainLayout><ForumPage /></MainLayout>} />
        <Route path="/topics/:topicId/posts/:postId/comments/add" element={<MainLayout><ForumPage /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  </React.Fragment>
);

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
