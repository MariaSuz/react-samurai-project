import { Field, reduxForm } from 'redux-form';
import MyPostCss from'./MyPosts.module.css';
import Post from './Post/Post.tsx';
import React from 'react';
import { requuiredField, maxLengthCreator } from '../../../utils/validators/validators.ts';
import { Textarea } from '../../Common/FormsControls/FormsControls.tsx';
import { PostType } from '../../../types/types.ts';

export type MapPropsType = {
  posts: Array<PostType>
}
export type DispatchPropsType = {
  addPost: (posts: string) => void
}

const MyPost: React.FC<MapPropsType & DispatchPropsType> = props => {
  let postsElements = [...props.posts].map( p =>
    <Post message={p.message} likeCount={p.likesCount}  key={p.id}/>
  );

  let addPost = (values) => {
      props.addPost(values.posts);
  }


  const PostsForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div className={MyPostCss.text}>
          {/* <textarea ref={newPostElement} value={props.newPostText} onChange={onPostChange}/> */}
          <Field placeholder={'Add post'} name={'posts'} component={Textarea}
          validate ={[ requuiredField, maxLengthCreator(30) ]}/>
          <button>Add post</button>
        </div>
      </form>
    )
  }

  const PostsReduxForm = reduxForm({form: 'postsAdd'})(PostsForm)

    return (
        <div>
            <PostsReduxForm onSubmit={addPost}/>
          <div className={MyPostCss.mes}>
            {postsElements}
          </div>
        </div>
      )
}

  export default MyPost;
