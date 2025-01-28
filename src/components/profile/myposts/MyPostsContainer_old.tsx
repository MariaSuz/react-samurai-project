import { compose } from 'redux';
import { actions } from '../../../redux/profile-reducer.ts';
import MyPosts, { MapPropsType, DispatchPropsType } from './MyPosts.tsx';
import { connect } from 'react-redux';
import React from 'react';
import { AppStateType } from '../../../redux/redux-store.ts';


let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.postData,
  }
}


class MyPostsContainer extends React.Component<MapPropsType & DispatchPropsType> {

  render () {
      return (
          <MyPosts {...this.props}/>
      )
  }
}


export default compose(
  connect(mapStateToProps,  {...actions})
)(MyPostsContainer);




// Было: 
// import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
// //import React from 'react';
// import MyPosts from './MyPosts';
// import { connect } from 'react-redux';


// // function MyPostContainer() {
// //   //let state = props.store.getState();

// //     return (
// //       <StoreContext.Consumer>
// //         {
// //         (store) => {
// //           let state = store.getState();
// //           let OnButtonClick = () => {
// //             store.dispatch(addPostActionCreator());
// //           }

// //           let onPostChange = (text) => {
// //             let action = updateNewPostTextActionCreator(text);
// //             store.dispatch(action)
// //           }

// //           return <MyPosts updateNewPostText={onPostChange}
// //             addPost={OnButtonClick}
// //             posts={state.profilePage.postData}
// //             newPostText={state.profilePage.newPostText}/>
// //             }
// // }
// //         </StoreContext.Consumer>
// //     )
// //   }

// let mapStateToProps = (state) => {
//   return {
//     posts: state.profilePage.postData,
//     newPostText:state.profilePage.newPostText
//   } 
// }

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: () => {
//       dispatch(addPostActionCreator());
//     },
//     updateNewPostText: (text) => {
//       let action = updateNewPostTextActionCreator(text);
//       dispatch(action)
//     }
//   }
// }

// const MyPostContainer = connect(mapStateToProps,mapDispatchToProps) (MyPosts);

//   export default MyPostContainer;