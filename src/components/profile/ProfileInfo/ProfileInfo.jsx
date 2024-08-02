import Preloader from '../../Common/Preloader/Preloader';
import ProfileInfoCSS from'./ProfileInfo.module.css';


function ProfileInfo(props) {
    //if proos.profile == null  либо undefined
    if (!props.profile) {
        return <Preloader />
    }

    // let contacts = props.profile.contacts;
    // Object.keys(contacts).forEach(function(key) {
    //     if(contacts[key] === null) {
    //         contacts[key] = 'none';
    //     }
    // })
 
    return (
        <div>
            <div className={ProfileInfoCSS.imgsize}>
                <img  src="https://static.tildacdn.com/tild6264-3139-4434-b338-326438393932/kisspng-nissan-leaf-.png" alt='descripshionphoto'></img>
            </div>
            <div className={ProfileInfoCSS.descriptionblock}>
                <span>some description </span>
                <span><b>My fullname:</b> {props.profile.fullName}</span>
                <span><b>Work:</b> {props.profile.lookingForAJobDescription}</span>
                <span>{props.profile.aboutMe}</span>
                <img src={props.profile.photos.large} className={ProfileInfoCSS.userphoto} alt="user-photo" />
                <span>contacts:</span>
                <ul>
                    <li>facebook: {props.profile.contacts.facebook}</li>
                    <li>website: {props.profile.contacts.website}</li>
                    <li>VK: {props.profile.contacts.vk}</li>
                    <li>website: {props.profile.contacts.website}</li>
                </ul>

            </div>
        </div>
    )
  }

  export default ProfileInfo;