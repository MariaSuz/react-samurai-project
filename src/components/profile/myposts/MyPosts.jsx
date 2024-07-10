import MyPostCss from'./MyPosts.module.css';
import Post1 from './Post/Post1';
import React from 'react';

// let postData = [
//   {id: 1, message: 'Hello', likesCount: 0},
//   {id: 2, message: 'I want car', likesCount: 110},
//   {id: 3, message: 'Hello', likesCount: 10},
//   {id: 4, message: 'Its my firts post', likesCount: 1},
// ]


function MyPost(props) {

  let posts = props.posts.map( p =>
    <Post1 message={p.message} likeCount={p.likesCount} id={p.id} key={p.id}/>
  );

  let newPostElement = React.createRef();

  let OnButtonClick = () => {
    props.addPost();
    //props.dispatch(addPostActionCreator()); в презентационной компоненте ничего не хочу знать о бизнесе 
  }
  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
    //let action = { type:'UPDATE-NEW-POST-TEXT', newText: text }; в презентационной компоненте ничего не хочу знать о бизнесе 
   // let action = updateNewPostTextActionCreator(text); в презентационной компоненте ничего не хочу знать о бизнесе 
   // props.dispatch(action) в презентационной компоненте ничего не хочу знать о бизнесе 
  }    
    return (
      <div>
        <div className={MyPostCss.text}>
          <textarea ref={newPostElement} value={props.newPostText} onChange={onPostChange}/>
          <button onClick={OnButtonClick}>Add post</button>
        </div>
        <div className={MyPostCss.mes}>
          {posts}
        </div>
      </div>
    )
  }

  export default MyPost;