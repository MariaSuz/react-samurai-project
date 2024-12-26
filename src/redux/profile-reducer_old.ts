import { profileAPI} from "../api/propfile-api.ts";
import { PhotosType, PostType, ProfileType } from "../types/types.ts";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_ID = 'profile/SET_USER_ID';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO = 'profile/SAVE_PHOTO';

let initialState  = {
    postData: [
      {id: 1, message: 'Hello', likesCount: 0},
      {id: 2, message: 'I want car', likesCount: 110},
      {id: 3, message: 'Hello', likesCount: 10},
      {id: 4, message: 'Its my firts post', likesCount: 1},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string | null,
    userId: 31414 as number | null,
  };


export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
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
          return {...state, postData: state.postData.filter(p => p.id !== action.postId)}
        }
        case SAVE_PHOTO: {
          return {...state, profile: {...state.profile, photos: action.photos } as ProfileType}
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

type addPostActionType = {
  type: typeof ADD_POST,
  post: string
}
type setUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}
type setUserIdActionType = {
  type: typeof SET_USER_ID,
  userId: number
}
type setprofileStatusActionType = {
  type: typeof SET_STATUS,
  status: string
}
type deletePostActionType = {
  type: typeof DELETE_POST,
  postId: number
}
type savePhotoSuccessctionType = {
  type: typeof SAVE_PHOTO,
  photos: PhotosType
}

export let addPost = (post: string): addPostActionType => ({type: ADD_POST, post})

export let setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})

export let setUserId = (userId: number): setUserIdActionType => ({type: SET_USER_ID, userId})

export let setprofileStatus = (status: string): setprofileStatusActionType => ({type: SET_STATUS, status})

export let deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId})

export let savePhotoSuccess = (photos: PhotosType): savePhotoSuccessctionType => ({type: SAVE_PHOTO, photos})



export default profileReducer;


export const profileMe = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getMe(userId);
  dispatch(setUserProfile(response.data));
}

export const profileStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setprofileStatus(response.data));
}

export const updateProfileStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0 ) {
    dispatch(setprofileStatus(status));}
}

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0 ) {
    dispatch(savePhotoSuccess(response.data.data.photos));}
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  debugger
  const userId = getState().auth.userId ; //Достаем стейт текущий getState и из него вытаскиваем ID для обновления профиля
  let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0 ) {
    dispatch(profileMe(userId));}
}