
import React, { useEffect, useState } from 'react';
import {Header} from './components/Header/Header.tsx';
import ProfileContainer from './components/profile/ProfileContainer.tsx';
import {Dialogs} from './components/dialogs/Dialogs.tsx';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import {UsersPage} from './components/Users/UsersPage.tsx';
import Preloader from './components/Common/Preloader/Preloader.tsx';
import { Box, Container, createTheme, Stack, ThemeProvider } from '@mui/material';
import {Login} from './components/Login/Login.tsx';
import ChatPage from './chat/ChatPage.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialize, getisAuth } from './redux/users-selectors.ts';
import { AppDispatch } from './redux/redux-store.ts';
import { initializeApp } from './redux/app-reducer.ts';
import { Footer } from './components/Footer/Footer.tsx';

//ленивая загрузка, тк загружаются зависимости только при вызове.
//  const Login = lazy(() => import('./components/login/Login.tsx'));


const theme = createTheme({
  palette: {
    primary: {
      main: "#49c0f0"
    },
  }
});


export const App: React.FC = (props) => {
  const initialize = useSelector(getInitialize)
  const isAuth = useSelector(getisAuth);
  const dispatch:AppDispatch = useDispatch()

  // const initializedApp = () => {
  //   dispatch(initializeApp())
  // }
  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  // useEffect(() => {
  //   initializedApp();
  // }, []);

  if (!initialize) {
    return (<Preloader />)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <HashRouter>
          <Header />
            <Container>
              <Routes>
              {isAuth ?  (
                <>
                  <Route path='/' element={<Navigate to='/profile' replace />} />
                  <Route path='/profile/:userId?' element = {<ProfileContainer/>} />
                  <Route path='/dialogs/*' element = {<Dialogs />} />
                  <Route path='/users' element = {<UsersPage />} />
                  <Route path='/login' element = {<Login />}/>
                  <Route path='/chat' element = {<ChatPage />}/>
                </>
              ) : (
                <>
                <Route path='/login' element = {<Login />}/>
                <Route path='*' element={<Navigate to='/login' replace />} />
                </>
              )}
              </Routes>
            </Container>
          <Footer />
        </HashRouter>
      </Box>
    </ThemeProvider>
  )
}







