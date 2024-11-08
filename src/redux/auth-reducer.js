import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const LOGIN = 'LOGIN';

let initialState = {
    isFetching: true,
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    password: '',
    rememberMe: false,
  };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
          return {...state, ...action.data, isAuth: true}
        }
        case LOGIN: {
          return {...state, email: action.email, email: action.password, password: action.rememberMe }
        }
        default:
          return state;
    }
}

export let setAuthUserData = (userId, login, email) => ({type: SET_USER_DATA, data: {userId, login, email}});

export let setLoginData = (email, password, rememberMe) => ({type: SET_USER_DATA, data: {email, password, rememberMe}});


export default authReducer;

export const getAuth = (id, login, email) =>{
  return (dispatch) => {
    authAPI.getAuth()
    .then(response => {
      if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, login, email));
      }
    });
}
}

export const getLogin = (email, password, rememberMe) =>{
  return (dispatch) => {
    authAPI.getLogin()
    .then(response => {
      if (response.data.resultCode === 0) {
        let {email, password, rememberMe} = response.data.data
        dispatch(setLoginData(email, password, rememberMe));
      }
    });
}
}