import MyPosts from './myposts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.state.postData}
             addPost={props.addPost} 
             newPostText={props.newPostText} 
             upDateNewPostTest={props.upDateNewPostTest}/>
        </div>
    )
}

export default Profile