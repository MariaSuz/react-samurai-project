
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_ID = 'SET_USER_ID';


let initialState = {
    postData: [
      {id: 1, message: 'Hello', likesCount: 0},
      {id: 2, message: 'I want car', likesCount: 110},
      {id: 3, message: 'Hello', likesCount: 10},
      {id: 4, message: 'Its my firts post', likesCount: 1},
    ],
    newPostText: 'Hi',
    profile: null,
    userId: 2
  };

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            // let newPost = {
            //     id: 5,
            //     message: state.newPostText,
            //     likesCount: 0
            //     };
            // let stateCopy = {...state};
            // stateCopy.postData = [...state.postData];
            // stateCopy.postData.push(newPost);
            // stateCopy.newPostText = '';
            // return stateCopy;
                // ...state,
                // postData:[...state.postData, newPost],
            //state.postData.push(newPost);
            let mes = state.newPostText;
            return  {
              ...state,
              postData: [...state.postData, {id: 5, message: mes,likesCount: 0}],
              newPostText: ''
            }
              }
        case UPDATE_NEW_POST_TEXT: {
              // let stateCopy = {...state};
              // stateCopy.newPostText = action.newText;
              // return stateCopy;
              return {
                ...state,
                newPostText: action.newText
              }
        }
        case SET_USER_PROFILE: {
          return {...state, profile: action.profile}
        }
        case SET_USER_ID: {
          return {...state, userId: action.userId}
        }
        default:
            return state;
    }
    // if (action.type === ADD_POST) {
    //     let newPost = {
    //     id: 5,
    //     // id: length(state.profilePage.postData)-1,
    //     message: state.newPostText,
    //     likesCount: 0
    //     }
    //    state.postData.push(newPost);
    //    state.newPostText = '';
    // } else if (action.type === UPDATE_NEW_POST_TEXT) {
    //     state.newPostText = action.newText; 
    // }     
    // return state;
}


export let addPostActionCreator = () => {
    return {
      type: ADD_POST
    }
  }
export let updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});

export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export let setUserId = (userId) => ({type: SET_USER_ID, userId})

export default profileReducer;