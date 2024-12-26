import { getAuth } from "./auth-reducer.ts";
import { InferActionsTypes } from "./redux-store.ts";

let initialState = {
    initialize: false
  };

export  type initialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "app/SET_INITIALIZED": {
          return {...state, initialize: true}
        }
        default:
          return state;
    }
}

export const actions = {
  setInitialize: ()=> ({type: "app/SET_INITIALIZED"} as const)
}

type ActionsTypes = InferActionsTypes<typeof actions>
export const initializeApp = () => async(dispatch: any) => {
  await (dispatch(getAuth()));
  dispatch(actions.setInitialize());
}

export default appReducer;
