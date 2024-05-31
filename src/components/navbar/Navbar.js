import { NavLink } from 'react-router-dom';
import NavbarCSS from'./Navbar.module.css';
import FriendsList from './FriendsList/FriendsList';

function Navbar(props) {
    return (
     <nav className = {NavbarCSS.navlist}>
        <ul className = {NavbarCSS.navul}>
          <li><NavLink className={({isActive}) => isActive ? NavbarCSS.active : ''} to='/profile'>Main</NavLink></li>
          <li><NavLink  className={({isActive}) => isActive ? NavbarCSS.active : ''}to='/dialogs'>Dialogs</NavLink> </li>
          <li><NavLink  className={({isActive}) => isActive ? NavbarCSS.active : ''}to='/messages'>Messages</NavLink> </li>
        </ul>
        <div className = {NavbarCSS.frindslist}> 
        <FriendsList names={props.state.sidebarData} />
        </div>
      </nav>
    
    )
  }

  export default Navbar;