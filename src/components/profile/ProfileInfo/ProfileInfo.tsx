import Preloader from '../../Common/Preloader/Preloader.tsx';
import ProfileInfoCSS from'./ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus.tsx';
import userPhoto from '../../../assets/images/user.png';
import ProfileEditForm from './ProfileEditForm.tsx';
import { ChangeEvent, useState } from 'react';
import ProfileForm from './ProfileForm.tsx';
import React from 'react';
import { ProfileType } from '../../../types/types.js';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: React.FC<PropsType> = (props) =>{

    let [editMode, setEditMode] = useState(false);

    //if proos.profile == null  либо undefined
    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {  //Если файлы есть, то выполняем
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData);
    }


    return (
        <div>
            <div className={ProfileInfoCSS.descriptionblock}>
                <span><b>Full Name:</b> {props.profile.fullName}</span>
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