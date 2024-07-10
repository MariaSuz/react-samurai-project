const FOLLOW = 'FOLLOW'
const UNFOLLOW ='UNFOLLOW'
const SET_USERS ='SET_USERS'

let initialState = {
    users: [
      // {id: 1, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: true, fullname: 'Galya', status: 'like cats', location: {city: 'Minsk', country: 'Belarus'}},
      // {id: 2, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: true, fullname: 'Mariia', status: 'I give fitness lessons', location: {city: 'Samara', country: 'Russia'}},
      // {id: 3, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: false, fullname: 'Daniel', status: 'I teach football', location: {city: 'Madrid', country: 'Span'}},
      // {id: 4, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: false, fullname: 'Ingrid', status: 'I like JS', location: {city: 'Berlin', country: 'Germany'}},
      // {id: 5, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: false, fullname: 'Francisco', status: 'work at the factory', location: {city: 'Lisbon', country: 'Portugal'}},
      // {id: 6, photoUrl: 'https://i.pinimg.com/736x/3d/bf/b0/3dbfb0db73db8c521dd5792b509da8d9.jpg', followed: false, fullname: 'Sakura', status: 'just registered', location: {city: 'Tokyo', country: 'Japan'}},
    ],
  };

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
       // users:[...state.users] идентично  users: state.users.map(user => user)
       users: state.users.map(us => {
        if(us.id === action.userId) {
          return {...us,followed:true}
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
          return {...us,followed:false}
        }
          return us;
      })
    }
    case SET_USERS: {
      return {...state, users: [...action.users]}
    }
    default:
      return state;
  }
}


export const followActionCreator = (userId) => ({type: FOLLOW, userId})

export const unfollowActionCreator = (userId) => ({type: UNFOLLOW, userId})

export const setUsersActionCreator = (users) => ({type: SET_USERS, users})

export default usersReducer;