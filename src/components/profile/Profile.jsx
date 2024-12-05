import MyPostsContainer from './myposts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo {...props} />
            {/* <MyPostsContainer store={props.store}/> */}
            <MyPostsContainer profile={props.profile}/>
        </div>
    )
}

export default Profile