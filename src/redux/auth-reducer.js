import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    isFetching: true,
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captcha: false
  };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
          return {...state, ...action.payload}
        }
        default:
          return state;
    }
}

export let setAuthUserData = (userId, login, email, isAuth, captcha) => ({type: SET_USER_DATA, payload: {userId, login, email, isAuth, captcha}});

export default authReducer;

export const getAuth = () =>{
  return (dispatch) => {
    authAPI.getAuth()
    .then(response => {
      if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, login, email, true, false));
      }
    });
}
}

export const getLogin = (email, password, rememberMe, captcha) =>{
  return (dispatch) => {
    authAPI.getLogin(email, password, rememberMe, captcha)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(getAuth());
      } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        let action = stopSubmit('login', {_error: message});
        dispatch(action);
      }
    });
}
}

export const getLogOut = () =>{
  debugger
  return (dispatch) => {
    authAPI.getLogOut()
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, false));
      }
    });
}
}