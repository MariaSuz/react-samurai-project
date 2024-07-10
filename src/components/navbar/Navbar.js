import { NavLink } from 'react-router-dom';
import NavbarCSS from'./Navbar.module.css';
import FriendsList from './FriendsList/FriendsList';

function Navbar(props) {
   let state = props.sidebar;
   let friendListElements = state.sidebarData.map(n => <FriendsList names={n.names} id={n.id} key={n.id}/>);

    return (
     <nav className = {NavbarCSS.navlist}>
        <ul className = {NavbarCSS.navul}>
          <li><NavLink className={({isActive}) => isActive ? NavbarCSS.active : ''} to='/profile'>Main</NavLink></li>
          <li><NavLink  className={({isActive}) => isActive ? NavbarCSS.active : ''}to='/dialogs'>Dialogs</NavLink> </li>
          <li><NavLink  className={({isActive}) => isActive ? NavbarCSS.active : ''}to='/users'>Find Users</NavLink> </li>
        </ul>
        <div className = {NavbarCSS.frindslist}>
         {friendListElements}
        </div>
      </nav> 
    )
  }

  export default Navbar;