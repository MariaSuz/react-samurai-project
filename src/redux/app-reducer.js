import { getAuth } from "./auth-reducer";

const SET_INITIALIZED = "app/SET_INITIALIZED";

let initialState = {
    initialize: false
  };

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
          return {...state, initialize: true}
        }
        default:
          return state;
    }
}

export let setInitialize = () => ({type: SET_INITIALIZED});

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuth());
  Promise.all([promise])
    .then(() => {
      dispatch(setInitialize());
    });
}

export default appReducer;
