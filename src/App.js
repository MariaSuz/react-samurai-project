
import './App.css';
import Header from './components/header/Header';
import Profile from './components/profile/Profile';
import Navbar from './components/navbar/Navbar';
import DialogsContainer from './components/dialogs/DialogsContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App(props) {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
        <Header />
        <Navbar state={props.state.sidebar}/>
        <div className='content'>
          <Routes>
            {/* <Route path='/profile' element = {<Profile state={props.state.profilePage} dispatch={props.dispatch}/>} />
            <Route path='/dialogs/*' element = {<Dialogs  state={props.state.messagesPage} dispatch={props.dispatch}/>}/> */}
             <Route path='/profile' element = {<Profile store={props.store}/>} />
             <Route path='/dialogs/*' element = {<DialogsContainer store={props.store}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter> 
  );
}

export default App;
