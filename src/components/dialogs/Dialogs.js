import DialogsCSS from './Dialogs.module.css';
import Itemsmany from './items/Itemsmany';
import DioMessages from './mesages/Messages';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

function Dialogs(props) {
  let state = props.messagesPage;

  let dilogsElements = state.dialogsData.map(dialog =>
    <Itemsmany names={dialog.names} id={dialog.id} key={dialog.id}/>,
  );

  let messagesElements = state.messagesData.map(message =>
    <DioMessages message={message.message} id={message.id} key={message.id}/>
  );

// let newMessagesPost = React.createRef();

 let addMessages = (values) => {
  props.addMessages(values.newMessageBody);
 }

//  let onPostChange = () => {
//   let messages = newMessagesPost.current.value;
//   props.updateNewPostMessage(messages);
// }


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


  // return (
  //   <div className={DialogsCSS.center}>
  //       <div className={DialogsCSS.dialogs}>
  //       {dilogsElements}
  //       </div>
  //       <div className={DialogsCSS.messages}>
  //         {messagesElements}
  //         <textarea className={DialogsCSS.textarea} ref={newMessagesPost} onChange={onPostChange} value={props.newPostMessage}/>
  //         <button className={DialogsCSS.but} onClick={addMessages}>Add message</button>
  //       </div>
  //   </div>
  // )