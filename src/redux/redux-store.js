import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
});

let store =  configureStore({reducer: reducers})

window.store = store;

export default store;