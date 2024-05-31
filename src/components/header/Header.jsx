import Headercss from'./Header.module.css';

function Header() {
    return (
     <div className = {Headercss.main_header}>
      <img className = {Headercss.main_header_img} src="https://mychatte.ru/upload/iblock/31d/31d6b4d0766e973d25abebc4d4acc0ae.png" alt='headerimg'/>
      <span>My firts React project (social network)</span> 
      </div>
    )
  }

  export default Header;