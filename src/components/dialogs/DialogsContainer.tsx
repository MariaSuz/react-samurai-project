import { connect } from 'react-redux';
import { actions } from '../../redux/dialogs-reducer.ts';
import Dialogs from './Dialogs.tsx';
import withAuthRedidirect from '../../hoc/AuthRedirect.js';
import { compose } from 'redux';
import React from 'react';
import { AppStateType } from '../../redux/redux-store.ts';


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
let mapStateToProps = (state:AppStateType) => {
  return {
    messagesPage: state.messagesPage,
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
  connect(mapStateToProps,  {...actions}),
  withAuthRedidirect
)(DialogsContainer);





// let AuthRedirectComponent = withAuthRedidirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps) (AuthRedirectComponent);
// export default DialogsContainer;

// export default compose(
//   connect(mapStateToProps,mapDispatchToProps),
//   withAuthRedidirect
// )(Dialogs);