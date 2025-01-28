import React from 'react';
import Post from './Post/Post.tsx';
import { PostType } from '../../../types/types.ts';
import { Form, Formik, FormikHelpers } from 'formik';
import { Box, Button, Container, TextField } from '@mui/material';
import { maxLengthCreator } from '../../../utils/validators/validators.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsProfile } from '../../../redux/users-selectors.ts';
import { AppDispatch } from '../../../redux/redux-store.ts';
import { actions } from '../../../redux/profile-reducer.ts';

const PostsForm:React.FC<PostsFormProps> = ({addPost}) => {
  const submit = (values: MyPostsFormValuesType, {setSubmitting}: FormikHelpers<MyPostsFormValuesType>) => {
          addPost(values.newPostText);
          setSubmitting(false);
      };

      const usersSearchFormValidate = (values: MyPostsFormValuesType) => {
          const errors: Partial<MyPostsFormValuesType> = {};
          if (!values.newPostText) {
            errors.newPostText = 'Required';
          }
          else if (values.newPostText.length > 15) {
            errors.newPostText = 'Max length is 15 symbols';
          }
          //else if (maxLengthCreator(15)) {
          //   errors.newPostText = 'Max length is 15 symbols';
          // }
          return errors;
      };
  return (
    <Formik
      initialValues = {{ newPostText: ''}}
      validate = {usersSearchFormValidate}
      onSubmit = {submit}
      >
        {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <TextField
                    label="My posts"
                    variant="outlined"
                    name="newPostText"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.newPostText && errors.newPostText)}
                    helperText={touched.newPostText && errors.newPostText}
                    sx={{mb: 2}}
                />
            <Button style={{maxWidth: '280px'}} type="submit" disabled={isSubmitting} variant="contained">Add post</Button>
          </Form>
        )}
        </Formik>
  )
}


const MyPosts: React.FC = () => {
  const posts = useSelector(getPostsProfile)
  const dispatch:AppDispatch = useDispatch()

  const addPost = (newPostText: string ) => {
    dispatch(actions.addPost(newPostText))
  }

  let postsElements = [...posts].map( p =>
    <Post message={p.message} likeCount={p.likesCount}  key={p.id}/>
  );

  return (
    <Container >
        <PostsForm addPost = {addPost} />
        <Box sx={{  maxWidth: 280, display: 'flex', flexDirection: 'column',  alignItems: 'center', gap: 1,  m: 4}}>
          {postsElements}
        </Box>
    </Container>
    )
}

type MyPostsFormValuesType = {
  newPostText: string
}
type PostsFormProps = {
  addPost: (newPostText: string) => void,
}

export default MyPosts;
