import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import React from 'react';
import MyPosts from './MyPosts';


function MyPostContainer(props) {
  let state = props.store.getState();

  let OnButtonClick = () => {
    props.store.dispatch(addPostActionCreator());
  }

  let onPostChange = (text) => {
    let action = updateNewPostTextActionCreator(text);
    props.store.dispatch(action)
  }

    return (
      <MyPosts updateNewPostText={onPostChange} addPost={OnButtonClick} posts={state.profilePage.postData} newPostText={state.profilePage.newPostText}/>
    )
  }

  export default MyPostContainer;