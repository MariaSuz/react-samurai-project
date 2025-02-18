import { configureStore } from '@reduxjs/toolkit';
import { Action, AnyAction, applyMiddleware, combineReducers } from 'redux'
import profileReducer from './profile-reducer.ts';
import dialogsReducer from './dialogs-reducer.ts';
import sidebarReducer from './sidebar-reducer.ts';
import usersReducer from './users-reducer.ts';
import authReducer from './auth-reducer.ts';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer.ts';
import chatReducer from './chat-reducer.ts';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
    form: formReducer,
});


export type AppStateType = ReturnType<typeof rootReducer>; //Создает тип из типа выше (чтобы не расписывать)

//Тип для ActionCreator универсальный
type PropertiesTypes<T> = T extends {[key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any }> = ReturnType<PropertiesTypes<T>>;

//Санки типизируем
export type BaseThunkType<A extends Action, R = Promise<void>> =  ThunkAction<R, AppStateType, unknown, A>;

//Dispatch типизируем
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>

// @ts-ignore
let store =  configureStore({reducer: rootReducer}, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;