import { usersAPI } from "../api/api.ts";
import { updateObjectInArray } from "../utils/objects-helpers.js";
import { UsersType } from "../types/types.ts";
import { AppStateType } from "./redux-store.ts";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW ='users/UNFOLLOW';
const SET_USERS ='users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'users/SET_TOTAL_USERS';
const TOGGLE_IS_FETCHINGS = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [
      // {id: 1, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: true, fullname: 'Galya', status: 'like cats', location: {city: 'Minsk', country: 'Belarus'}},
      // {id: 2, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: true, fullname: 'Mariia', status: 'I give fitness lessons', location: {city: 'Samara', country: 'Russia'}},
      // {id: 3, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: false, fullname: 'Daniel', status: 'I teach football', location: {city: 'Madrid', country: 'Span'}},
      // {id: 4, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: false, fullname: 'Ingrid', status: 'I like JS', location: {city: 'Berlin', country: 'Germany'}},
      // {id: 5, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: false, fullname: 'Francisco', status: 'work at the factory', location: {city: 'Lisbon', country: 'Portugal'}},
      // {id: 6, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: false, fullname: 'Sakura', status: 'just registered', location: {city: 'Tokyo', country: 'Japan'}},
    ] as Array <UsersType>,
    pageSize: 5 as number,
    totalUsersCount: 21 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number > // id юзеров
  };

  export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes):initialStateType  => {
  switch (action.type) {
    case FOLLOW:
      // return {
      //   ...state,
      //  // users:[...state.users] идентично  users: state.users.map(user => user)
      //  users: state.users.map(us => {
      //   if(us.id === action.userId) {
      //     return {...us, followed:true}
      //   }
      //   return us;
      // })
      return {
        ...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed:true})
    }
    case UNFOLLOW:
      return {
        ...state,
       // users:[...state.users] идентично  users: state.users.map(user => user)
      //  users: state.users.map(us => {
      //   if(us.id === action.userId) {
      //     return {...us, followed:false}
      //   }
      //     return us;
      // })
      users: updateObjectInArray(state.users, action.userId, 'id', {followed:false})
    }
    case SET_USERS: {
      return {...state, users: [...action.users]}
    }
    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.currentPage}
    }
    case SET_TOTAL_USERS: {
      return {...state, totalUsersCount: action.count}
    }
    case TOGGLE_IS_FETCHINGS: {
      return {...state, isFetching: action.isFetching}
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

type ActionsTypes = followSuccessActionType | unfollowSuccessActionType | setUsersActionType | setCurrentPageActionType
 | settotalUsersCountActionType | toggleIsFetchingActionType | togglefollowingInProgressActionType;

type followSuccessActionType = {
  type: typeof FOLLOW,
  userId: number
}
type unfollowSuccessActionType = {
  type: typeof UNFOLLOW,
  userId: number
}
type setUsersActionType = {
  type: typeof SET_USERS,
  users: Array<UsersType>
}
type setCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number
}
type settotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS,
  count: number
}
type toggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHINGS,
  isFetching: boolean
}
type togglefollowingInProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching: boolean,
  userId: number
}

export const followSuccess = (userId: number): followSuccessActionType => ({type: FOLLOW, userId})  //ActionCreator 
export const unfollowSuccess = (userId: number):  unfollowSuccessActionType => ({type: UNFOLLOW, userId})
export const setUsers = (users: Array<UsersType>): setUsersActionType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})
export const settotalUsersCount = (totalUsersCount: number): settotalUsersCountActionType => ({type: SET_TOTAL_USERS, count: totalUsersCount})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHINGS, isFetching})
export const togglefollowingInProgress = (isFetching: boolean, userId: number):togglefollowingInProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

type ThunkType =  ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>;

export const getUsersThunk = (currentPage: number, pageSize: number): ThunkType =>{
  return async (dispatch, getState) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));

  let data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(settotalUsersCount(data.totalCount));
  }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userID: number, apiMethod: any, actionCreator: (userID: number) => followSuccessActionType | unfollowSuccessActionType) => {
  dispatch(toggleIsFetching(true))
    let response = await apiMethod(userID);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(togglefollowingInProgress(false, userID));
}

//сократили это в 1

// export const follow = (userID) => {
//   return async (dispatch) => {
//     dispatch(toggleIsFetching(true, userID))
//     let response = await usersAPI.postFollowerApi(userID)
//     if (response.data.resultCode === 0) {
//         dispatch(followSuccess(userID));
//     }
//     dispatch(togglefollowingInProgress(false, userID));
//   }
// }

// export const unfollow = (userID) =>{
//   return async (dispatch) => {
//     dispatch(toggleIsFetching(true, userID))
//     let response = await usersAPI.deleteFollowerApi(userID)
//     if (response.data.resultCode === 0) {
//         dispatch(unfollowSuccess(userID));
//     }
//     dispatch(togglefollowingInProgress(false, userID));
//   }
// }

export const follow = (userID: number): ThunkType  => {
  return async (dispatch) => {
    _followUnfollowFlow (dispatch, userID, usersAPI.postFollowerApi.bind(userID), followSuccess);
  }
}

export const unfollow = (userID: number): ThunkType  =>{
  return async (dispatch) => {
    _followUnfollowFlow (dispatch, userID, usersAPI.deleteFollowerApi.bind(userID), unfollowSuccess);
  }
}

export default usersReducer;


