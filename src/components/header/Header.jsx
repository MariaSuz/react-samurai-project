import { NavLink } from 'react-router-dom';
import Headercss from'./Header.module.css';
import img from '../../assets/images/headerphoto.png';

function Header(props) {
    return (
      <div className = {Headercss.main_header}>
        <img className = {Headercss.main_header_img} src={img} alt='headerimg'/>
        <span>Samurai junior devops social network</span>
        <div className = {Headercss.login}>
          { props.isAuth
            ? <div className={Headercss.logindiv}> {props.login} <button className={Headercss.logout_button} onClick={props.getLogOut}>Logout</button> </div>
            : <NavLink to={'/login'}> Login </NavLink>
          } 
        </div>
      </div>
    )
  }
 
  export default Header;