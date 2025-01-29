import React from 'react';
import Preloader from '../../Common/Preloader/Preloader.tsx';
import ProfileInfoCSS from'./ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus.tsx';
import userPhoto from '../../../assets/images/user.png';
import {ProfileEditForm} from './ProfileEditForm.tsx';
import { ChangeEvent, useState } from 'react';
import {ProfileForm} from './ProfileForm.tsx';
import { ProfileType } from '../../../types/types.js';
import { Box, Button, Modal, styled, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #4996f0',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    overflow: "auto" 
  };

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ProfileInfo: React.FC<PropsType> = (props) =>{

    let [editMode, setEditMode] = useState(false);

    //if proos.profile == null  либо undefined
    if (!props.profile) {
        return <Preloader />
    }

    const openModal = () => {
        setEditMode(true)
    };
    const closeModal = () => {
        setEditMode(false)
    };

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {  //Если файлы есть, то выполняем
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // props.saveProfile(formData);
        const sanitizedData = { ...formData };
        props.saveProfile(sanitizedData);
        setEditMode(false);
    }


    return (
        <Box sx={{ m: 2}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2, gap: 10}}>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h4" gutterBottom>
                        {props.profile.fullName}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <ProfileStatus status={props.status} updateProfileStatus={props.updateProfileStatus}/>
                    </Typography>
                </Box>
                <img src={props.profile.photos.large || userPhoto} className={ProfileInfoCSS.userphoto} alt="user-photo" />
            </Box>
            {props.isOwner
                ? (  <Box textAlign='center' sx={{ m: 1}}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload photo
                    <VisuallyHiddenInput
                      type="file"
                      onChange={onMainPhotoSelected}
                      multiple
                    />
                  </Button>
                </Box>)
                : ('') }
            {editMode
                ? (
                <Modal
                    open={editMode}
                    onClose={closeModal}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...styleModal, width: 400 }}>
                        <ProfileEditForm profile={props.profile} onSubmit={onSubmit} />
                    </Box>
                </Modal>
                ) : (
                <ProfileForm goToEditMode = {openModal}  profile = {props.profile} isOwner = {props.isOwner}/>)
            }
            {/* {editMode
                ? <ProfileEditForm initialValues = {props.profile} profile = {props.profile}   onSubmit = {onSubmit}/> //initialValues устаревшее особенность редакс формы
                : <ProfileForm goToEditMode = { () => {setEditMode(true)} }  profile = {props.profile} isOwner = {props.isOwner}/>
            } */}
        </Box>
    )
  }

  type PropsType = {
    profile: ProfileType | null
    status: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

  export default ProfileInfo;