import Preloader from '../../Common/Preloader/Preloader';
import ProfileInfoCSS from'./ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus.jsx';
import userPhoto from '../../../assets/images/user.png';
import ProfileEditForm from './ProfileEditForm.jsx';
import { useState } from 'react';
import ProfileForm from './ProfileForm.jsx';



function ProfileInfo(props) {

    let [editMode, setEditMode] = useState(false);

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
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData);
        // props.saveProfile(JSON.stringify(formData));
        // setEditMode(false);
        // props.profile(formData.name, formData.lookingJob, formData.professionalsSkils);
    }

    return (
        <div>
            <div className={ProfileInfoCSS.descriptionblock}>
                <span><b>Full Name:</b> {props.profile.fullName}</span>
                <span>{props.profile.aboutMe}</span>
                <img src={props.profile.photos.large || userPhoto} className={ProfileInfoCSS.userphoto} alt="user-photo" />
                {props.isOwner
                ? (  <div>
                        <input type = {'file'} onChange = {onMainPhotoSelected} id = 'input-file'/>
                        <label htmlFor="input-file">
                            <span className={ProfileInfoCSS.inputbtn}>Upload image</span>
                        </label>
                    </div>
                )
                : ('') }
                <ProfileStatus status={props.status} updateProfileStatus={props.updateProfileStatus}/>
                {/* <div>
                    <span>Looking for a job: {props.lookingForAJob ? 'yes' : 'no'} </span>
                 </div> */}
                {editMode
                    ? <ProfileEditForm initialValues = {props.profile} profile = {props.profile}   onSubmit = {onSubmit}/> //initialValues устаревшее особенность редакс формы
                    : <ProfileForm goToEditMode = { () => {setEditMode(true)} }  profile = {props.profile} isOwner = {props.isOwner}/>
                }
            </div>
        </div>
    )
  }


  export default ProfileInfo;