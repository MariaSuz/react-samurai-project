import MyPosts from './myposts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.state.postData}
             dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile