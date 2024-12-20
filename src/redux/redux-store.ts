import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers } from 'redux'
import profileReducer from './profile-reducer.ts';
import dialogsReducer from './dialogs-reducer.ts';
import sidebarReducer from './sidebar-reducer.js';
import usersReducer from './users-reducer.ts';
import authReducer from './auth-reducer.ts';
import {thunk} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer.ts';

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>; //Создает тип из типа выше (чтобы не расписывать)

// @ts-ignore
let store =  configureStore({reducer: reducers}, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;