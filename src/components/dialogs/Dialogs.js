import DialogsCSS from './Dialogs.module.css';
import Itemsmany from './items/Itemsmany';
import DioMessages from './mesages/Messages';
import React from 'react';

function Dialogs(props) {
  let state = props.messagesPage;

  let dilogsElements = state.dialogsData.map(dialog => 
    <Itemsmany names={dialog.names} id={dialog.id} key={dialog.id}/>,
  );
  
  let messagesElements = state.messagesData.map(message =>
    <DioMessages message={message.message} id={message.id} key={message.id}/>
  );

let newMessagesPost = React.createRef(); 

 let addMessages = () => {
  props.addMessagesClick();
 }

 let onPostChange = () => {
  let messages = newMessagesPost.current.value;
  props.updateNewPostMessage(messages);
}

  return (
    <div className={DialogsCSS.center}>
        <div className={DialogsCSS.dialogs}>
        {dilogsElements}
        </div>
        <div className={DialogsCSS.messages}>
          {messagesElements}
          <textarea className={DialogsCSS.textarea} ref={newMessagesPost} onChange={onPostChange} value={props.newPostMessage}/>
          <button className={DialogsCSS.but} onClick={addMessages}>Add message</button>
        </div>
    </div>
  )
}

  export default Dialogs;