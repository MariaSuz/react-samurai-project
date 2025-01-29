import { Container, Grid, Grid2 } from '@mui/material';
import { ProfileType } from '../../types/types';
import MyPosts from './myposts/MyPosts.tsx';
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx';
import React from 'react';


export type PropsType = {
    profile: ProfileType | null
    status: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile:React.FC<PropsType> = (props) => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column',  alignItems: 'center' }}>
            <ProfileInfo {...props} />
            <MyPosts />
        </Container>
    )
}

export default Profile