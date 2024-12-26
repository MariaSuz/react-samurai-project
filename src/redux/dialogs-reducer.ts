import { InferActionsTypes } from "./redux-store";


type DialogType = {
  id: number,
  names : string,
}
type MessagesType = {
  id: number,
  message : string,
}

let initialState = {
  messagesData: [
  {id: 1, message:'Yo brother'},
  {id: 2, message:'How are you doing?'},
  {id: 3, message:'My name is beautiful'},
  {id: 4, message:'Im champion!'},
] as Array <MessagesType>,
dialogsData: [
  {id: 1, names: 'Mr. Tomatos'},
  {id: 2, names: 'Mrs. Smith'},
  {id: 3, names: 'Dima'},
  {id: 4, names: 'Limanado'},
  {id: 5, names: 'PizzaLiker'},
  {id: 6, names: 'Alien'},
] as Array <DialogType>
};

export type initialStateType = typeof initialState

// const dialogsReducer = (state = initialState, action) => {
//   let stateCopy;
//   debugger

//     if(action.type === ADD_MESSAGES) {
//         let mes = action.newMessageBody;
//         stateCopy = {
//           ...state,
//           messagesData: [...state.messagesData, {id: 5, message: mes}]
//         }

//       }
//       else if(action.type === UPDATE_NEW_POST_MESSAGES) {
//       stateCopy = {
//         ...state,
//         newMessageBody: action.newText
//       }
//       return stateCopy;
//       }
//     return state;
// }


// Оптимизируем

const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
      case 'dialogs/ADD_MESSAGES': {
        let mes = action.newMessageBody;
        return {...state, messagesData: [...state.messagesData, {id: 5, message: mes}]}
      }
      default:
        return state;
  }
}

export const actions = {
  addMessages: (newMessageBody: string) => ({type: 'dialogs/ADD_MESSAGES', newMessageBody} as const)
}

// export let updateNewPostMessageActionCreator = (text) => {
//   return {
//     type: UPDATE_NEW_POST_MESSAGES,
//     newText: text
//   }
// }

type ActionsTypes = InferActionsTypes<typeof actions>

export default dialogsReducer;