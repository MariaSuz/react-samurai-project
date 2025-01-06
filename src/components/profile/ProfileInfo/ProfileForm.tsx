
import { ProfileType } from '../../../types/types';
import ProfileInfoCSS from'./ProfileInfo.module.css';
import React from 'react';

type PropsType = {
    profile: ProfileType | null,
    isOwner: boolean
}

const ProfileForm: React.FC<PropsType> = (props) => {
    return (
        <div>
            <form>
                <div className={ProfileInfoCSS.description}>
                    <div>
                        <span>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}</span>
                    </div>
                    <div>
                        <span>About skills: {props.profile.lookingForAJobDescription}</span>
                    </div>
                    <div>
                        <span>About me: {props.profile.aboutMe}</span>
                    </div>
                    <div className={ProfileInfoCSS.descriptionblock}>
                        <span>contacts:</span>
                    </div>
                    <div className={ProfileInfoCSS.descriptionblock}>
                        <ul>
                            {Object.keys(props.profile.contacts).map(key => {
                                return <Contact key={key} title={key} value={props.profile.contacts[key]}/>
                            })}
                        </ul>
                    </div>
                </div>
            </form>
            {props.isOwner &&
                <button onClick = {props.goToEditMode} className={ProfileInfoCSS.button_contacts}>Refresh profile</button>}
        </div>
    )
  }

  const Contact =  ({title, value}) => {
    return <li>{title}: {value}</li>
  }

  export default ProfileForm;