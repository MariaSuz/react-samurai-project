import { profileAPI } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_ID = 'profile/SET_USER_ID';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';


let initialState = {
    postData: [
      {id: 1, message: 'Hello', likesCount: 0},
      {id: 2, message: 'I want car', likesCount: 110},
      {id: 3, message: 'Hello', likesCount: 10},
      {id: 4, message: 'Its my firts post', likesCount: 1},
    ],
    newPostText: 'Hi',
    profile: null,
    userId: 31414,
    status: '',
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
            let mes = action.post;
            return  {
              ...state,
              postData: [...state.postData, {id: 5, message: mes,likesCount: 0}],
            }
              }
        case SET_USER_PROFILE: {
          return {...state, profile: action.profile}
        }
        case SET_USER_ID: {
          return {...state, userId: action.userId}
        }
        case SET_STATUS: {
          return {...state, status: action.status}
        }
        case DELETE_POST: {
          return {...state, postData: state.postData.filter(p => p.id != action.postId)}
        }
        default:
            return state;
    }
}


// export let addPostActionCreator = () => {
//     return {
//       type: ADD_POST
//     }
//   }

export let addPost = (post)=> ({type: ADD_POST, post})

export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export let setUserId = (userId) => ({type: SET_USER_ID, userId})

export let setprofileStatus = (status) => ({type: SET_STATUS, status})

export let deletePost = (postId) => ({type: DELETE_POST, postId})



export default profileReducer;


export const profileMe = (userId) => async (dispatch) => {
  let response = await profileAPI.getMe(userId);
  dispatch(setUserProfile(response.data));
}

export const profileStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setprofileStatus(response.data));
}

export const updateProfileStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0 ) {
    dispatch(setprofileStatus(status));}
}