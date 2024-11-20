
import './App.css';
import HeaderContainer from './components/header/HeaderContainer';
import ProfileContainer from './components/profile/ProfileContainer';
//import Navbar from './components/navbar/Navbar';
import DialogsContainer from './components/dialogs/DialogsContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer.jsx';
import NavbarContainer from './components/navbar/NavbarContainer.js';
import LoginContainer from './components/login/LoginContainer';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import {withAuthRedidirect}  from './hoc/AuthRedirect.js';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer.js';
// import Preloader from './components/Common/Preloader/Preloader.js';

function App(props) {
  useEffect(( ) => {
    props.initializeApp();
  }, [ ] )
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
        <HeaderContainer />
        <NavbarContainer />
        <div className='content'>
          <Routes>
              <Route path='/profile/:userId?' element = {<ProfileContainer />} />
              <Route path='/dialogs/*' element = {<DialogsContainer />} />
              <Route path='/users' element = {<UsersContainer />} />
              <Route path='/login' element = {<LoginContainer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
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


