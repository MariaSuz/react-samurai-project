import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL = "auth/GET_CAPTCHA_URL";

let initialState = {
    isFetching: true,
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
  };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case  GET_CAPTCHA_URL:  {
          return {...state, ...action.payload}
        }
        default:
          return state;
    }
}

export let setAuthUserData = (userId, login, email, isAuth, captcha) => ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}});
export let getCaptchaSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}});

export default authReducer;

export const getAuth = () => async (dispatch) => {
    let response = await authAPI.getAuth();

    if (response.data.resultCode === 0) {
      let {id, login, email} = response.data.data
      dispatch(setAuthUserData(id, login, email, true));
    }
}

// Рефакторинг. Для удобства чтения then меняем на Async/await
// export const getAuth = () =>{
//   return (dispatch) => {
//     authAPI.getAuth()
//     .then(response => {
//       if (response.data.resultCode === 0) {
//         let {id, login, email} = response.data.data
//         dispatch(setAuthUserData(id, login, email, true, false));
//       }
//     });
// }
// }

export const getLogin = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response = await authAPI.getLogin(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
      dispatch(getAuth());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaURL());
      }
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
      let action = stopSubmit('login', {_error: message});
      dispatch(action);
    }
};
export const getCaptchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl =  response.data.url;
    dispatch(getCaptchaSuccess(captchaUrl));
};


export const getLogOut = () => async (dispatch) => {
    let response = await authAPI.getLogOut();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false, false));
    }
};
