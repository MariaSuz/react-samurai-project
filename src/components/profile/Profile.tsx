import { ProfileType } from '../../types/types';
import MyPostsContainer from './myposts/MyPostsContainer.tsx';
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
        <div>
            <ProfileInfo {...props} />
            <MyPostsContainer {...props}/>
        </div>
    )
}

export default Profile