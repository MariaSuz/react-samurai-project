import { initialStateType } from '../../redux/dialogs-reducer';
import DialogsCSS from './Dialogs.module.css';
import Itemsmany from './items/Itemsmany.tsx';
import DioMessages from './mesages/Messages.tsx';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

type OwnPropsType = {
  messagesPage: initialStateType
  addMessages: (newMessageBody: string) => void
}

const Dialogs:React.FC<OwnPropsType> = (props) => {
  let state = props.messagesPage;

  let dilogsElements = state.dialogsData.map(dialog =>
    <Itemsmany names={dialog.names} id={dialog.id} key={dialog.id}/>,
  );

  let messagesElements = state.messagesData.map(message =>
    <DioMessages message={message.message} key={message.id}/>
  );


 let addMessages = (values: {newMessageBody: string}) => {
  props.addMessages(values.newMessageBody);
 }


const DialogsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {/* <textarea className={DialogsCSS.textarea} ref={newMessagesPost} onChange={onPostChange} value={props.newPostMessage}/> */}
      <Field placeholder='Enter your message'  name='newMessageBody' component='textarea' className={DialogsCSS.textarea} />
      <p><button className={DialogsCSS.but}>Add message</button></p>
    </form>
  )
}
  const DialogsReduxForm = reduxForm({form: 'dialog'})(DialogsForm)

  return (
    <div className={DialogsCSS.center}>
        <div className={DialogsCSS.dialogs}>
        {dilogsElements}
        </div>
        <div className={DialogsCSS.messages}>
          {messagesElements}
          <DialogsReduxForm onSubmit={addMessages}/>
        </div>
    </div>
  )
}

  export default Dialogs;

