import { addMessagesActionCreator, updateNewPostMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import React from 'react';

function DialogsContainer(props) {
  let state = props.store.getState().messagesPage;

 let addMessages = () => {
  props.store.dispatch(addMessagesActionCreator());
 }

 let onPostChange = (messages) => {
  let action = updateNewPostMessageActionCreator(messages);
  props.store.dispatch(action);
}

  return <Dialogs messagesPage={state} addMessagesClick={addMessages} updateNewPostMessage={onPostChange}/>

}

  export default DialogsContainer;