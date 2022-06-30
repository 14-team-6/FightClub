import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from '@frontend/src/components/routes/ProtectedRoutes';
import PublicRoutes from '@frontend/src/components/routes/PublicRoutes';
import { Stub } from '@frontend/src/pages/game/stub';
import LoginPage from '@frontend/src/pages/login/login';
import MainPage from '@frontend/src/pages/main/main';
import { Loading } from '@frontend/src/pages/game/loading/loading';
import FightPage from '@frontend/src/pages/fight/fight';
import { Errors, ErrorTypes } from '@frontend/src/pages/errors/errors';
import RegistrationPage from '@frontend/src/pages/registration/registration';
import { EndGame, EndGameType } from '@frontend/src/pages/game/endGame/endGame';
import { Results } from '@frontend/src/pages/results/results';
import ForumPage from '@frontend/src/pages/forum/forumPage';
import TopicPage from '@frontend/src/pages/forum/topicPage';
import MainLayout from '@frontend/src/layouts/mainLayout';
import PostPage from '@frontend/src/pages/forum/postPage';
import AnswerPage from '@frontend/src/pages/forum/answerPage';
import { ProfilePage } from '@frontend/src/pages/profile/profile';

export const App: FC = () => (
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/fight" element={<FightPage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/game/stub" element={<Stub />} />
            <Route path="/game/loading" element={<Loading />} />
            <Route path="/game/end" element={<EndGame endGameType={EndGameType.LOOSE} />} />
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
);
