import { usersAPI } from "../api/users-api.ts";
import { updateObjectInArray } from "../utils/objects-helpers";
import { UsersType } from "../types/types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { ResponseType } from "../api/api.ts";

let initialState = {
    users: [] as Array <UsersType>,
    pageSize: 5 as number,
    totalUsersCount: 21 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number> // id юзеров
  };

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType  => {
  switch (action.type) {
    case 'users/FOLLOW':
      return {
        ...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed:true})
    }
    case 'users/UNFOLLOW':
      return {
        ...state,
      users: updateObjectInArray(state.users, action.userId, 'id', {followed:false})
    }
    case 'users/SET_USERS': {
      return {...state, users: [...action.users]}
    }
    case 'users/SET_CURRENT_PAGE': {
      return {...state, currentPage: action.currentPage}
    }
    case 'users/SET_TOTAL_USERS': {
      return {...state, totalUsersCount: action.count}
    }
    case 'users/TOGGLE_IS_FETCHINGS': {
      return {...state, isFetching: action.isFetching}
    }
    case 'users/TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {...state,
        followingInProgress: action.isFetching
         ? [...state.followingInProgress, action.userId]
         : state.followingInProgress.filter(id => id !== action.userId)
        }
    }
    default:
      return state;
  }
}

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  followSuccess: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
  unfollowSuccess: (userId: number)=> ({type: 'users/UNFOLLOW', userId} as const),
  setUsers: (users: Array<UsersType>)=> ({type: 'users/SET_USERS', users} as const),
  setCurrentPage: (currentPage: number)=> ({type: 'users/SET_CURRENT_PAGE', currentPage} as const),
  settotalUsersCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_USERS', count: totalUsersCount} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHINGS', isFetching}as const),
  togglefollowingInProgress: (isFetching: boolean, userId:number) => ({type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

type GetStateType = () => AppStateType;
type ThunkType = BaseThunkType<ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>;

export const getUsersThunk = (currentPage: number, pageSize: number): ThunkType =>{
  return async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(currentPage));

  let data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.settotalUsersCount(data.totalCount));
  }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userID: number, apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userID: number) => ActionsTypes) => {
  dispatch(actions.toggleIsFetching(true))
    let response = await apiMethod(userID);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(actions.togglefollowingInProgress(false, userID));
}

export const follow = (userID: number): ThunkType  => {
  return async (dispatch) => {
    await  _followUnfollowFlow (dispatch, userID, usersAPI.postFollowerApi.bind(userID), actions.followSuccess);
  }
}

export const unfollow = (userID: number): ThunkType  =>{
  return async (dispatch) => {
    await _followUnfollowFlow (dispatch, userID, usersAPI.deleteFollowerApi.bind(userID), actions.unfollowSuccess);
  }
}

export default usersReducer;


