
import './App.css';
import HeaderContainer from './components/header/HeaderContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import DialogsContainer from './components/dialogs/DialogsContainer';
import { Routes, Route, HashRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer.jsx';
import NavbarContainer from './components/navbar/NavbarContainer.js';
import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
// import {withAuthRedidirect}  from './hoc/AuthRedirect.js';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer.ts';
import Preloader from './components/Common/Preloader/Preloader.js';


//ленивая загрузка, тк загружаются зависимости только при вызове.
const LoginContainer = lazy(() => import('./components/login/LoginContainer'));



function App(props) {
  useEffect(( ) => {
    props.initializeApp();
  }, [ ] )
  return (
    <HashRouter>
    <div className='app-wrapper'>
        <HeaderContainer />
        <NavbarContainer />
        <div className='content'>
          <Routes>
              <Route path='/profile/:userId?' element = {<ProfileContainer />} />
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



const mapStateToProps = (state) => {
  return {
    initialize: state.app.initialize,
  }
}

export default compose(
  connect(mapStateToProps, {initializeApp}),
  // withAuthRedidirect
)(App);


