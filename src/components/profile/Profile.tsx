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
        <Container>
            <Grid2 container alignItems="center" direction="row">
            <ProfileInfo {...props} />
            <MyPosts />
            </Grid2>
        </Container>
    )
}

export default Profile