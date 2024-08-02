import { NavLink } from 'react-router-dom';
import Headercss from'./Header.module.css';

function Header(props) {
    return (
      <div className = {Headercss.main_header}>
        <img className = {Headercss.main_header_img} src="https://mychatte.ru/upload/iblock/31d/31d6b4d0766e973d25abebc4d4acc0ae.png" alt='headerimg'/>
        <span>My firts React project (social network)</span> 
        <div className = {Headercss.logindiv}>
          { props.isAuth? props.login
            : <NavLink to={'/login'}> Login </NavLink>
          } 
        </div>
      </div>
    )
  }
 
  export default Header;