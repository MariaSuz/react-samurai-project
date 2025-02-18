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
        ...state,
      // messages: [...state.messages, ...action.messages]
      messages: [...state.messages, ...action.messages.filter(
        (newMsg) => !state.messages.some((msg) => msg.message === newMsg.message)
      )]
    }
    default:
      return state;
  }
}

export const actions = {
  setMessages:(messages: ChatMessageType[])  => ({type: 'chat/SET_MESSAGES', messages} as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
          dispatch(actions.setMessages(Array.isArray(messages) ? messages : [messages]));
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = ():ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscibe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unubscibe(_newMessageHandler!);
  _newMessageHandler = null;
  chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message);
};

export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export default chatReducer;


