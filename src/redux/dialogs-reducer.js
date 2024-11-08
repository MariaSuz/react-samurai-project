const ADD_MESSAGES = 'ADD-MESSAGES';
// const UPDATE_NEW_POST_MESSAGES = 'UPDATE-NEW-POST-MESSAGES';

let initialState = {
  messagesData: [
  {id: 1, message:'Yo brother'},
  {id: 2, message:'How are you doing?'},
  {id: 3, message:'My name is beautiful'},
  {id: 4, message:'Im champion!'},
],
dialogsData: [
  {id: 1, names: 'Mr. Tomatos'},
  {id: 2, names: 'Mrs. Smith'},
  {id: 3, names: 'Dima'},
  {id: 4, names: 'Limanado'},
  {id: 5, names: 'PizzaLiker'},
  {id: 6, names: 'Alien'},
]
};

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

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_MESSAGES: {
        let mes = action.newMessageBody;
        return {...state, messagesData: [...state.messagesData, {id: 5, message: mes}]}
      }
      // case UPDATE_NEW_POST_MESSAGES: {
      //   return {...state, newMessageBody: action.newText }
      // }
      default:
        return state;
  }
}


//Сокращаем (тк 1 значение возвращает)
export let addMessages = (newMessageBody) => ({type: ADD_MESSAGES, newMessageBody});
 
// export let updateNewPostMessageActionCreator = (text) => {
//   return {
//     type: UPDATE_NEW_POST_MESSAGES,
//     newText: text
//   }
// }

export default dialogsReducer;