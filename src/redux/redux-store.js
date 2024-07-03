import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer
});

let store =  configureStore({reducer: reducers})

export default store;