import MyPostsContainer from './myposts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            {/* <MyPostsContainer store={props.store}/> */}
            <MyPostsContainer />
        </div>
    )
}

export default Profile