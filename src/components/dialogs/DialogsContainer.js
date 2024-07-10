import { connect } from 'react-redux';
import { addMessagesActionCreator, updateNewPostMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';



// function DialogsContainer() {
//   return <StoreContext.Consumer>
//      {
//     (store) => {
//     let state = store.getState().messagesPage;

//     let addMessages = () => {
//       store.dispatch(addMessagesActionCreator());
//   }

//     let onPostChange = (messages) => {
//       let action = updateNewPostMessageActionCreator(messages);
//       store.dispatch(action);
//   }
//     return <Dialogs messagesPage={state} addMessagesClick={addMessages} updateNewPostMessage={onPostChange} />
//   }
// }
//   </StoreContext.Consumer>
// }
let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
    newPostMessage: state.messagesPage.newPostMessage
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostMessage: (messages) =>
      {
      let action = updateNewPostMessageActionCreator(messages);
      dispatch(action);
    },
    addMessagesClick: () => {
      dispatch(addMessagesActionCreator());
    }

  }
}

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps) (Dialogs);

export default DialogsContainer;