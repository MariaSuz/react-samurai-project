import { usersAPI } from "../api/users-api.ts";
import { updateObjectInArray } from "../utils/objects-helpers";
import { UsersType } from "../types/types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { ResponseType, ResultCodeEnum } from "../api/api.ts";
import { profileAPI } from "../api/propfile-api.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState = {
    users: [] as Array <UsersType>,
    pageSize: 9 as number,
    totalUsersCount: 21 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, // id юзеров,
    filter: {
      term: '',
      friend: null as null | boolean,
    },
    userStatus: '' as string,
  };

export type initialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = createSlice ({
  name: 'users',
  initialState,
  reducers: {
    followSuccess: (state, action: PayloadAction<number>) => {
      state.users = updateObjectInArray(state.users, action.payload, 'id', {followed:true});
    },
    unfollowSuccess: (state, action: PayloadAction<number>) => {
      state.users = updateObjectInArray(state.users, action.payload, 'id', {followed:false});
    },
    setUsers: (state, action: PayloadAction<Array<UsersType>>) => {
      state.users = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    settotalUsersCount: (state, action: PayloadAction<number>) => {
      state.totalUsersCount = action.payload;
    },
    toggleIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    togglefollowingInProgress: (state, action: PayloadAction<{ isFetching: boolean; userId: number }>) => {
      const { isFetching, userId } = action.payload;
      state.followingInProgress = isFetching
      ? [...state.followingInProgress, userId]
      : state.followingInProgress.filter(id => id !== userId)
    },
    getUserStatus: (state, action: PayloadAction<string>) => {
      state.userStatus = action.payload;
    },
  }
});

// const usersReducer = (state = initialState, action: ActionsTypes): initialStateType  => {
//   switch (action.type) {
//     case 'users/FOLLOW':
//       return {
//         ...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed:true})
//     }
//     case 'users/UNFOLLOW':
//       return {
//         ...state,
//       users: updateObjectInArray(state.users, action.userId, 'id', {followed:false})
//     }
//     case 'users/SET_USERS': {
//       return {...state, users: [...action.users]}
//     }
//     case 'users/SET_CURRENT_PAGE': {
//       return {...state, currentPage: action.currentPage}
//     }
//     case 'users/SET_TOTAL_USERS': {
//       return {...state, totalUsersCount: action.count}
//     }
//     case 'users/TOGGLE_IS_FETCHINGS': {
//       return {...state, isFetching: action.isFetching}
//     }
//     case 'users/SET_FILTER': {
//       return {...state, filter: action.payload}
//     }
//     case 'users/TOGGLE_IS_FOLLOWING_PROGRESS': {
//       return {...state,
//         followingInProgress: action.isFetching
//          ? [...state.followingInProgress, action.userId]
//          : state.followingInProgress.filter(id => id !== action.userId)
//         }
//     }
//     case 'users/STATUS_USER': {
//       return {...state, userStatus: action.userStatus}
//     }
//     default:
//       return state;
//   }
// }

type ActionsTypes = InferActionsTypes<typeof usersReducer.actions>;

// export const actions = {
//   followSuccess: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
//   unfollowSuccess: (userId: number)=> ({type: 'users/UNFOLLOW', userId} as const),
//   setUsers: (users: Array<UsersType>)=> ({type: 'users/SET_USERS', users} as const),
//   setCurrentPage: (currentPage: number)=> ({type: 'users/SET_CURRENT_PAGE', currentPage} as const),
//   setFilter: (filter: FilterType)=> ({type: 'users/SET_FILTER', payload: filter } as const),
//   settotalUsersCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_USERS', count: totalUsersCount} as const),
//   toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHINGS', isFetching} as const),
//   togglefollowingInProgress: (isFetching: boolean, userId:number) => ({type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),
//   getUserStatus: (userStatus: string) => ({type: 'users/STATUS_USER', userStatus} as const),
// }

export const {  followSuccess, unfollowSuccess, setUsers, setCurrentPage, setFilter, settotalUsersCount, toggleIsFetching, togglefollowingInProgress, getUserStatus  } = usersReducer.actions;



type GetStateType = () => AppStateType;
type ThunkType = BaseThunkType<ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>;

export const getUsersThunk = (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>{
  return async (dispatch, getState) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));
  dispatch(setFilter(filter));

  let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(settotalUsersCount(data.totalCount));
  }
}

export const usersStatus = (userId: number):ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId)
  dispatch(getUserStatus(data));
}

const _followUnfollowFlow = async (dispatch: DispatchType, userID: number,
  apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userID: number) => ActionsTypes) => {
  dispatch(togglefollowingInProgress(true, userID))
    let data = await apiMethod(userID);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(togglefollowingInProgress(false, userID));
}

export const follow = (userID: number): ThunkType  => {
  return async (dispatch) => {
    await  _followUnfollowFlow (dispatch, userID, usersAPI.postFollowerApi.bind(userID), followSuccess);
  }
}

export const unfollow = (userID: number): ThunkType  =>{
  return async (dispatch) => {
    await _followUnfollowFlow (dispatch, userID, usersAPI.deleteFollowerApi.bind(userID), unfollowSuccess);
  }
}

export default usersReducer.reducer;


