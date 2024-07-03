import ProfileInfoCSS from'./ProfileInfo.module.css';


function ProfileInfo(props) {
 
    return (
        <div>
            <div className={ProfileInfoCSS.imgsize}>
                <img  src="https://static.tildacdn.com/tild6264-3139-4434-b338-326438393932/kisspng-nissan-leaf-.png" alt='descripshionphoto'></img>
            </div>
            <div className="descriptionblock">
                some description (///////)
            </div>
        </div>
    )
  }

  export default ProfileInfo;