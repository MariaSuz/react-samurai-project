
import './App.css';
import HeaderContainer from './components/header/HeaderContainer.tsx';
import ProfileContainer from './components/profile/ProfileContainer.tsx';
import DialogsContainer from './components/dialogs/DialogsContainer.tsx';
import { Routes, Route, HashRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer.tsx';
import NavbarContainer from './components/navbar/NavbarContainer.tsx';
import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer.ts';
import Preloader from './components/Common/Preloader/Preloader.tsx';
import { AppStateType } from './redux/redux-store.ts';


//ленивая загрузка, тк загружаются зависимости только при вызове.
const LoginContainer = lazy(() => import('./components/login/LoginContainer.tsx'));

type MapPropsType = {
  initialize: boolean;
};
type DispatchPropsType = {
  initializeApp: () => void;
};

type AppPropsType = MapPropsType & DispatchPropsType;

const App: React.FC<AppPropsType> = (props) => {
  // useEffect(( ) => {
  //   props.initializeApp();
  // }, [ ] )
  useEffect(() => {
    props.initializeApp();
  }, [props.initializeApp]); // Added dependency to avoid missing updates

  if (!props.initialize) {
    return <Preloader />; // Show preloader while the app is initializing
  }
  return (
    <HashRouter>
    <div className='app-wrapper'>
        <HeaderContainer />
        <NavbarContainer />
        <div className='content'>
          <Routes>
              <Route path='/profile/:userId?' element = {<ProfileContainer/>} />
              <Route path='/dialogs/*' element = {<DialogsContainer />} />
              <Route path='/users' element = {<UsersContainer />} />
              <Route path='/login' element = {
              <Suspense fallback={<div>Loading...</div>}>
                <LoginContainer />
              </Suspense>
              }/>
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}



const mapStateToProps = (state: AppStateType) => {
  return {
    initialize: state.app.initialize,
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {initializeApp}),
)(App);


