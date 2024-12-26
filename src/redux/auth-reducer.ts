import { authAPI } from "../api/auth-api.ts";
import { securityAPI } from "../api/secutity-api.ts";
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api.ts";
import { stopSubmit } from "redux-form";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store.ts";
import { Dispatch } from "redux";

let initialState = {
    isFetching: true as boolean | null,
    userId: null as (number | null),
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl: null as string | null,
  };

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes):initialStateType => {
    switch (action.type) {
        case "auth/SET_USER_DATA":
        case  "auth/GET_CAPTCHA_URL":  {
          return { ...state, ...action.payload}
        }
        default:
          return state;
    }
}

export const actions = {
  setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({type: "auth/SET_USER_DATA", payload: {userId, login, email, isAuth}} as const),
  getCaptchaSuccess: (captchaUrl: string) => ({type:  "auth/GET_CAPTCHA_URL", payload: {captchaUrl}}as const)
}

type ActionsTypes = InferActionsTypes<typeof actions>

export default authReducer;

type GetStateType = () => AppStateType;
type ThunkType = BaseThunkType<ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>;

export const getAuth = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.getAuth();
    if (meData.resultCode === ResultCodeEnum.Success) {
      let {id, login, email} = meData.data
      dispatch(actions.setAuthUserData(id, login, email, true));
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


export const getLogin = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
  let loginData = await authAPI.getLogin(email, password, rememberMe, captcha);

    if (loginData.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuth());
    } else {
      if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchIsRequired) {
        dispatch(getCaptchaURL());
      }
      let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
      let action = stopSubmit('login', {_error: message});
      dispatch(action);
    }
};
export const getCaptchaURL = ():ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptcha();
    const captchaUrl =  data.url;
    dispatch(actions.getCaptchaSuccess(captchaUrl));
};


export const getLogOut = ():ThunkType => async (dispatch) => {
    let data = await authAPI.getLogOut();
    if (data.data.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
};
