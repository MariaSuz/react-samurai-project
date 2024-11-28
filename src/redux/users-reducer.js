import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/objects-helpers";

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
    ],
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
  };

const usersReducer = (state = initialState, action) => {
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


export const followSuccess = (userId) => ({type: FOLLOW, userId})  //ActionCreator 
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const settotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHINGS, isFetching})
export const togglefollowingInProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const getUsersThunk = (currentPage, pageSize) =>{
  return async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));

  let data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(settotalUsersCount(data.totalCount));
  }
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
  dispatch(toggleIsFetching(true, userID))
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

export const follow = (userID) => {
  return async (dispatch) => {
    followUnfollowFlow (dispatch, userID, usersAPI.postFollowerApi.bind(userID), followSuccess);
  }
}

export const unfollow = (userID) =>{
  return async (dispatch) => {
    followUnfollowFlow (dispatch, userID, usersAPI.deleteFollowerApi.bind(userID), unfollowSuccess);
  }
}

export default usersReducer;


