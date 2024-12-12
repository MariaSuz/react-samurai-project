import { getAuth } from "./auth-reducer.ts";

const SET_INITIALIZED = "app/SET_INITIALIZED";

type initialStateType = {
  initialize: boolean,
}

let initialState: initialStateType = {
    initialize: false
  };

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_INITIALIZED: {
          return {...state, initialize: true}
        }
        default:
          return state;
    }
}


type setInitializeActionType = {
  type:  typeof SET_INITIALIZED, //typeof отличный от js, тк возвращаем объект
}
export let setInitialize = ():setInitializeActionType => ({type: SET_INITIALIZED});

// export const initializeApp = () => (dispatch) => {
//   let promise = dispatch(getAuth());
//   Promise.all([promise])
//     .then(() => {
//       dispatch(setInitialize());
//     });
// }
export const initializeApp = () => async(dispatch: any) => {
  await (dispatch(getAuth()));
  dispatch(setInitialize());
}

export default appReducer;
