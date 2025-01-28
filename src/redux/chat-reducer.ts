import { Dispatch } from "redux";
import { chatAPI, ChatMessageType } from "../api/chat-api.ts";
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";


let initialState = {
  messages: [] as ChatMessageType[]
};



const chatReducer = (state = initialState, action: ActionsTypes): initialStateType  => {
  switch (action.type) {
    case 'chat/SET_MESSAGES':
      return {
        ...state,  messages: [...state.messages, ...action.messages]
    }
    default:
      return state;
  }
}


export const actions = {
  setMessages: (messages: ChatMessageType) => ({type: 'chat/SET_MESSAGES', messages} as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessages(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = ():ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscibe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = ():ThunkType => async (dispatch) => {
  chatAPI.subscibe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string):ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
  chatAPI.stop()
}

export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export default chatReducer;


