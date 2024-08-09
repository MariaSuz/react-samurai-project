const FOLLOW = 'FOLLOW';
const UNFOLLOW ='UNFOLLOW';
const SET_USERS ='SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'SET_TOTAL_USERS';
const TOGGLE_IS_FETCHINGS = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

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
      return {
        ...state,
       // users:[...state.users] идентично  users: state.users.map(user => user)
       users: state.users.map(us => {
        if(us.id === action.userId) {
          return {...us, followed:true}
        }
        return us;
      })
    }
    case UNFOLLOW:
      return {
        ...state,
       // users:[...state.users] идентично  users: state.users.map(user => user)
       users: state.users.map(us => {
        if(us.id === action.userId) {
          return {...us, followed:false}
        }
          return us;
      })
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


// export const followActionCreator = (userId) => ({type: FOLLOW, userId})

// export const unfollowActionCreator = (userId) => ({type: UNFOLLOW, userId})

// export const setUsersActionCreator = (users) => ({type: SET_USERS, users})

// export const currentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})

// export const settotalUsersCountActionCreator = (totalUsersCount) => ({type: SET_TOTAL_USERS, count: totalUsersCount})

// export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHINGS, isFetching})

export const followActionCreator = (userId) => ({type: FOLLOW, userId})
export const unfollowActionCreator = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const settotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHINGS, isFetching})
export const togglefollowingInProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})




export default usersReducer;