import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileAPI} from "../api/propfile-api.ts";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";
// import { stopSubmit } from "redux-form";

//Начальное состояние
let initialState  = {
    postData: [
      {id: 1, message: 'Hello', likesCount: 0},
      {id: 2, message: 'I want car', likesCount: 4},
      {id: 3, message: 'I like JS', likesCount: 100},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string | null,
    userId: 31414 as number | null,
  };

export type initialStateType = typeof initialState

const profileReducer =  createSlice ({
  name: 'profile', //имя
  initialState,// начальное состояние
  reducers: { //набор редьюсеров
    addPost: (state, action: PayloadAction<string>) => {
      const newPost ={
        id: state.postData.length + 1,
        message: action.payload,
        likesCount: Math.floor(Math.random() * 100)
      }
      state.postData.push(newPost)
    },
    setUserProfile: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setprofileStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.postData = state.postData.filter(p => p.id !== action.payload);
    },
    savePhotoSuccess: (state, action: PayloadAction<PhotosType>) => {
      if (state.profile) {
        state.profile.photos = action.payload;
      }
    },
  }
})

// export const actions = { ...profileReducer.actions};
export const { addPost, setUserProfile, setUserId, setprofileStatus, deletePost, savePhotoSuccess } = profileReducer.actions;

//Old code Redux:
// const profileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
//     switch (action.type) {
//         case 'profile/ADD-POST': {
//             let mes = action.post;
//             return  {
//               ...state,
//               postData: [...state.postData, {id: 5, message: mes, likesCount: Math.floor(Math.random() * 100)}],
//             }
//               }
//         case 'profile/SET_USER_PROFILE': {
//           return {...state, profile: action.profile}
//         }
//         case 'profile/SET_USER_ID': {
//           return {...state, userId: action.userId}
//         }
//         case 'profile/SET_STATUS': {
//           return {...state, status: action.status}
//         }
//         case 'profile/DELETE_POST': {
//           return {...state, postData: state.postData.filter(p => p.id !== action.postId)}
//         }
//         case 'profile/SAVE_PHOTO': {
//           return {...state, profile: {...state.profile, photos: action.photos } as ProfileType}
//         }
//         default:
//             return state;
//     }
// }

// export const actions = {
// addPost: (post: string) => ({type: 'profile/ADD-POST', post} as const),
// setUserProfile: (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
// setUserId: (userId: number) => ({type: 'profile/SET_USER_ID', userId} as const),
// setprofileStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const),
// deletePost: (postId: number) => ({type: 'profile/DELETE_POST', postId} as const),
// savePhotoSuccess: (photos: PhotosType) => ({type: 'profile/SAVE_PHOTO', photos} as const)
// }

type ActionsTypes = InferActionsTypes<typeof profileReducer.actions>
export default profileReducer.reducer;
type ThunkType = BaseThunkType<ActionsTypes>;

export const profileMe = (userId: number):ThunkType => async (dispatch) => {
  let data = await profileAPI.getMe(userId);
  dispatch(setUserProfile(data));
}

export const profileStatus = (userId: number):ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId)
  dispatch(setprofileStatus(data));
}

export const updateProfileStatus = (status: string):ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0 ) {
    dispatch(setprofileStatus(status));}
}

export const savePhoto = (file: File):ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0 ) {
    dispatch(savePhotoSuccess(data.data.photos));}
}

export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId ; //Достаем стейт текущий getState и из него вытаскиваем ID для обновления профиля
  const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0 ) {
      if (userId != null) {
      dispatch(profileMe(userId))
      } else {
        throw new Error("userId can't be null")
      }
    } 
    // else {
    //   dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
    //   return Promise.reject(data.messages[0])
    // }
}