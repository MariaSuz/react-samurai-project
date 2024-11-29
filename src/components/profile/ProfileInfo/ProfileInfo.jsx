import Preloader from '../../Common/Preloader/Preloader';
import ProfileInfoCSS from'./ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus.jsx';
import userPhoto from '../../../assets/images/user.png';


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
            <div className={ProfileInfoCSS.descriptionblock}>
                <span>some description </span>
                <span><b>My fullname:</b> {props.profile.fullName}</span>
                <span><b>Work:</b> {props.profile.lookingForAJobDescription}</span>
                <span>{props.profile.aboutMe}</span>
                <img src={props.profile.photos.large || userPhoto} className={ProfileInfoCSS.userphoto} alt="user-photo" />
                {props.isOwner && <input type = {'file'} />}
                <ProfileStatus status={props.status} updateProfileStatus={props.updateProfileStatus}/>
                <span>contacts:</span>
                <ul>
                    <li>facebook: {props.profile.contacts.facebook}</li>
                    <li>VK: {props.profile.contacts.vk}</li>
                    <li>website: {props.profile.contacts.website}</li>
                </ul>

            </div>
        </div>
    )
  }

  export default ProfileInfo;