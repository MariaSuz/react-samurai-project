import DialogsCSS from './Dialogs.module.css';
import Itemsmany from './items/Itemsmany';
import DioMessages from './mesages/Messages';
import React from 'react';

function Dialogs(props) {
  let dilogsElements = props.state.dialogsData.map(dialog => 
    <Itemsmany names={dialog.names} id={dialog.id}/>,
  );
  
  let messagesElements = props.state.messagesData.map(message =>
    <DioMessages message={message.message} id={message.id}/>
  );

let newMessagesPost = React.createRef(); 
  
 let addMessages = () => { 
  props.dispatch({ type:'ADD-MESSAGES' });
 }

 let onPostChange = () => {
  let messages = newMessagesPost.current.value;
  props.dispatch({ type:'UPDATE-NEW-POST-MESSAGES', newText: messages });
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