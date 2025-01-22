import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { getDialogs } from '../../redux/users-selectors.ts';
import Itemsmany from './items/Itemsmany.tsx';
import DioMessages from './mesages/Messages.tsx';
import React from 'react';
import { AppDispatch } from '../../redux/redux-store.ts';
import { actions } from '../../redux/dialogs-reducer.ts';
import { Box, Container, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Field, Form, Formik, FormikHelpers } from 'formik';


export const Dialogs:React.FC = (props) => {

  const dialogState = useSelector(getDialogs)
  const dispatch:AppDispatch = useDispatch()

  let dilogsElements = dialogState.dialogsData.map(dialog =>
    <Itemsmany names={dialog.names} id={dialog.id} key={dialog.id}/>,
  );

  let messagesElements = dialogState.messagesData.map(message =>
    <DioMessages message={message.message} key={message.id}/>
  );

  let addMessages = (values: { newMessageBody: string }) => {
    dispatch(actions.addMessages(values.newMessageBody));
  };


  const DialogsForm = (props) => {
    const submit = (values: { newMessageBody: string}, {setSubmitting}: FormikHelpers<{newMessageBody: string}>) => {
        addMessages(values)
        };

        const usersSearchFormValidate = (values: any) => {
            const errors = {}
            return errors
        };

    return (
      <Formik
      initialValues = {{ newMessageBody: ''}}
      validate = {usersSearchFormValidate}
      onSubmit = {submit}
      >
      {({ isSubmitting, setFieldValue }) => (
          <Form>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                    onChange={(event) => setFieldValue("newMessageBody", event.target.value)} 
                    type="text"
                    label="Some text"
                  />
              </Box>
              <Button type="submit" disabled={isSubmitting} variant="contained" >Add message</Button>
          </Form>
      )}
      </Formik>
    )
  }

  return (
    <Box>
        <Container>
          <Stack direction="row" spacing={2}>
            <Box>
              {dilogsElements}
            </Box>
            <Box>
              {messagesElements}
            </Box>
          </Stack>
          <DialogsForm />
        </Container>
      </Box>
  )
}


