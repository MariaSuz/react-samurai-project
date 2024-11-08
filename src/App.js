
import './App.css';
import HeaderContainer from './components/header/HeaderContainer';
import ProfileContainer from './components/profile/ProfileContainer';
//import Navbar from './components/navbar/Navbar';
import DialogsContainer from './components/dialogs/DialogsContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer.jsx';
import NavbarContainer from './components/navbar/NavbarContainer.js';
import LoginContainer from './components/login/LoginContainer';



function App(props) {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
        <HeaderContainer />
        {/* <Navbar state={props.state.sidebar}/> */}
        <NavbarContainer />
        <div className='content'>
          <Routes>
            {/* <Route path='/profile' element = {<Profile state={props.state.profilePage} dispatch={props.dispatch}/>} />
            <Route path='/dialogs/*' element = {<Dialogs  state={props.state.messagesPage} dispatch={props.dispatch}/>}/> */}
             {/* <Route path='/profile' element = {<Profile store={props.store}/>} />
             <Route path='/dialogs/*' element = {<DialogsContainer store={props.store}/>} /> */}
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

export default App;
