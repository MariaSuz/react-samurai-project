import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL = "auth/GET_CAPTCHA_URL";

// export type initialStateType = {
//   isFetching: boolean,
//   userId: null | number,
//   login: null | string,
//   email: null | string,
//   isAuth: boolean,
//   captchaUrl: null | string,
// }


let initialState = {
    isFetching: true as boolean | null,
    userId: null as (number | null),
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl: null as string | null,
  };

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any):initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case  GET_CAPTCHA_URL:  {
          return { ...state, ...action.payload}
        }
        default:
          return state;
    }
}

type setsetAuthUserDataAPayloadType = {
  userId: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,
}
type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: setsetAuthUserDataAPayloadType,
}
type getCaptchaSuccessType = {
  type: typeof GET_CAPTCHA_URL,
  payload: {captchaUrl : string},  //Создание типа на ходу (особенность TS)
}

export let setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataActionType => ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}});
export let getCaptchaSuccess = (captchaUrl: string): getCaptchaSuccessType => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}});

export default authReducer;

export const getAuth = () => async (dispatch: any) => {
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

export const getLogin = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
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
export const getCaptchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl =  response.data.url;
    dispatch(getCaptchaSuccess(captchaUrl));
};


export const getLogOut = () => async (dispatch: any) => {
    let response = await authAPI.getLogOut();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
};
