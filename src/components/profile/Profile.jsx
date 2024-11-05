import MyPostsContainer from './myposts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateProfileStatus={props.updateProfileStatus}/>
            {/* <MyPostsContainer store={props.store}/> */}
            <MyPostsContainer profile={props.profile}/>
        </div>
    )
}

export default Profile