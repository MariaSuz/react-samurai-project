import { connect } from 'react-redux';
import { addMessages} from '../../redux/dialogs-reducer.ts';
import Dialogs from './Dialogs';
import {withAuthRedidirect}  from '../../hoc/AuthRedirect';
import { compose } from 'redux';
import React from 'react';


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
    // newPostMessage: state.messagesPage.newPostMessage,
  }
}

// let mapDispatchToProps = (dispatch) => {
//   return {
//     // updateNewPostMessage: (messages) =>
//     //   {
//     //   let action = updateNewPostMessageActionCreator(messages);
//     //   dispatch(action);
//     // },
//     addMessagesClick: (newMessageBody) => {
//       dispatch(addMessagesActionCreator(newMessageBody));
//     }

//   }
// }

class DialogsContainer extends React.Component {

  render () {
      return (
          <Dialogs {...this.props}/>
      )
  }
}


export default compose(
  connect(mapStateToProps,  {addMessages}),
  withAuthRedidirect
)(DialogsContainer);





// let AuthRedirectComponent = withAuthRedidirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps) (AuthRedirectComponent);
// export default DialogsContainer;

// export default compose(
//   connect(mapStateToProps,mapDispatchToProps),
//   withAuthRedidirect
// )(Dialogs);