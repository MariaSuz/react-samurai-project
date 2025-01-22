
import {Header} from './components/header/Header.tsx';
import ProfileContainer from './components/profile/ProfileContainer.tsx';
import {Dialogs} from './components/dialogs/Dialogs.tsx';
import { Routes, Route, HashRouter } from 'react-router-dom';
import {UsersPage} from './components/Users/UsersPage.tsx';
import Preloader from './components/Common/Preloader/Preloader.tsx';
import * as React from 'react';
import { Box, Container, createTheme, Stack, ThemeProvider } from '@mui/material';
import {Login} from './components/login/Login.tsx';
//ленивая загрузка, тк загружаются зависимости только при вызове.
//  const Login = lazy(() => import('./components/login/Login.tsx'));

// //ленивая загрузка, тк загружаются зависимости только при вызове.
// const Login = React.lazy(() => import('./components/login/Login.tsx'));

const theme = createTheme({
  palette: {
    primary: {
      main: "#49c0f0"
    },
  }
});

export const App: React.FC = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <HashRouter>
          <Header />
            <Container>
              <Routes>
                  <Route path='/profile/:userId?' element = {<ProfileContainer/>} />
                  <Route path='/dialogs/*' element = {<Dialogs />} />
                  <Route path='/users' element = {<UsersPage />} />
                  <Route path='/login' element = {<Login />}/>
              </Routes>
            </Container>
        </HashRouter>
      </Box>
    </ThemeProvider>
  )
}







