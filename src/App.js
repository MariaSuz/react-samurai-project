
import './App.css';
import Header from './components/header/Header';
import Profile from './components/profile/Profile';
import Dialogs from './components/dialogs/Dialogs';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App(props) {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
        <Header />
        <Navbar state={props.state.sidebar}/>
        <div className='content'>
          <Routes>
            <Route path='/profile' element = {<Profile state={props.state.profilePage} dispatch={props.dispatch}/>} />
            <Route path='/dialogs/*' element = {<Dialogs  state={props.state.messagesPage} dispatch={props.dispatch}/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter> 
  );
}

export default App;
